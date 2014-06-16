package flambe.map;

import flambe.animation.AnimatedFloat;
import flambe.display.Graphics;
import flambe.display.Sprite;
import flambe.display.Texture;
import flambe.Entity;
import flambe.map.camera.BasicCamera;
import flambe.map.camera.Camera;
import flambe.map.TileSprite;
import flambe.math.FMath;
import flambe.math.Matrix;
import flambe.math.Point;
import flambe.math.Rectangle;
import flambe.System;
import flambe.util.Arrays;
import flambe.util.Assert;

/**
 * A map which manages positioning and viewport of multiple layers. Contains support for a camera which can be positioned manually,
 * or use different camera types to follow various items in the map.
 *
 * @author Kipp Ashford
 */
class MapSprite extends Sprite
{
	/** The width of the visible map area. */
	public var width (default, null) :AnimatedFloat;
	/** The height of the visible map area */
	public var height (default, null) :AnimatedFloat;
	/** The total width of the map in pixels. */
	public var mapWidth (default, null) :Float = 0;
	/** The total height of the map in pixels */
	public var mapHeight (default, null) :Float = 0;
	/** The camera for the map sprite. */
	public var camera :Camera;
	/** Used to associate extra data with the map, usually provided by your map editor. */
	public var data :Dynamic;

	/** The layers of this map */
	private var _layers :Array<Entity>;
	/** Keeps all of the layers mapped by their layer names. */
	private var _names :Map<String, Entity>;

	/* ---------------------------------------------------------------------------------------- */
	
	/**
	 * @param  width   :Float       The width of the visible area to render.
	 * @param  height  :Float       The height of the visible area to render.
	 * @return         [description]
	 */
	public function new (width :Float, height :Float, ?mapWidth :Float = 0, ?mapHeight :Float = 0)
	{
		super();
		_layers = [];
		_names = new Map();

		var onSizeChange = function(v,p) {
			if (mapWidth > 0 && (this.width._ > mapWidth)) {
				this.width._ = mapWidth;
			}

			if (mapHeight > 0 && (this.height._ > mapHeight)) {
				this.height._ = mapHeight;
			}
		};

		this.width = new AnimatedFloat(width, onSizeChange);
		this.height = new AnimatedFloat(height, onSizeChange);
		this.mapWidth = mapWidth;
		this.mapHeight = mapHeight;
		onSizeChange(0,0);

		this.camera = new BasicCamera();
	}

	override public function draw (g :Graphics)
	{
		g.applyScissor( 0, 0, width._, height._);
	}

	override public function getNaturalWidth () :Float
	{
		return width._;
	}

	override public function getNaturalHeight () :Float
	{
		return height._;
	}

	/**
	 * Chainable convenience method to set the width and height.
	 * @returns This instance, for chaining.
	 */
	public function setViewport (width :Float, height :Float) :MapSprite
	{
		this.width._ = width;
		this.height._ = height;
		return this;
	}

	/* ---------------------------------------------------------------------------------------- */
	
	/**
	 * Adds a new layer to this map sprite.
	 * 
	 * @param id    The ID of the layer for later lookups.
	 * @param layer :Entity [description]
	 */
	public function addLayer(id :String, layer :Entity)
	{
		Assert.that(!_names.exists(id), "You may not have duplicate layer names in a map.", [id]); 

		var s :Sprite = layer.get(Sprite);
		if (s == null) {
			layer.add(s = new Sprite()); // Make sure we have a sprite we can manipulate.
		}

		// Adjust xy based on camera coordinates.
		s.getLocalMatrix().set(1,0,0,1, -camera.region.x, -camera.region.y);
		// s.setXY(-camera.region.x, -camera.region.y);

		if (Type.getClass(s) == TileSprite) {
			// Adjust the region to render.
			var ts :TileSprite = cast s;
			if (ts.region == null) {
				ts.region = new Rectangle(-camera.x._, -camera.y._, width._, height._);
			}
		}
		_layers.push(layer);
		_names.set(id, layer);

		if (owner != null) {
			owner.addChild(layer);
		}
	}

	/* ---------------------------------------------------------------------------------------- */
	
	/**
	 * Removes a layer from the MapSprite and returns it.
	 * 
	 * @param  id :String       [description]
	 * @return    [description]
	 */
	public function removeLayer(id :String) :Entity
	{
		Assert.that(_names.exists(id), "Trying to remove a layer which doesn't exist.", [id]);
		var layer :Entity = _names.get(id);
		_layers.splice(Lambda.indexOf(_layers, layer), 1);
		_names.remove(id);

		return layer;
	}

	/* ---------------------------------------------------------------------------------------- */
	
	/**
	 * Gets a layer of the map.
	 * @param  id :String       [description]
	 * @return    [description]
	 */
	public function getLayer(id :String) :Entity
	{
		Assert.that(_names.exists(id), "Layer ids must be added to the MapSprite first.", [id]); 
		return _names.get(id);
	}

	override public function onUpdate (dt :Float)
	{
		super.onUpdate(dt);
		width.update(dt);
		height.update(dt);
		camera.onUpdate(dt, this);

		var ii :Int = _layers.length;
		while (ii-->0) {
			var layer :Sprite = _layers[ii].get(Sprite);
			if (Type.getClass(layer) == TileSprite) {
				cast(layer, TileSprite).region.set(-camera.region.x, -camera.region.y, width._, height._); // Adjust the region to render.
			}

			// layer.setXY(-camera.region.x, -camera.region.y);
			layer.getLocalMatrix().set(1,0,0,1,-camera.region.x, -camera.region.y);
		}
	}

	/* ---------------------------------------------------------------------------------------- */
	
	override public function onAdded()
	{
		for (layer in _layers) {
			owner.addChild(layer);
		}
	}

	/* ---------------------------------------------------------------------------------------- */
	
	override public function onRemoved()
	{
		for (layer in _layers) {
			owner.removeChild(layer);
		}
	}

	/* ---------------------------------------------------------------------------------------- */
	
	override public function dispose()
	{
		super.dispose();
		for (layer in _layers) {
			layer.dispose();
		}
		Arrays.resize(_layers, 0);
	}
}