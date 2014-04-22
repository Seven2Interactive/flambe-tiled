
package flambe.map.camera;

import flambe.animation.AnimatedFloat;
import flambe.display.Sprite;
import flambe.Entity;
import flambe.math.FMath;
import flambe.math.Rectangle;
import flambe.map.MapSprite;

/**
 * Basic camera functionality to move a MapSprite around.
 * @author Kipp Ashford
 */
class BasicCamera implements Camera
{

	/** The x position. */
	public var x(default, null) :AnimatedFloat;
	/** The y position */
	public var y(default, null) :AnimatedFloat;
	/** The clamp area, or null for default clamping. */
	public var region :Rectangle;
	
	/* ---------------------------------------------------------------------------------------- */
	
	public function new()
	{
		x = new AnimatedFloat(0);
		y = new AnimatedFloat(0);
		region = new Rectangle();
		// _reuse = new Rectangle();
	}

	/* ---------------------------------------------------------------------------------------- */
	
	public function onUpdate(dt :Float, mapSprite :MapSprite)
	{
		x.update(dt);
		y.update(dt);
		applyPosition(mapSprite, x._, y._);
	}

	/* ---------------------------------------------------------------------------------------- */
	
	private function applyPosition(mapSprite :MapSprite, x :Float, y :Float)
	{
		// Do some bounds checking.
		var unusedWidth :Float = mapSprite.mapWidth - mapSprite.width._;
		var unusedHeight :Float = mapSprite.mapHeight - mapSprite.height._;

		if (mapSprite.mapWidth > 0) {
			x = FMath.clamp(x, 0, unusedWidth );
		}
		if (mapSprite.mapHeight > 0) {
			y = FMath.clamp(y, 0, unusedHeight);
		}

		region.set(x, y, unusedWidth, unusedHeight);

		// Apply the position.
		// this.x._ = x;
		// this.y._ = y;
	}
}