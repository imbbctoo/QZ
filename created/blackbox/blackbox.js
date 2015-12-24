goog.provide('blackbox');

goog.require('blackbox.Game');
goog.require('imbbctoo.Lime');
goog.require('lime.Director');
goog.require('lime.GlossyButton');
goog.require('lime.Layer');
goog.require('lime.Scene');
goog.require('lime.transitions.SlideIn');

blackbox.start = function() {
	console.log('created by imbbctoo');

	var head = document.getElementsByTagName('head')[0];

	var style = document.createElement('style');
	style.type = 'text/css';

	var css = 'body{background:black;overflow:hidden;}';

	style.appendChild(document.createTextNode(css));

	head.appendChild(style);

	var w = 320;
	var h = window.innerHeight / window.innerWidth * w;
	h = h < 460 ? 460 : h;

	blackbox.director = new lime.Director(document.body, w, h);

	if (blackbox.director.getPosition().y > 0) location.reload();

	blackbox.director.makeMobileWebAppCapable();

	blackbox.lime = new imbbctoo.Lime(blackbox.director.getSize().width / 2, blackbox.director.getSize().height - 40);

	var scene = new lime.Scene();

	var layer = new lime.Layer().setPosition(blackbox.director.getSize().width / 2, blackbox.director.getSize().height / 2);
	scene.appendChild(layer);

	layer.appendChild(new lime.Sprite().setSize(blackbox.director.getSize().width, blackbox.director.getSize().height).setFill(255, 255, 255));

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
	layer = new lime.Layer().setPosition(blackbox.director.getSize().width / 2, blackbox.director.getSize().height / 2);

	scene.appendChild(layer);

	var game = new blackbox.Game();
	layer.appendChild(game);

	blackbox.lime.builtWithLime(scene);

	blackbox.director.replaceScene(scene, lime.transitions.SlideIn);
};

goog.exportSymbol('blackbox.start', blackbox.start);
