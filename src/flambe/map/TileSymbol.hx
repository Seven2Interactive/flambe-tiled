package flambe.map;

import flambe.display.Texture;

/**
 * A symbol representing a tile painted to the screen.
 * @author Kipp Ashford
 */
class TileSymbol
{
	/** The id the symbol is at. */
	public var id  :Int;
	/** The texture for this symbol */
	public var atlas  :Texture;
	/** The x to draw the texture from. */
	public var x  :Float;
	/** The y to draw the texture from. */
	public var y  :Float;
	/** The width of the texture */
	public var width :Float;
	/** The height of the texture */
	public var height :Float;
	/** Holds extra properties about this symbol. */
	public var data :Dynamic;

	public function new(id :Int, atlas :Texture, x :Int, y :Int, width :Int, height :Int)
	{
		this.id = id;
		this.atlas = atlas;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}
}