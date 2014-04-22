package flambe.map.camera;

import flambe.display.Sprite;
import flambe.Entity;
import flambe.math.Matrix;
import flambe.math.Point;
import flambe.map.camera.BasicCamera;
import flambe.map.MapSprite;

/**
 * Camera which follows a sprite.
 * @author Kipp Ashford
 */
class SpriteCamera extends BasicCamera
{

	/** The object to follow. */
	public var follow :Entity;
	/** comment */
	private var _target :Point;
	/** comment */
	private var _init :Bool;

	public function new(?follow :Entity)
	{
		super();
		this.follow = follow;
		_target = new Point();
	}
	
	override public function onUpdate(dt :Float, mapSprite :MapSprite)
	{
		x.update(dt);
		y.update(dt);

		if (follow != null) {
			var s :Sprite = follow.get(Sprite);
			if (s != null) {

				var mat :Matrix = s.getLocalMatrix();
				var pX :Float = _target.x;
				var pY :Float = _target.y;
				_target.set(mat.m02 - mapSprite.width._ * .5, mat.m12 - mapSprite.height._ * .5);
				
				if (!_init) {
					_init = true;
					x._ = _target.x;
					y._ = _target.y;
				}

	            if (_target.x != pX) {
	            	x.animateTo(_target.x, .5);
	            }
	            if (_target.y != pY) {
	            	y.animateTo(_target.y, .5);
	            }

				applyPosition(mapSprite, _target.x, _target.y);
			}
		}
	}
}