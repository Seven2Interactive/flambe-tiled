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
	public var width(default, null) :Int;
	/** The height of the texture */
	public var height(default, null) :Int;
    /** The graphics interface to work with */
    public var graphics(default, null) :Graphics;
    /** The number of columns total */
    public var columns(default, null) :Int;
    /** The number of rows total */
    public var rows(default, null) :Int;
    /** An array of all our blank textures. */
    @:allow(flambe.display) var textures :Array<Array<Texture>>;
    /** The size of the textures */
    @:allow(flambe.display) var textureSize :Int;
	
	/* ---------------------------------------------------------------------------------------- */

	public function new(width :Int, height :Int) :Void
	{
		// set default values.
		this.textureSize = System.renderer.maxTextureSize;
		this.width = width;
		this.height = height;
		
		// debug statement to check system texture size and such.
#if debug trace('Texture:\nwidth:$width\nheight:$height\nmax:$textureSize'); #end

		// set up our array of textures.
		var nCols:Int = Math.ceil(this.width / this.textureSize);
		var nRows:Int = Math.ceil(this.height / this.textureSize);
		this.textures = new Array();
		var aTexture:Array<Texture> = null;
		for (i in 0...nCols)
		{
			aTexture = new Array();
			for (j in 0...nRows)
				aTexture.push(System.renderer.createTexture(this.textureSize, this.textureSize));
			this.textures.push(aTexture);
		}
		
		// see if we should create a BTG or just use a normal graphic.
		if (nCols == 1 && nRows == 1)
			this.graphics = textures[0][0].graphics;
		else
			this.graphics = new BigTextureGraphics(this);
	}
	
	/* ---------------------------------------------------------------------------------------- */

	/**
	 * Draws the large group of combined textures to the given graphics.
	 * 
	 * @param  g :Graphics     [description]
	 */
	public function draw(g:Graphics) :Void
	{
		var aTexture:Array<Texture> = null;
		var nX:Int = 0;
		var nY:Int = 0;
		for (i in 0...this.textures.length)
		{
			aTexture = this.textures[i];
			for (j in 0...aTexture.length)
			{
				nX = this.textureSize * i;
				nY = this.textureSize * j;
				g.drawTexture(aTexture[j], nX, nY);
			}
		}
	}
	
	/* ---------------------------------------------------------------------------------------- */

	public function dispose() :Void
	{
		var aTexture:Array<Texture> = null;
		while (this.textures.length > 0)
		{
			aTexture = this.textures.pop();
			while (aTexture.length > 0)
				aTexture.pop().dispose();
		}
	}
	
	/* ---------------------------------------------------------------------------------------- */
	
}

/**
 * The clas to manage the draw calls.
 */
private class BigTextureGraphics implements Graphics
{
	/** The texture we are working with. */
	private var _manager :BigTexture;
	
	/* ---------------------------------------------------------------------------------------- */

	public function new(manager :BigTexture) :Void
	{
		_manager = manager;
	}
	
	/* ---------------------------------------------------------------------------------------- */

    public function save () :Void
	{
		var aTexture:Array<Texture> = null;
		for (i in 0..._manager.textures.length)
		{
			aTexture = _manager.textures[i];
			for (j in 0...aTexture.length)
				aTexture[j].graphics.save();
		}
    }
	
	/* ---------------------------------------------------------------------------------------- */

    /** Translates the transformation matrix. */
    public function translate (x :Float, y :Float) :Void
	{
		var aTexture:Array<Texture> = null;
		for (i in 0..._manager.textures.length)
		{
			aTexture = _manager.textures[i];
			for (j in 0...aTexture.length)
				aTexture[j].graphics.translate(x, y);
		}
    }

	/* ---------------------------------------------------------------------------------------- */
	
    /** Scales the transformation matrix. */
    public function scale (x :Float, y :Float) :Void
	{
		var aTexture:Array<Texture> = null;
		for (i in 0..._manager.textures.length)
		{
			aTexture = _manager.textures[i];
			for (j in 0...aTexture.length)
				aTexture[j].graphics.scale(x, y);
		}
    }

	/* ---------------------------------------------------------------------------------------- */
	
    /** Rotates the transformation matrix by the given angle, in degrees. */
    public function rotate (rotation :Float) :Void {
		Assert.fail("TODO: Implement.");
    }

	/* ---------------------------------------------------------------------------------------- */
	
    /** Multiplies the transformation matrix by the given matrix. */
    public function transform (m00 :Float, m10 :Float, m01 :Float, m11 :Float, m02 :Float, m12 :Float) :Void {
		Assert.fail("TODO: Implement.");
    }

	/* ---------------------------------------------------------------------------------------- */
	
    /** Multiplies the alpha by the given factor. */
    public function multiplyAlpha (factor :Float) :Void
	{
		var aTexture:Array<Texture> = null;
		for (i in 0..._manager.textures.length)
		{
			aTexture = _manager.textures[i];
			for (j in 0...aTexture.length)
				aTexture[j].graphics.multiplyAlpha(factor);
		}
    }

	/* ---------------------------------------------------------------------------------------- */
	
    /** Sets the alpha to use for drawing. */
    public function setAlpha (alpha :Float) :Void {
    	var aTexture:Array<Texture> = null;
		for (i in 0..._manager.textures.length)
		{
			aTexture = _manager.textures[i];
			for (j in 0...aTexture.length)
				aTexture[j].graphics.setAlpha(alpha);
		}
    }

