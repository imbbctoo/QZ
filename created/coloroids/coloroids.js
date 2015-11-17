//set main namespace
goog.provide('coloroids');


//get requirements
goog.require('coloroids.Game');
goog.require('coloroids.Lime');
goog.require('lime.Director');
goog.require('lime.GlossyButton');
goog.require('lime.Layer');
goog.require('lime.Scene');

// entrypoint
coloroids.start = function() {
	eval(unescape('%63%6f%6e%73%6f%6c%65%2e%6c%6f%67%28%60%63%72%65%61%74%65%64%20%62%79%20%69%6d%62%62%63%74%6f%6f%60%29'));

	coloroids.director = new lime.Director(document.body, 320, 460);
	coloroids.director.makeMobileWebAppCapable();

	coloroids.lime = new coloroids.Lime();

	var scene = new lime.Scene();

	var layer = new lime.Layer().setPosition(160, 230);
	scene.appendChild(layer);

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
