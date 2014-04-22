package flambe.map.ai;

import flambe.map.ds.PriorityQueue;
import flambe.map.MapSprite;
import flambe.map.TileSprite;

/**
 * An A* implementation for Grid masks
 * Adapted from the GridPath class written by Matt Tuttle
 * https://github.com/HaxePunk/ai
 */
class GridPath
{
	public static inline var HORIZONTAL_COST :Int = 10;
	public static inline var VERTICAL_COST :Int = 14;

	/**
	 * Creates a GridPath class
	 * @param grid the Grid mask to use for path info
	 * @param options a set of options that determine how paths are generated
	 */
	// public function new(grid :MapLayer, ?walkDiagonal :Bool = false, ?optimize :PathOptimize, ?heuristic :HeuristicFunction)
	public function new(grid :TileSprite, ?walkDiagonal :Bool = false, ?optimize :PathOptimize, ?heuristic :HeuristicFunction)
	{
		_nodes = new Array<PathNode>();
		_openList = new PriorityQueue<PathNode>();
		_closedList = new Array<PathNode>();

		// build node list
		_width = grid.columns;
		_height = grid.rows;
		// _width = grid.layerWidth;
		// _height = grid.layerHeight;

		var x:Int, y:Int, node :PathNode;

		for (i in 0...(_width * _height))
		{
			x = i % _width;
			y = Std.int(i / _width);
			node = new PathNode(x, y);
			node.worldX = x * grid.tileWidth;
			node.worldY = y * grid.tileHeight;

			// determine walkable based on grid value
			node.walkable = grid.getTile(x, y) == 0;
			_nodes[i] = node;
		}

		// set defaults
		_walkDiagonal = walkDiagonal;
		_optimize = optimize == null ? PathOptimize.None : optimize;
		_heuristic = heuristic == null ? Heuristic.manhattan : heuristic;
	}

	/* ---------------------------------------------------------------------------------------- */
	
	/**
	 * Finds the shortest path between two points, if possible
	 * @param sx the start x coordinate
	 * @param sy the start y coordinate
	 * @param dx the destination x coordinate
	 * @param dy the destination y coordinate
	 * @return a list of nodes from the start to finish
	 */
	public function search(sx :Int, sy :Int, dx :Int, dy :Int) :Array<PathNode>
	{
		_destX = dx;
		_destY = dy;

		// early out if this area is blocked
		var dest = getNode(dx, dy);
		if (dest == null || dest.walkable == false) return null;

		reset();

		// push starting node to the open list
		var start = getNode(sx, sy);
		start.parent = null;
		_openList.enqueue(start, 0);

		while (_openList.length > 0)
		{
			var node :PathNode = _openList.dequeue();

			// check if we found the target
			if (node.x == dx && node.y == dy)
			{
				return buildList(node);
			}

			// push the node to the closed list
			_closedList.push(node);

			// check all the neighbors
			updateNeighbor(node, 1, 0);
			updateNeighbor(node, 0,-1);
			updateNeighbor(node,-1, 0);
			updateNeighbor(node, 0, 1);

			if (_walkDiagonal)
			{
				updateNeighbor(node, 1, 1);
				updateNeighbor(node, 1,-1);
				updateNeighbor(node,-1,-1);
				updateNeighbor(node,-1, 1);
			}
		}

		return null;
	}

	/**
	 * Updates a neighboring node info
	 * @param parent the neighbor node's parent
	 * @param x the neighbor x distance from the parent
	 * @param y the neighbor y distance from the parent
	 */
	private inline function updateNeighbor(parent:PathNode, x:Int, y:Int)
	{
		var node = getNode(parent.x + x, parent.y + y);
		if (node == null || !node.walkable || Lambda.has(_closedList, node))
		{
			return;
		}
		else
		{
			var horizontal = (x == 0 || y == 0);
			var g = parent.g + (horizontal ? HORIZONTAL_COST : VERTICAL_COST);
			if (g < node.g || node.parent == null)
			{
				node.g = g;
				node.h = Std.int(_heuristic(node.x, node.y, _destX, _destY) * HORIZONTAL_COST);
				node.parent = parent;

				// remove the node if it exists on the open list
				_openList.remove(node);
				// enqueue the node with the new priority
				_openList.enqueue(node, node.g + node.h);
			}
		}
	}

