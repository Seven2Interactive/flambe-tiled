package flambe.map.camera;

import flambe.animation.AnimatedFloat;
import flambe.math.Rectangle;
import flambe.map.MapSprite;

/**
 * Interface for MapSprite cameras.
 * @author Kipp Ashford
 */
interface Camera
{

	/** The x position. */
	var x(default, null) :AnimatedFloat;
	/** The y position */
	var y(default, null) :AnimatedFloat;
	/** The clamped x, y, width, and height values */
	var region(default, null) :Rectangle;

	function onUpdate(dt :Float, mapSprite :MapSprite) :Void;
}