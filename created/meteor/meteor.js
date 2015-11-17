goog.provide('meteor');

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

	var css = '*{margin:0 auto;padding:0 auto;}body{background:black;overflow:hidden;}';

	style.appendChild(document.createTextNode(css));

	head.appendChild(style);

	var director = new lime.Director(document.body, 320, 500);
	var scene = new lime.Scene();
	var layerx = new lime.Layer();
	scene.appendChild(layerx.setPosition(160, -250));
	var layer3 = new lime.Layer();
	layerx.appendChild(layer3.setPosition(160, 250));
	var layer4 = new lime.Layer().setRotation(10);
	layerx.appendChild(layer4.setPosition(160, 250));
	var layer5 = new lime.Layer().setRotation(20);
	layerx.appendChild(layer5.setPosition(160, 250));
	var layer6 = new lime.Layer().setRotation(30);
	layerx.appendChild(layer6.setPosition(160, 250));

	director.makeMobileWebAppCapable();

	function encode(value) {
		return unescape(value.replace(/&#x/g, '%u').replace(/;/g, ''));
	}

	var name1 = 0;
	if (flag1) {
		var name1 = encode('&#x540D;&#x5B57;');
	}

	var a = 160;
	var b = 120;

	var color1 = '#ff0';

	var x = 160;

	function step1() {
		var a = 160;
		var b = 120;

		var l1 = new lime.Label().setText(name1).setFontSize(12 * a / b).setFontColor(color1).setSize(320, 12);
		var l2 = new lime.Label().setText(name1).setFontSize(12 * a / b).setFontColor(color1).setSize(320, 12);
		var l3 = new lime.Label().setText(name1).setFontSize(12 * a / b).setFontColor(color1).setSize(320, 12);
		var l4 = new lime.Label().setText(name1).setFontSize(12 * a / b).setFontColor(color1).setSize(320, 12);
		x < -320 ? x = 160 : x -= 10;
		var y = 1.5625 * x;
		layer3.appendChild(l1.setPosition(x, -y).setOpacity(0).setFontSize((Math.random() * 4 + 12) * a / b));
		layer4.appendChild(l2.setPosition(x, -y).setOpacity(0).setFontSize((Math.random() * 4 + 12) * a / b));
		layer5.appendChild(l3.setPosition(x, -y).setOpacity(0).setFontSize((Math.random() * 4 + 12) * a / b));
		layer6.appendChild(l4.setPosition(x, -y).setOpacity(0).setFontSize((Math.random() * 4 + 12) * a / b));
		var anime = new lime.animation.Sequence(
			new lime.animation.FadeTo(1).setDuration(1),
			new lime.animation.FadeTo(0).setDuration(1)
		);
		anime.addTarget(l1);
		anime.addTarget(l2);
		anime.addTarget(l3);
		anime.addTarget(l4);
		goog.events.listen(anime, 'stop', function() {
			layer3.removeChild(l1);
			layer4.removeChild(l2);
			layer5.removeChild(l3);
			layer6.removeChild(l4);
		});
		anime.play();
	}

	setInterval(step1, 30);

	scene.appendChild(new lime.Sprite().setSize(960, 1500).setFill(0, 0, 0).setOpacity(.1));

	director.replaceScene(scene);
};

goog.exportSymbol('meteor.start', meteor.start);
