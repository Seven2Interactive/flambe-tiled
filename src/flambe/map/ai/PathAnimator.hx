package flambe.map.ai;

import flambe.animation.AnimatedFloat;
import flambe.Component;
import flambe.map.ai.PathNode;
import flambe.script.CallFunction;
import flambe.script.MoveTo;
import flambe.script.Script;
import flambe.script.Sequence;
import flambe.util.Value;


/**
 * Helper class to animate a list of PathNodes.
 * @author Kipp Ashford
 */
class PathAnimator extends Component
{
	/** The speed **/
	public var speed (default, null) :AnimatedFloat;
	/** Emits a signal when the path has finished animating. */
	public var completed (default, null) :Value<Bool>;
	
	/**
	 * @param  path   :Array<PathNode> The array of PathNodes to follow.
	 * @param  ?speed :Float           The number of seconds it takes to travel per-tile.
	 */
	public function new(path :Array<PathNode>, ?speed :Float = .25)
	{
		_path = path;
		this.speed = new AnimatedFloat(speed);
		this.completed = new Value<Bool>(false);
	}
    
    public function distance (node1 :PathNode, node2 :PathNode) :Float
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
	
	private function nextNode()
	{
		if (_path != null && _path.length > 0) {
			var newTarget = _path.shift();
			var length :Float = distance(_target, newTarget);
			if (length == 0) {
				length = speed._;
			}

			_target = newTarget;
			owner.add(new Script()).get(Script).run(new Sequence([
				new MoveTo(_target.worldX, _target.worldY, length * speed._),
				new CallFunction(nextNode)
			]));
		} else {
			completed._ = true;
		}
	}

	/* ---------------------------------------------------------------------------------------- */
	
	override public function onUpdate(dt :Float)
	{
		if (!_started) {
			_started = true;
			nextNode();
		}
		if (!completed._) {

		} else {
			this.dispose();
		}
	}

	/** The array of paths to animate */
	private var _path :Array<PathNode>;
	/** The current target we are animating to. */
	private var _target :PathNode;
	/** The total distance we will travel */
	private var _pathLength :Float = 0;
	/** If we have started animating or not. */
	private var _started :Bool = false;

}