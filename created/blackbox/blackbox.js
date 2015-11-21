//set main namespace
goog.provide('blackbox');


//get requirements
goog.require('blackbox.Game');
goog.require('blackbox.Lime');
goog.require('lime.Director');
goog.require('lime.GlossyButton');
goog.require('lime.Layer');
goog.require('lime.Scene');
goog.require('lime.transitions.SlideIn');

// entrypoint
blackbox.start = function() {
	eval(unescape('%63%6f%6e%73%6f%6c%65%2e%6c%6f%67%28%60%63%72%65%61%74%65%64%20%62%79%20%69%6d%62%62%63%74%6f%6f%60%29'));

	var head = document.getElementsByTagName('head')[0];

	var style = document.createElement('style');
	style.type = 'text/css';

	var css = 'body{background:black;overflow:hidden;}';

	style.appendChild(document.createTextNode(css));

	head.appendChild(style);

	blackbox.director = new lime.Director(document.body, 320, 460);
	blackbox.director.makeMobileWebAppCapable();

	blackbox.lime = new blackbox.Lime();

	var scene = new lime.Scene();

	var layer = new lime.Layer().setPosition(160, 230);
	scene.appendChild(layer);

	layer.appendChild(new lime.Sprite().setSize(400, 500).setFill(255, 255, 255));

	var btn = new lime.GlossyButton('PLAY').setSize(100, 40);
	goog.events.listen(btn, 'click', function() {
		blackbox.newgame();
	});
	layer.appendChild(btn);

	blackbox.director.makeMobileWebAppCapable();

	blackbox.lime.builtWithLime(scene);

	blackbox.director.replaceScene(scene);
};

blackbox.newgame = function() {
	var scene = new lime.Scene(),
	layer = new lime.Layer().setPosition(160, 230);

	scene.appendChild(layer);

	var game = new blackbox.Game();
	layer.appendChild(game.setPosition(0, 0));

	blackbox.lime.builtWithLime(scene);

	blackbox.director.replaceScene(scene, lime.transitions.SlideIn);
};


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('blackbox.start', blackbox.start);
