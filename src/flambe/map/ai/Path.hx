package flambe.map.ai;

import flambe.map.ai.PathNode;
import flambe.util.Assert;

/**
 * Class containing a list of path nodes, as well as helpers to manipulate the nodes.
 */
class Path
{
	/** comment */
	public var nodes (default, null) :Array<PathNode>;
	/** The length of the path in number of steps. */
	public var length (default, null) :Int = 0;

	public function new(nodes :PathNode)
	{
		// Calculate the length.
		this.nodes = nodes;
		for (i in 0...nodes.length) {

		}
	}

	/* ---------------------------------------------------------------------------------------- */
	
	public function shorten(newLength :Int)
	{
		Assert.that(newLength < length, "You can only shorten the length of a path.", [newLength]);
	}

	/* ---------------------------------------------------------------------------------------- */
	
	/**
	 * Gives the distance between two path nodes.
	 * @param  node1 :PathNode     [description]
	 * @param  node2 :PathNode     [description]
	 * @return       [description]
	 */
    public static function distance (node1 :PathNode, node2 :PathNode) :Float
    {
    	if (node1 == null || node2 == null) {
    		return 0;
    	}

        var dx = node1.x-node2.x;
        var dy = node1.y-node2.y;
        var dist2 = dx*dx + dy*dy;

        return Math.sqrt(dist2);
    }

    /* ---------------------------------------------------------------------------------------- */
    

}