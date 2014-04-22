package;

import Game;
import flambe.Entity;
import flambe.System;
import flambe.asset.AssetPack;
import flambe.asset.Manifest;
import flambe.display.FillSprite;
import flambe.map.MapSprite;
import flambe.map.tmx.TmxParser;

/**
 * Application entry for the pathfinding example.
 * @author Kipp Ashford (volkipp@gmail.com)
 */
class Main
{

    private static function main ()
    {
        // Wind up all platform-specific stuff
        System.init();

        // Load up the compiled pack in the assets directory named "bootstrap"
        var manifest = Manifest.fromAssets("bootstrap");

        var loader = System.loadAssetPack(manifest);
        loader.get(onSuccess);
    }

    private static function onSuccess (pack :AssetPack)
    {
        // Add a solid color background
        var background = new FillSprite(0x202020, System.stage.width, System.stage.height);
        System.root.addChild(new Entity().add(background));

        // Grabs a parser to parse the tilesets and the json map.
        var parser :TmxParser = new TmxParser(pack, "pathfind/map");

        // The map sprite to use. Pass in the viewport width and height.
        var mapSprite :MapSprite = parser.newMap(System.stage.width, System.stage.height);

        var game :Entity = new Entity()
            .add(mapSprite)
            .add(new Game(pack)); // Add the game logic.

        System.root.addChild(game);
    }
}
