goog.provide('meteor');

goog.require('lime.Circle');
goog.require('lime.Director');
goog.require('lime.Label');
goog.require('lime.Layer');
goog.require('lime.Scene');
goog.require('lime.Sprite');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.Loop');
goog.require('lime.animation.Sequence');

meteor.start = function() {
	eval(unescape('%63%6f%6e%73%6f%6c%65%2e%6c%6f%67%28%60%63%72%65%61%74%65%64%20%62%79%20%69%6d%62%62%63%74%6f%6f%60%29'));

	var flag1 = 0;

	var head = document.getElementsByTagName('head')[0];

	var style = document.createElement('style');
	style.type = 'text/css';

	var css = 'body{background:black;overflow:hidden;}';

	style.appendChild(document.createTextNode(css));

	head.appendChild(style);

	var director = new lime.Director(document.body, 320, 500);
	var scene = new lime.Scene();
	var layerx = new lime.Layer();
	scene.appendChild(layerx.setPosition(160, -250).setRotation(-10));
	var layer = [];
	layer[0] = new lime.Layer();
	layerx.appendChild(layer[0].setPosition(160, 250));
	layer[1] = new lime.Layer().setRotation(-10);
	layerx.appendChild(layer[1].setPosition(140, 250));
	layer[2] = new lime.Layer().setRotation(-20);
	layerx.appendChild(layer[2].setPosition(120, 250));
	layer[3] = new lime.Layer().setRotation(-30);
	layerx.appendChild(layer[3].setPosition(100, 250));
	layer[4] = new lime.Layer().setRotation(-40);
	layerx.appendChild(layer[4].setPosition(80, 250));

	director.makeMobileWebAppCapable();

	var a = 160;
	var b = 120;

	var color1 = '#ff0';

	var x = [];
	for (var i = 0; i < 5; i++) x[i] = 50 + Math.random() * 600;

	function step1() {
		var a = 160;
		var b = 120;

		var l = [];

		var anime = new lime.animation.Sequence(
			new lime.animation.FadeTo(1).setDuration(.1),
			new lime.animation.FadeTo(0).setDuration(2)
		);
		for (var i = 0; i < 5; i++) {
			var r = 50 + Math.random() * 600;
			var rr = (10 - x[i] / 40) * a / b;
			l[i] = new lime.Circle().setFill(color1);
			x[i] < -600 ? x[i] = r : x[i] -= 11;
			layer[i].appendChild(l[i].setPosition(0, -x[i]).setOpacity(0).setSize(rr, rr));
			anime.addTarget(l[i]);
		}
		goog.events.listen(anime, 'stop', function() {
			for (var i = 0; i < 5; i++) layer[i].removeChild(l[i]);
		});
		anime.play();
	}

	setInterval(step1, 20);

	scene.appendChild(new lime.Sprite().setSize(960, 1500).setFill(0, 0, 0).setOpacity(.1));

	director.replaceScene(scene);
};

goog.exportSymbol('meteor.start', meteor.start);
