flambe-tiled
============

flambe-tiled is a library for adding tile maps and map editing to the [Flambe framework](https://github.com/aduros/flambe). Instead of tightly coupling the game map support to [Tiled Map Editor](http://www.mapeditor.org) (TMX) maps,
it's written in such a way that you could easily create your own parser to creat tile layers, object layers, image layers, etc. Much of the code was
adapted from my work on [SpongeBob: The Goo From Goo Lagoon](http://spongebob.nick.com/games/spongebob-squarepants-the-goo-from-goo-lagoon.html)

In my tests the implementation is lightweight and renders quick. Only the tiles which need to be rendered in your viewport will be drawn, increasing
performance by quite a bit.

What's Included
---------------
- A TMX map parser using the JSON format.
- Orthogonal maps with possible support for other types down the line.
- A camera system for following items on a map.
- Tile layers which can be manipulated on the fly.
- A* Pathfinding adapted from Haxepunk-AI (Thanks [Matt Tuttle!](http://matttuttle.com/))

Tiled Support
-------------
Although there are a couple of implementations of Tiled support in Haxe, I wanted something very lightweight for mobile targets. I ended up settling on only
supporting the JSON export format for Tiled maps because:
1. The parsing code is extremely tiny compared to XML, and if it's Gzipped it's even more complex.
2. You can still open the JSON format directly in Tiled. You don't need to keep TMX files at all!
3. In many tests, the map definition files were nearly 1/4 the size compared to the XML equivalent. If you minify the json file, they're even smaller.

Roadmap
-------
Add instructions on how to use the JSON format in [Tiled](http://www.mapeditor.org).
Add a easy to understand camera demo.
Add a Nape physics demo.
Add dynamic map refresh code in the demos.
Look at my camera implementation again and possibly investigate zooming.
Support for animated tiles.

Credits
-------
The demos currently use the tilesets from an old [TutsPlus article](http://gamedevelopment.tutsplus.com/tutorials/introduction-to-tiled-map-editor-a-great-platform-agnostic-tool-for-making-level-maps--gamedev-2838).
Matt Tuttle's pathfinding code
A few functions here and there were used for 2D array manipulation from Polygonal Labs [ds library](https://github.com/polygonal/ds). It was also used by Matt in the A* pathfinding code.