	/* ---------------------------------------------------------------------------------------- */
	
    /** Sets the blend mode to use for drawing. */
    public function setBlendMode (blendMode :BlendMode) :Void 
	{
    	var aTexture:Array<Texture> = null;
		for (i in 0..._manager.textures.length)
		{
			aTexture = _manager.textures[i];
			for (j in 0...aTexture.length)
				aTexture[j].graphics.setBlendMode(blendMode);
		}
    }

	/* ---------------------------------------------------------------------------------------- */
	
    /**
     * Sets the scissor rectangle to the intersection of the current scissor rectangle and the given
     * rectangle, in local coordinates.
     */
    public function applyScissor (x :Float, y :Float, width :Float, height :Float) :Void {
    	Assert.fail("TODO: Implement.");
    }

	/* ---------------------------------------------------------------------------------------- */
	
    /** Restores the graphics state back to the previous save(). */
    public function restore () :Void
	{
		var aTexture:Array<Texture> = null;
		for (i in 0..._manager.textures.length)
		{
			aTexture = _manager.textures[i];
			for (j in 0...aTexture.length)
				aTexture[j].graphics.restore();
		}
    }
	
	/* ---------------------------------------------------------------------------------------- */

    /** Draws a texture at the given point. */
    public function drawTexture (texture :Texture, destX :Float, destY :Float) :Void
	{
        drawSubTexture(texture, destX, destY, 0, 0, texture.width, texture.height);
    }
	
	/* ---------------------------------------------------------------------------------------- */

    /** Draws a texture sub-region at the given point. */
    public function drawSubTexture (texture :Texture, destX :Float, destY :Float, sourceX :Float, sourceY :Float, sourceW :Float, sourceH :Float) :Void
	{
//trace("BigTextureGraphics::drawSubTexture()\n" +
	//"\tDestination: (" + destX + ", " + destY + ")\n" + 
	//"\tSource: (" + sourceX + ", " + sourceY + ", " + sourceW + ", " + sourceH + ")\n");
	
		// get the texture size since we will be using it all the times.
    	var nTexSize :Int = _manager.textureSize;
		
		// get all the starting values.
		var nStartCol:Int = Math.floor(destX / nTexSize);
		var nStartRow:Int = Math.floor(destY / nTexSize);
		var nDiffStartX:Float = destX % nTexSize;
		var nDiffStartY:Float = destY % nTexSize;
		
		// get the ending values.
		var nEndCol:Int = Math.floor((destX + sourceW) / nTexSize);
		var nEndRow:Int = Math.floor((destY + sourceH) / nTexSize);
		var nDiffEndX:Float = (destX + sourceW) % nTexSize;
		var nDiffEndY:Float = (destY + sourceH) % nTexSize;
		
		// start our drawing.
		var nCurWidth:Float = 0;
		var nCurHeight:Float = 0;
		var nDX:Float = 0;
		var nDY:Float = 0;
		var nSX:Float = 0;
		var nSY:Float = 0;
		var nW:Float = 0;
		var nH:Float = 0;
		var nRow:Int = 0;
		var nCol:Int = 0;
		while (nCurWidth < sourceW)
		{
			// reset the height.
			nCurHeight = 0;
			
			// set the horizontal values.
			nCol = Math.floor((destX + nCurWidth) / nTexSize);
			nDX = (nCurWidth == 0) ? destX % nTexSize : 0;
			nSX = sourceX + nCurWidth;
			if (nCurWidth == 0)
			{
				if (nDX + sourceW < nTexSize)
					nW = sourceW;
				else
					nW = nTexSize - nDX;
			}
			else if (sourceW - nCurWidth < nTexSize)
				nW = sourceW - nCurWidth;
			else
				nW = nTexSize;
				
			// draw columns, then move to the right.
			while (nCurHeight < sourceH)
			{
				nRow = Math.floor((destY + nCurHeight) / nTexSize);
				nDY = (nCurHeight == 0) ? destY % nTexSize : 0;
				nSY = sourceY + nCurHeight;
				if (nCurHeight == 0)
				{
					if (nDY + sourceH < nTexSize)
						nH = sourceH;
					else
						nH = nTexSize - nDY;
				}
				else if (sourceH - nCurHeight < nTexSize)
					nH = sourceH - nCurHeight;
				else
					nH = nTexSize;
					
				
//trace("DRAWING TEXTURE(" + nCol + ", " + nRow + ")\n" +
		//"\tDestination: (" + nDX + ", " + nDY + ")\n" + 
		//"\tSource: (" + nSX + ", " + nSY + ", " + nW + ", " + nH + ")\n");
				// draw to graphic.
				_manager.textures[nCol][nRow].graphics.drawSubTexture(texture, nDX, nDY, nSX, nSY, nW, nH);
					
				// add to the height.
				nCurHeight += nH;
			}
			
			// add to the width.
			nCurWidth += nW;
		}
    }
	
	/* ---------------------------------------------------------------------------------------- */

    /** Draws a repeating texture to the given region. */
    public function drawPattern (texture :Texture, destX :Float, destY :Float, width :Float, height :Float) :Void {
    	Assert.fail("TODO: Implement.");
    }
	
	/* ---------------------------------------------------------------------------------------- */

    /** Draws a colored rectangle at the given region. */
    public function fillRect (color :Int, x :Float, y :Float, width :Float, height :Float) :Void {
    	Assert.fail("TODO: Implement.");
    }
	
	/* ---------------------------------------------------------------------------------------- */

}