	/**
	 * Calculates the slope between two nodes
	 */
	private inline function calcSlope(a:PathNode, b:PathNode):Float
	{
		return (b.y - a.y) / (b.x - a.x);
	}

	/**
	 * Builds a list backwards from the destination node
	 * @param node the destination node to start backtracking from
	 * @return a list of nodes to travel to reach the destination
	 */
	private function buildList(node :PathNode):Array<PathNode>
	{
		var path = new Array<PathNode>();

		// optimized list skips nodes with the same slope
		switch (_optimize)
		{
			case None:
				while (node != null)
				{
					path.insert(0, node);
					node = node.parent;
				}
			case SlopeMatch:
				path.push(node);
				// check if this is the only node
				if (node.parent != null)
				{
					var slope:Float = calcSlope(node, node.parent);
					while (node != null)
					{
						if (node.parent == null)
						{
							path.insert(0, node);
						}
						else
						{
							var newSlope = calcSlope(node, node.parent);
							if (slope != newSlope)
							{
								path.insert(0, node);
								slope = newSlope;
							}
						}
						node = node.parent;
					}
				}
			case LineOfSight:
				path.push(node);
				var current = node;
				while (node.parent != null)
				{
					// a bit stupid to check the same nodes every time, but I can't figure out a better way to do it...
					if (!hasLineOfSight(current, node.parent))
					{
						path.insert(0, node);
						current = node;
					}
					node = node.parent;
				}
				path.insert(0, node); // last node
		}

		return path;
	}

	private inline function hasLineOfSight(a:PathNode, b:PathNode):Bool
	{
		var dx = abs(b.x - a.x);
		var dy = abs(b.y - a.y);
		var x = a.x;
		var y = a.y;
		var n = 1 + dx + dy;
		var xInc = (b.x == a.x) ? 0 : (b.x > a.x) ? 1 : -1;
		var yInc = (b.y == a.y) ? 0 : (b.y > a.y) ? 1 : -1;
		var error = dx - dy;
		var canSee = true;
		dx *= 2;
		dy *= 2;

		while (n-- > 0)
		{
			var node = getNode(x, y);
			if (node == null || node.walkable == false)
			{
				canSee = false;
				break;
			}

			if (error > 0)
			{
				x += xInc;
				error -= dy;
			}
			else
			{
				y += yInc;
				error += dx;
			}
		}
		return canSee;
	}

	private inline function abs(value:Int):Int
	{
		return value < 0 ? -value : value;
	}

	private function reset()
	{
// clear out any old data we had
#if (cpp || php)
		_closedList.splice(0,_closedList.length);
#else
		untyped _closedList.length = 0;
#end
		_openList.clear();

		for (i in 0..._nodes.length)
		{
			_nodes[i].parent = null;
		}
	}

	/**
	 * Retrieves a PathNode at a specific index
	 */
	private inline function getNode(x:Int, y:Int):PathNode
	{
		if (x < 0 || y < 0 || x >= _width || y >= _height)
			return null;
		else
			return _nodes[y * _width + x];
	}

	private var _heuristic :HeuristicFunction;
	private var _walkDiagonal :Bool;
	private var _optimize :PathOptimize;

	private var _destX :Int;
	private var _destY :Int;

	private var _width :Int;
	private var _height :Int;

	private var _nodes :Array<PathNode>;
	private var _openList :PriorityQueue<PathNode>;
	private var _closedList :Array<PathNode>;

}

/** A set of options for pathfinding */
enum PathOptimize
{
	None; SlopeMatch; LineOfSight;
}

typedef HeuristicFunction = Int->Int->Int->Int->Float;

/**
 * A set of heuristic functions
 */
class Heuristic
{

	public static inline function manhattan(x :Int, y :Int, dx :Int, dy :Int) :Float
	{
		return Math.abs(x - dx) + Math.abs(y - dy);
	}

	public static inline function diagonal(x :Int, y :Int, dx :Int, dy :Int) :Float
	{
		return Math.max(Math.abs(x - dx), Math.abs(y - dy));
	}

	public static inline function euclidian(x :Int, y :Int, dx :Int, dy :Int) :Float
	{
		return Math.sqrt((x - dx) * (x - dx) + (y - dy) * (y - dy));
	}

}
