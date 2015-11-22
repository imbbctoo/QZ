//set main namespace
goog.provide('coloroids');


//get requirements
goog.require('coloroids.Game');
goog.require('coloroids.Lime');
goog.require('lime.Director');
goog.require('lime.GlossyButton');
goog.require('lime.Layer');
goog.require('lime.Scene');
goog.require('lime.Sprite');

// entrypoint
coloroids.start = function() {
	console.log('created by imbbctoo');

	var head = document.getElementsByTagName('head')[0];

	var style = document.createElement('style');
	style.type = 'text/css';

	var css = 'body{background:black;overflow:hidden;}';

	style.appendChild(document.createTextNode(css));

	head.appendChild(style);

	coloroids.director = new lime.Director(document.body, 320, 460);
	coloroids.director.makeMobileWebAppCapable();

	coloroids.lime = new coloroids.Lime();

	var scene = new lime.Scene();

	var layer = new lime.Layer().setPosition(160, 230);
	scene.appendChild(layer);

	layer.appendChild(new lime.Sprite().setSize(400, 500).setFill(255, 255, 255));

	var btn = new lime.GlossyButton('PLAY').setSize(100, 40);
	goog.events.listen(btn, 'click', function() {
		coloroids.newgame();
	});
	layer.appendChild(btn);

	coloroids.director.makeMobileWebAppCapable();

	coloroids.lime.builtWithLime(scene);

	coloroids.director.replaceScene(scene);

};

coloroids.newgame = function() {
	var scene = new lime.Scene(),
	layer = new lime.Layer().setPosition(160, 230);

	scene.appendChild(layer);

	var game = new coloroids.Game();
	layer.appendChild(game.setPosition(0, 0));

	coloroids.lime.builtWithLime(scene);

	coloroids.director.replaceScene(scene);
};


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('coloroids.start', coloroids.start);
