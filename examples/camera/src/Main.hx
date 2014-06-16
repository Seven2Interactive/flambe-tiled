package;

import flambe.animation.Sine;
import flambe.Entity;
import flambe.System;
import flambe.asset.AssetPack;
import flambe.asset.Manifest;
import flambe.display.FillSprite;
import flambe.map.MapSprite;
import flambe.map.tmx.TmxParser;

/**
 * Application entry for the camera following example.
 * @author Kipp Ashford (volkipp@gmail.com)
 */
class Main
{
    /** The parser to re-use to create maps. */
    private static var parser :TmxParser;
    /** The demo we are running. */
    private static var demoNum :Int = 0;
    /** The map used in our demo. */
    private static var map :Entity;

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
        var background = new FillSprite(0xFFFFFF, System.stage.width, System.stage.height);
        System.root.addChild(new Entity().add(background));

        // Grabs a parser to parse the tilesets and the json map.
        parser = new TmxParser(pack, "camera/map");
        map = new Entity();

        // Wire up a swap between demos on pointer down.
        System.pointer.down.connect(function(_) {
            changeDemo();
        });
        changeDemo();
    }

    /* ---------------------------------------------------------------------------------------- */
    
    public static function automaticCameraDemo()
    {
        map.dispose();
        map.add(parser.newMap(System.stage.width, System.stage.height));
        var mapSprite :MapSprite = map.get(MapSprite);
        mapSprite.disablePointer();

        // Setup a script for the first map's camera to follow.
        mapSprite.camera.x.behavior = new Sine(0,1000, 5);
        mapSprite.camera.y.behavior = new Sine(0,900, 7);
        cast(mapSprite.camera.x.behavior, Sine).speed.behavior = new Sine(5, 2, 10); // Speeds the sine behavior up and down... with another sine behavior. 
        cast(mapSprite.camera.y.behavior, Sine).speed.behavior = new Sine(7, 3, 7);

        // Add them to the stage.
        System.root.addChild(map);

    }

    /* ---------------------------------------------------------------------------------------- */
    
    public static function mouseFollowerDemo()
    {
        
    }

    /* ---------------------------------------------------------------------------------------- */
    
    public static function spriteFollowerDemo()
    {
        
    }

    /* ---------------------------------------------------------------------------------------- */
    
    public static function changeDemo()
    {
        switch (demoNum++) {
            case 0:
                automaticCameraDemo();
            case 1:
                mouseFollowerDemo();
            case 2:
                spriteFollowerDemo();
        }
    }
}
