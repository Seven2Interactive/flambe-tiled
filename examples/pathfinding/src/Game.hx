
package;

import flambe.animation.Sine;
import flambe.asset.AssetPack;
import flambe.Component;
import flambe.display.ImageSprite;
import flambe.display.Sprite;
import flambe.Entity;
import flambe.input.PointerEvent;
import flambe.map.ai.GridPath;
import flambe.map.ai.PathNode;
import flambe.map.ai.PathAnimator;
import flambe.map.camera.SpriteCamera;
import flambe.map.MapSprite;
import flambe.map.TileSprite;
import flambe.math.Point;
import flambe.swf.Library;
import Player;

/**
 * The game logic for the pathfinding map example.
 * @author Kipp Ashford (volkipp@gmail.com)
 */
class Game extends Component
{
	/** A list of all the players and their point positions. */
	private var _players :Array<Entity>;
	/** The map sprite we're using. */
	private var _map :MapSprite;
	/** The player that is playing. */
	private var _turn :Int = 0;
	/** The current player number */
	private var _player :Int = 0;
	/** The asset pack to use */
	private var _pack :AssetPack;
	/** The obstructions to walk around. */
	private var _obstructions :GridPath;
	/** The positions of the different players to use to calculate length, not including the obstructions. */
	private var _positions :GridPath;
	/** The highlighting layer. */
	private var _ui :Entity;
	/** The currently selected player. */
	private var _selected :Entity;

	/* ---------------------------------------------------------------------------------------- */
	
	public function new(pack :AssetPack)
	{
		_players = [];
		_pack = pack;
	}

	/* ---------------------------------------------------------------------------------------- */
	
	override public function onAdded()
	{
		_map = owner.get(MapSprite);
		addPlayers();
		_map.pointerUp.connect(onMapTap);
	}

	/* ---------------------------------------------------------------------------------------- */
	
	private function addPlayers()
	{
		var positions :TileSprite = _map.getLayer("positions").get(TileSprite);
		var bg :Entity = _map.getLayer("players"); // Finds all the positions of the players.
		var lib :Library = new Library(_pack, "players");
		var p1 :Int = 0;
		var p2 :Int = 0;
		for (x in 0...positions.columns) {

			for (y in 0...positions.rows) {
		
				var gid :Int = positions.getTile(x,y);

				if (gid > 0) {
					var symbol = positions.getSymbol(gid);
					var player = new Entity();
					
					// switch (symbol.data.getDefault("type")) {
					switch (Reflect.getProperty(symbol.data, "type")) {

						case "p1":
							player.add(new Player(p1, Team.Player1, 4, x, y))
								.add(lib.createSprite("t_p1_" + p1).setXY(x * positions.tileWidth, y * positions.tileHeight));
								_players.push(player);
							p1++;


						case "p2":

							player.add(new Player(p2, Team.Player2, 4, x, y))
								.add(lib.createSprite("t_p2_" + p2).setXY(x * positions.tileWidth, y * positions.tileHeight));

							_players.push(player);
							p2++;

						default:
					}

					bg.addChild(player);
				}
			}

		}
	}

	/* ---------------------------------------------------------------------------------------- */
	
	/**
	 * Handles touch events for the map.
	 * @param  e :PointerEvent [description]
	 * @return   [description]
	 */
	public function onMapTap(e :PointerEvent)
	{
		var lookup :Point = _map.getLayer("Background").get(TileSprite).getColumnRow(e.viewX, e.viewY);
		var changedSelection :Bool = false;

		var ii :Int = _players.length;
		while (ii-->0) {
			
			var player :Player = _players[ii].get(Player);
			
			if (player.equalsPosition(lookup)) {
				deselectCurrent();
				select(player.owner);
				_map.camera = new SpriteCamera(_selected);
				changedSelection = true;
				break;
			}
		}

		if (_selected != null && !changedSelection) {

			// Travel to the new location.
			var tempLayer = _map.getLayer("temp").get(TileSprite);
			var positionLayer = _map.getLayer("positions").get(TileSprite);
			var walkableLayer = _map.getLayer("walkable").get(TileSprite);

			tempLayer.clear();
			tempLayer.copyFrom(walkableLayer);
			tempLayer.copyFrom(positionLayer);

			var graph :GridPath = new GridPath(tempLayer, true);
			// var graph :GridPath = new GridPath(tempLayer, false, None, Heuristic.euclidian);
			var player :Player = _selected.get(Player);
			var paths :Array<PathNode> = graph.search(player.x, player.y, Std.int(lookup.x), Std.int(lookup.y));

			if (paths != null) {
				_selected.add(new PathAnimator(paths, .1));
				var gid = positionLayer.getTile(player.x, player.y);
				positionLayer.setTile( player.x, player.y, 0);
				player.x = paths[paths.length-1].x;
				player.y = paths[paths.length-1].y;
				positionLayer.setTile(player.x, player.y, gid);
				deselectCurrent();
			}
		}
	}

	/* ---------------------------------------------------------------------------------------- */
	
	private function select(player :Entity)
	{
		_selected = player;
		var player :Player = _selected.get(Player);
		var layer = _map.getLayer("UI").get(TileSprite);

		for (x in player.x-1...player.x+2) {

			for (y in player.y-1...player.y+2) {

				var player :Int = _map.getLayer("positions").get(TileSprite).getTile(x, y);
				var walkable :Int = _map.getLayer("walkable").get(TileSprite).getTile(x, y);

				if (player + walkable == 0) {
					layer.setTile(x, y, 107);
				}
			}
		}
		
		_selected.get(Sprite).alpha.behavior = new Sine(1,.5, .2);
	}

	/* ---------------------------------------------------------------------------------------- */
	
	/**
	 * Deselects the current layer.
	 * @return [description]
	 */
	private function deselectCurrent()
	{
		if (_selected != null) {
			_map.getLayer("UI").get(TileSprite).clear();
			_selected.get(Sprite).alpha._ = 1;
			_selected = null;
		}
	}

	/* ---------------------------------------------------------------------------------------- */
	
	/**
	 * Helps us do some z-sorting on the player tiles.
	 * @param  one :Entity       [description]
	 * @param  two :Entity       [description]
	 * @return     [description]
	 */
	private function sortOnY(one :Entity, two :Entity) :Int
	{
		var p1 :Sprite = one.get(Sprite);
		var p2 :Sprite = two.get(Sprite);
		var y1 :Float = p1.y._;
		var y2 :Float = p2.y._;
		if (y1 < y2) return -1;
		if (y1 > y2) return 1;
		return 0;
	}

	/* ---------------------------------------------------------------------------------------- */
	
	override public function onUpdate(dt :Float)
	{
		// update the positions.
		_players.sort(sortOnY);
		for (i in 0..._players.length) {
			var p :Entity = _players[i];
			p.parent.addChild(p);
		}
	}


}