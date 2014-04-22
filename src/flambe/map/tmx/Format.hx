package flambe.map.tmx;

/**
 * Defines the JSON format of TMX maps.
 * @author Kipp Ashford
 */
// Format used for tiled maps
typedef Format = {
	
	// The width of the map in tiles.
	width :Int,

	// The height of the map in tiles.
	height :Int,
	
	// The version of the map format.
	version :Float,

	// The width, in pixels, of each tile. 
	tilewidth :Int,

	// The height, in pixels, of each tile.
	tileheight :Int,

	// The additional properties of the map.
	properties :Null<Dynamic>,

	// The orientation of the map. Currently only supports 'orthogonal'
	orientation :String,

	// The layers for the map.
	layers :Array<LayerFormat>,

	// The tilesets used by the map.
	tilesets :Array<TilesetFormat>,

	// Used to determine if we need to scale the map up or down. Used in physics parsing.
	scale :Null<Float>
}

typedef LayerFormat = {
	// The name of the layer.
	name :String, 
	
	// The type of layer this is.
	type: String,

	// The width, in tiles, of this layer.
	width :Int,

	// The height, in tiles, of this layer.
	height :Int,

	// The opacity of the layer.
	opacity :Float,

	// The visibility of this layer.
	visible :Bool,

	// Is this some kind of offset? Look into this.
	x :Int,	y :Int,

	// Used for 'tilelayer' typed layers.
	// This is an array of GID's for each tile in the map.
	data :Null<Array<Int>>,

	// Used for 'objectgroup' typed layers.
	// This is an array of objects, typically used to lay out physics objects in a level.
	objects :Null<Array<ObjectFormat>>,

	// Currently unused. Should be the color used to mask out the layer image on image layers.
	transparentcolor :Null<String>,

	// Currently unused. This gives us the image to display for image layers.
	image :Null<String>
}

// The tilesets. These hold information on which GID's these tiles represent.
typedef TilesetFormat = {
	// The name of the tileset.
	name :String, 

	// The first tile gid represented in this tileset.
	firstgid :Int,

	// The image used for the tileset.
	image: String,

	// The height of the image.
	imageheight :Int,

	// The width of the image.
	imagewidth :Int,

	// The margin between each tile in the image.
	margin: Int,

	// The spacing for each tile in the image.
	spacing: Null<Int>,

	// The offset from the left and right of the live area of the image.
	tileoffset :Null<PointFormat>,

	// The properties for this tileset.
	properties :Null<Dynamic>,

	// The properties given for individual tiles.
	tileproperties :Null<Dynamic>,

	// The height of each tile in pixels.
	tileheight: Int,

	// The width of each tile in pixels.
	tilewidth :Int,

	// Currently unused. Should be the color used to mask out the layer image.
	transparentcolor :Null<String>
}

// The objects inside an object layer.
typedef ObjectFormat = {
	// The name of the object.
	name :String,

	// The type of object this is. We use this to define the class an object represents.
	type :String,

	// Used for represinting a tile on an object layer.
	gid :Null<Int>,

	// The width of the object. Used for ellipses and rectangles, not polygons.
	width :Float,

	// The height of the object. Used for ellipses and rectangles, not polygons.
	height :Float,

	// The x position of the object.
	x :Float,

	// The y position of the object.
	y :Float,

	// The rotation of the object. This is used in Tiled versions greater than 0.9.1.
	rotation :Null<Float>,

	// If the object is a polygon, this will contain points to construct the object.
	polygon :Null<Array<PointFormat>>,

	// Optional properties for the object.
	properties :Null<Dynamic>,

	// If the object is an ellipse or not.
	ellipse :Bool,
}

// Used for polygons.
typedef PointFormat = {
	x :Float, y :Float
}
