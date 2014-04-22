package;

import flambe.Component;
import flambe.math.Point;

/**
 * Component containing information about a player on the map.
 * @author Kipp Ashford (volkipp@gmail.com)
 */
class Player extends Component
{
	/** The team we are on. */
	public var player :Team;
	/** The number of moves a player can make. */
	public var moves :Int = 4;
	/** comment */
	public var health :Int = 100;
	/** The id of the piece. */
	public var id :Int;
	/** comment */
	public var x :Int = 0;
	/** comment */
	public var y :Int = 0;

	public function new(id :Int, player :Team, moves :Int, ?x :Int = 0, ?y :Int = 0)
	{
		this.x = x;
		this.y = y;
		this.id = id;
		this.player = player;
		this.moves = moves;
	}

	/* ---------------------------------------------------------------------------------------- */
	
	public function equalsPosition(point :Point) :Bool
	{
		return (x == Std.int(point.x)) && (y == Std.int(point.y));
	}

}

enum Team {
	Player1; Player2; Computer;
}