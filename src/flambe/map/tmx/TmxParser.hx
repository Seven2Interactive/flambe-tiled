package flambe.map.tmx;

import flambe.asset.AssetPack;
import flambe.asset.File;
import flambe.display.ImageSprite;
import flambe.display.Sprite;
import flambe.Entity;
import flambe.map.MapSprite;
import flambe.map.TileSprite;
import flambe.map.TileSymbol;
import flambe.map.tmx.Format;
import flambe.util.Arrays;
import flambe.util.Disposable;
import flambe.util.Signal0;
import haxe.Json;

using flambe.util.Strings;

/**
 * Parses the TMX Format and generates a new MapSprite from the given format.
 * Currently we are only supporting the json format because of the low filesize
 * and ease of parsing. You could create a parser for other formats without too much trouble.
 *
 * @author Kipp Ashford
 */
class TmxParser implements Disposable
{
	/** The map definition loaded from Tiled.  */
	public var map (default, null) :Format;
	/** comment */
	public var symbols (default, null) :Array<TileSymbol>;
	/** comment */
	public var reloaded (default, null) :Signal0;

	/** Stores listeners for map changes. */
	private var _binds :Array<Disposable>;
	/** The map definition file. */
	private var _file :File;
	
	/* ---------------------------------------------------------------------------------------- */
	
	public function new(pack :AssetPack, tmxPath :String)
	{
		var aBase :Array<String> = tmxPath.split("/");
		aBase.pop();

		var basePath :String = aBase.join("/"); // The base path for assets.
		_file = pack.getFile(tmxPath + ".json"); // Only supporting json format for filesize and ease of parsing.

		reloaded = new Signal0();

		if (basePath.length > 0) {
			basePath = basePath + "/";
		}

        symbols = [];
		_binds = [ _file.reloadCount.changed.connect(onTmxFileReload) ];
		onTmxFileReload(0,0);

		for (i in 0...map.tilesets.length) {
			var tileset = map.tilesets[i];

			if (tileset.tileoffset == null) {			
				tileset.tileoffset = {x:0,y:0};
			}

			var gid :Int = tileset.firstgid;
			var offsetX :Float = tileset.tileoffset.x;
			var offsetY :Float = tileset.tileoffset.y;
			var nWidth = Math.floor((tileset.imagewidth - offsetX) / (tileset.tilewidth + tileset.spacing));
			var nHeight = Math.floor((tileset.imageheight  - offsetY) / (tileset.tileheight + tileset.spacing));
			var nTiles = nWidth * nHeight;
			var atlas = pack.getTexture(basePath + tileset.image.removeFileExtension());

			var x :Int = 0;
			var y :Int = 0;
			var c :Int = 0;

			// Save symbols based on tile GID
			while (c++ < nTiles) {
				x++;
				if (x > nWidth) {
					y++;
					x = 0;
				}

				var nPosY :Int = Math.ceil(c / nWidth) - 1;
				var nPosX :Int = c - (nWidth * nPosY) - 1;
				nPosY *= (tileset.tileheight + tileset.spacing);
				nPosX *= (tileset.tilewidth + tileset.spacing);
				symbols[gid] = new TileSymbol(gid, atlas, Math.round(offsetX) + nPosX, Math.round(offsetY) + nPosY, tileset.tilewidth, tileset.tileheight);
				gid++;
			}

			// Loop through the extra properties, and pass them through to the tile symbols.
			if (tileset.tileproperties != null) {
				var keys = Reflect.fields(tileset.tileproperties);
				for (id in keys) {
					var props :Dynamic = Reflect.field(tileset.tileproperties, id);
					var gid :Int = Std.parseInt(id) + tileset.firstgid;
					symbols[gid].data = props;
				}
			}
		}
	}

	/* ---------------------------------------------------------------------------------------- */
	
	public function newMap(width :Float, height :Float, ?mapWidth :Float = 0, ?mapHeight :Float = 0) :MapSprite
	{
		mapWidth = mapWidth == 0 ? map.width * map.tilewidth : mapWidth;
		mapHeight = mapHeight == 0 ? map.height * map.tileheight : mapHeight;
		var mapSprite :MapSprite = new MapSprite(width, height, mapWidth, mapHeight);
		mapSprite.data = map; // Stores the raw map information for easy access later.

		// Add layers.
		for (i in 0...map.layers.length) {

			var layer :LayerFormat = map.layers[i];
			var container :Entity = new Entity().add(new Sprite());

			switch (layer.type) {
				case "tilelayer":
					container.add( new TileSprite(symbols, map.tilewidth, map.tileheight)
						.fromArray(layer.data, layer.width, layer.height) );
				case "object":
					for (c in 0...layer.objects.length) {
						onObjectParsed(container, layer.objects[c]);
					}
				case "image":
					// container.add( new ImageSprite() );
				default:
			}

			
			container.get(Sprite).alpha._ = layer.opacity;
			container.get(Sprite).visible = layer.visible;

			onLayerParsed(container, layer);
			mapSprite.addLayer(layer.name, container);
		}

		return mapSprite;
	}

	/* ---------------------------------------------------------------------------------------- */
	
	/**
	 * Used to easily add more functionality by subclassing the TmxParser.
	 * @param arguments [description]
	 */
	private function onLayerParsed(layer :Entity, data :LayerFormat)
	{}

	/* ---------------------------------------------------------------------------------------- */
	
	/**
	 * Used whenever some object data is parsed. Can easily add more functionality by subclassing the TmxParser.
	 * @param  layer :Entity       [description]
	 * @param  data  :ObjectFormat [description]
	 * @return       [description]
	 */
	private function onObjectParsed(layer :Entity, data :ObjectFormat)
	{}

	/* ---------------------------------------------------------------------------------------- */
	
	public function dispose()
	{
		var ii :Int = _binds.length;
		while (ii-->0) {
			_binds[ii].dispose();
		}		
		Arrays.resize(_binds,0);
		_file = null;
	}

	/* ---------------------------------------------------------------------------------------- */
	
	private function onTmxFileReload(_,_)
	{
        map = Json.parse(_file.toString());
		reloaded.emit();
	}

}