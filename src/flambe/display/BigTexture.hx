
package flambe.display;

import flambe.display.Graphics;
import flambe.display.Texture;
import flambe.math.FMath;
import flambe.System;
import flambe.util.Arrays;
import flambe.util.Assert;


/**
 * Allows us to make draw calls to a texture larger than our maximum system texture size. 
 * @author Kipp Ashford
 */
class BigTexture
{
	/** The width of the texture */
	public var width (default, null) :Int;
	/** The height of the texture */
	public var height (default, null) :Int;
    /** The graphics interface to work with */
    public var graphics (get, null) :Graphics;
    /** The number of columns total */
    public var columns (default, null) :Int;
    /** The number of rows total */
    public var rows (default, null) :Int;
    /** An array of all our blank textures. */
    @:allow(flambe.display) var textures :Array<Texture>;
    /** The size of the textures */
    @:allow(flambe.display) var textureSize :Int;

    /** The graphics instance. */
    private var _graphics :Graphics;

	public function new(width :Int, height :Int) :Void
	{
		// textureSize = 128;
		textureSize = System.renderer.maxTextureSize;
	
		this.width = width;
		this.height = height;
		this.columns = Math.ceil(this.width / textureSize);
		this.rows = Math.ceil(this.height / textureSize);
		
		#if debug trace('Texture:\nwidth:$width\nheight:$height\nmax:$textureSize'); #end

		textures = Arrays.create(columns * rows);
		for (i in 0...textures.length) {
			textures[i] = System.renderer.createTexture(textureSize, textureSize);
		}

		if (columns == 1 && rows == 1) {
			_graphics = textures[0].graphics; // Just directly access the graphics from the first texture since it's the only one.
		} else {
			_graphics = new BigTextureGraphics(this);
		}
	}

	/**
	 * Draws the large group of combined textures to the given graphics.
	 * @param  g :Graphics     [description]
	 */
	public function draw(g :Graphics) :Void
	{
		for (column in 0...columns) {
			for (row in 0...rows) {
				var x :Int = this.textureSize * column;
				var y :Int = this.textureSize * row;
				g.drawTexture(textures[column + row * columns], x, y);
			}
		}
	}

	public function dispose() :Void
	{
		var ii :Int = textures.length;
		while (ii-->0) {
			textures.pop().dispose();
		}
	}

	private function get_graphics() :Graphics
	{
		return _graphics;
	}

}

/**
 * The clas to manage the draw calls.
 */
