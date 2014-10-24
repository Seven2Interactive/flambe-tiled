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
	public var width(default, null)				:Int;
	/** The height of the texture */
	public var height(default, null)			:Int;
    /** The graphics interface to work with */
    public var graphics(default, null)			:BigTextureGraphics;
    /** The number of columns total */
    public var columns(default, null)			:Int;
    /** The number of rows total */
    public var rows(default, null)				:Int;
    /** An array of all our blank textures. */
    @:allow(flambe.display) var textures		:Array<Array<Texture>>;
    /** The size of the textures */
    @:allow(flambe.display) var textureSize		:Int;
	
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
		columns = Math.ceil(this.width / this.textureSize);
		rows = Math.ceil(this.height / this.textureSize);
		this.textures = new Array();
		var aTexture:Array<Texture> = null;
		for (i in 0...columns)
		{
			aTexture = new Array();
			for (j in 0...rows)
				aTexture.push(System.renderer.createTexture(this.textureSize, this.textureSize));
			this.textures.push(aTexture);
		}
		
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

	/**
	 * Draws the large group of combined textures to the given graphics.
	 * 
	 * @param  g :Graphics     [description]
	 */
	public function drawSubTexture(g:Graphics, destX :Float, destY :Float, sourceX :Float, sourceY :Float, sourceW :Float, sourceH :Float) :Void
	{
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
			nCol = Math.floor((sourceX + nCurWidth) / this.textureSize);
			nDX = destX + nCurWidth;
			nSX = (nCurWidth == 0) ? sourceX % this.textureSize : 0;
			if (nCurWidth == 0)
			{
				if (nSX + sourceW < this.textureSize)
					nW = sourceW;
				else
					nW = this.textureSize - nSX;
			}
			else if (sourceW - nCurWidth < this.textureSize)
				nW = sourceW - nCurWidth;
			else
				nW = this.textureSize;
				
			// draw columns, then move to the right.
			while (nCurHeight < sourceH)
			{
				nRow = Math.floor((destY + nCurHeight) / this.textureSize);
				nDY = destY + nCurHeight;
				//nDY = (nCurHeight == 0) ? destY % this.textureSize : 0;
				nSY = (nCurHeight == 0) ? sourceY % this.textureSize : 0;
				if (nCurHeight == 0)
				{
					if (nSY + sourceH < this.textureSize)
						nH = sourceH;
					else
						nH = this.textureSize - nSY;
				}
				else if (sourceH - nCurHeight < this.textureSize)
					nH = sourceH - nCurHeight;
				else
					nH = this.textureSize;
					
				// draw to graphic.
				g.drawSubTexture(this.textures[nCol][nRow], nDX, nDY, nSX, nSY, nW, nH);
					
				// add to the height.
				nCurHeight += nH;
			}
			
			// add to the width.
			nCurWidth += nW;
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

/* ---------------------------------------------------------------------------------------- */

/**
 * The clas to manage the draw calls.
 */
private class BigTextureGraphics implements Graphics
{
	/** The texture we are working with. */
	private var _manager			:BigTexture;
	/** Triple array representing a vector of draw calls one to one with the texture map. */
	private var	_drawCalls			:Array<Array<Array<TextureDrawCall>>>;
	
	/* ---------------------------------------------------------------------------------------- */

	public function new(manager :BigTexture) :Void
	{
		_manager = manager;
		
		// create the array for draw calls..
		_drawCalls = [];
		for (i in 0..._manager.columns)
		{
			_drawCalls.push([]);
			for (j in 0..._manager.rows)
				_drawCalls[i][j] = [];
		}
	}
	
	/* ---------------------------------------------------------------------------------------- */

    public function save() :Void
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
		// get the texture size since we will be using it all the times.
    	var nTexSize :Int = _manager.textureSize;
		
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
					
				
				// draw to graphic.
				_drawCalls[nCol][nRow].push(new TextureDrawCall(texture, nDX, nDY, nSX, nSY, nW, nH));
											
				// add to the height.
				nCurHeight += nH;
			}
			
			// add to the width.
			nCurWidth += nW;
		}
    }
	
	/* ---------------------------------------------------------------------------------------- */

    /** Writes all draw calls to the texture. */
    public function flush():Void
	{
		var drawCall :TextureDrawCall = null;
		for (i in 0..._drawCalls.length)
		{
			for (j in 0..._drawCalls[i].length)
			{
				for (k in 0..._drawCalls[i][j].length)
				{
					drawCall = _drawCalls[i][j][k];
					_manager.textures[i][j].graphics.drawSubTexture(drawCall.texture,
																	drawCall.destX,
																	drawCall.destY,
																	drawCall.sourceX,
																	drawCall.sourceY,
																	drawCall.sourceW,
																	drawCall.sourceH);
				}
			}
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


private class TextureDrawCall
{
	/** The texture. */
	public var texture :Texture;
	/** The destination X */
	public var destX :Float;
	/** The destination Y */
	public var destY :Float;
	/** The source X */
	public var sourceX :Float;
	/** The source X */
	public var sourceY :Float;
	/** The source width */
	public var sourceW :Float;
	/** The source height */
	public var sourceH :Float;
	
	/* ---------------------------------------------------------------------------------------- */

	public function new(t:Texture, dX :Float, dY :Float, sX :Float, sY :Float, sW :Float, sH :Float) :Void
	{
		this.texture = t;
		this.destX = dX;
		this.destY = dY;
		this.sourceX = sX;
		this.sourceY = sY;
		this.sourceW = sW;
		this.sourceH = sH;
	}	
}