private class BigTextureGraphics
	implements Graphics
{
	/** The texture we are working with. */
	private var _manager :BigTexture;

	public function new(manager :BigTexture) :Void
	{
		_manager = manager;
	}

    public function save () :Void {
    	var ii :Int = _manager.textures.length;
    	while (ii-->0) {
    		_manager.textures[ii].graphics.save();
    	}
    }

    /** Translates the transformation matrix. */
    public function translate (x :Float, y :Float) :Void {
    	var ii :Int = _manager.textures.length;
    	while (ii-->0) {
    		_manager.textures[ii].graphics.translate(x, y);
    	}
    }

    /** Scales the transformation matrix. */
    public function scale (x :Float, y :Float) :Void {
    	var ii :Int = _manager.textures.length;
    	while (ii-->0) {
    		_manager.textures[ii].graphics.scale(x, y);
    	}
    }

    /** Rotates the transformation matrix by the given angle, in degrees. */
    public function rotate (rotation :Float) :Void {
		Assert.fail("TODO: Implement.");
    }

    /** Multiplies the transformation matrix by the given matrix. */
    public function transform (m00 :Float, m10 :Float, m01 :Float, m11 :Float, m02 :Float, m12 :Float) :Void {
		Assert.fail("TODO: Implement.");
    }

    /** Multiplies the alpha by the given factor. */
    public function multiplyAlpha (factor :Float) :Void {
    	var ii :Int = _manager.textures.length;
    	while (ii-->0) {
    		_manager.textures[ii].graphics.multiplyAlpha(factor);
    	}
    }

    /** Sets the alpha to use for drawing. */
    public function setAlpha (alpha :Float) :Void {
    	var ii :Int = _manager.textures.length;
    	while (ii-->0) {
    		_manager.textures[ii].graphics.setAlpha(alpha);
    	}
    }

    /** Sets the blend mode to use for drawing. */
    public function setBlendMode (blendMode :BlendMode) :Void {
    	var ii :Int = _manager.textures.length;
    	while (ii-->0) {
    		_manager.textures[ii].graphics.setBlendMode(blendMode);
    	}
    }

    /**
     * Sets the scissor rectangle to the intersection of the current scissor rectangle and the given
     * rectangle, in local coordinates.
     */
    public function applyScissor (x :Float, y :Float, width :Float, height :Float) :Void {
    	Assert.fail("TODO: Implement.");
    }

    /** Restores the graphics state back to the previous save(). */
    public function restore () :Void {
    	var ii :Int = _manager.textures.length;
    	while (ii-->0) {
    		_manager.textures[ii].graphics.restore();
    	}
    }

    /** Draws a texture at the given point. */
    public function drawTexture (texture :Texture, destX :Float, destY :Float) :Void {
        drawSubTexture(texture, destX, destY, 0, 0, texture.width, texture.height);
    }

    /** Draws a texture sub-region at the given point. */
    public function drawSubTexture (texture :Texture, destX :Float, destY :Float, sourceX :Float, sourceY :Float, sourceW :Float, sourceH :Float) :Void {
    	var textureSize :Int = _manager.textureSize;

    	var c :Float = (destX) / textureSize;
    	var r :Float = (destY) / textureSize;
    	var startColumn :Int = Math.floor(c);
    	var startRow :Int = Math.floor(r);
    	var diffX :Float = (c - startColumn) * textureSize;
    	var diffY :Float = (r - startRow) * textureSize;

    	c = (destX + sourceX + sourceW) / textureSize;
    	r = (destY + sourceY + sourceH) / textureSize;
    	var endColumn :Int = FMath.min(Math.floor(c), _manager.columns);
    	var endRow :Int = FMath.min(Math.floor(r), _manager.rows); // Make sure we don't draw out of bounds.
    	var diffEndX :Float = (c - endColumn) * textureSize;
    	var diffEndY :Float = (r - endRow) * textureSize;

		for (x in startColumn...endColumn) {
			var pX :Float = x == startColumn ? diffX : 0;
			var pW :Float = x < endColumn-1 ? textureSize : diffEndX + diffX;

			for (y in startRow...endRow) {
				var pY :Float = y == startRow ? diffY : 0;
				var pH :Float = y < endRow-1 ? textureSize : diffEndY + diffY;
				var partial :Texture = _manager.textures[x + y * _manager.columns];

				// partial.graphics.fillRect(Math.round(Math.random() * 0xFFFFFF), 0, 0, textureSize, textureSize); // Debug the texture drawing
				
				partial.graphics.drawSubTexture(texture, pX, pY, (textureSize * x) - destX + pX + sourceX, (textureSize * y) - destY + pY + sourceY, pW, pH);
				// partial.graphics.drawSubTexture(texture, pX, pY, (textureSize * x) - destX + pX, (textureSize * y) - destY + pY, textureSize - pX, textureSize - pY);
			}
			
		}
    }

    /** Draws a repeating texture to the given region. */
    public function drawPattern (texture :Texture, destX :Float, destY :Float, width :Float, height :Float) :Void {
    	Assert.fail("TODO: Implement.");
    }

    /** Draws a colored rectangle at the given region. */
    public function fillRect (color :Int, x :Float, y :Float, width :Float, height :Float) :Void {
    	Assert.fail("TODO: Implement.");
    }

}