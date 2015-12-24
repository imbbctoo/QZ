goog.provide('mylove');

goog.require('lime.Director');
goog.require('lime.Label');
goog.require('lime.Layer');
goog.require('lime.Scene');
goog.require('lime.Sprite');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.Loop');
goog.require('lime.animation.Sequence');

mylove.start = function() {
	console.log('created by imbbctoo');

	var mode = 2;
	var flag = 0;
	var sound = 1;

	var head = document.getElementsByTagName('head')[0];

	var style = document.createElement('style');
	style.type = 'text/css';

	var css = 'body{background:black;overflow:hidden;}';

	style.appendChild(document.createTextNode(css));

	head.appendChild(style);

	if (sound) {
		var music = document.createElement('audio');
		music.src = 'assets/mylove.mp3';
		music.loop = 'loop';
		music.autoplay = 'autoplay';
	}

	var director = new lime.Director(document.body, 320, 500);

	if (director.getPosition().y > 0) location.reload();

	director.makeMobileWebAppCapable();

	var scene = new lime.Scene();
	var layer = new lime.Layer();
	scene.appendChild(layer.setPosition(160, 250));

	function encode(value) {
		return unescape(value.replace(/&#x/g, '%u').replace(/;/g, ''));
	}

	if (mode == 1) {
		var name = 'demo';
		if (flag) {
			var name = encode('&#x540D;&#x5B57;');
		}
	} else if (mode == 2) {
		var name = ['Jack', 'Jill'];
		if (flag) {
			var name = [encode('&#x7537;&#x5B69;'), encode('&#x5973;&#x5B69;')];
		}
	}

	var color1 = '#fad';
	var color2 = '#f3a';

	var anime = new lime.animation.Loop(new lime.animation.Sequence(
		new lime.animation.FadeTo(1).setDuration(1),
		new lime.animation.FadeTo(0).setDuration(3)
	));

	var l = [];
	for (var i = 0; i < (mode == 1 ? 9 : (mode == 2 ? 10 : 10)); i++) {
		if (mode == 1) {
			l[i] = new lime.Label().setText(name).setFontSize(14).setFontColor(color1).setSize(320, 12);
		} else if (mode == 2) {
			l[i] = new lime.Label().setText(name[parseInt(Math.random() * 2)]).setFontSize(14).setFontColor(color1).setSize(320, 12);
		}
		layer.appendChild(l[i].setOpacity(0));
		anime.addTarget(l[i]);
	}
	l[0].setPosition(0, -90);
	l[1].setPosition(-80, -136);
	l[2].setPosition(80, -136);
	l[3].setPosition(-120, -90);
	l[4].setPosition(120, -90);
	l[5].setPosition(-64, 17);
	l[6].setPosition(64, 17);
	l[7].setPosition(0, 90);
	if (mode == 1) {
		l[8].setPosition(0, -40).setFontSize(30).setText(name);
	} else if (mode == 2) {
		l[8].setPosition(-60, -60).setFontSize(30).setText(name[0]);
		l[9].setPosition(60, -60).setFontSize(30).setText(name[1]);
	}
	anime.play();

	function step() {
		if (mode == 1) {
			var l1 = new lime.Label().setText(name).setFontSize(12).setFontColor(color1).setSize(320, 12);
			var l2 = new lime.Label().setText(name).setFontSize(12).setFontColor(color2).setSize(320, 12);
		} else if (mode == 2) {
			var l1 = new lime.Label().setText(name[parseInt(Math.random() * 2)]).setFontSize(12).setFontColor(color1).setSize(320, 12);
			var l2 = new lime.Label().setText(name[parseInt(Math.random() * 2)]).setFontSize(12).setFontColor(color2).setSize(320, 12);
		}
		var a = 120;
		var sig = Math.pow(-1, parseInt(Math.random() * 2));
		var x = Math.random() * a * 2 - a;
		var y = (Math.pow(Math.pow(x / a, 2), 1 / 3) + Math.pow(1 - x * x / a / a, 1 / 2) * sig) * a / 4 * 3;
		var yy = (Math.pow(Math.pow(x / a, 2), 1 / 3) + Math.pow(1 - x * x / a / a, 1 / 2) * (-sig)) * a / 4 * 3;
		var y2 = Math.random() * Math.abs(y - yy) + Math.min(y, yy);
		layer.appendChild(l1.setPosition(x, -y).setOpacity(0).setFontSize(Math.random() * 4 + 12));
		layer.appendChild(l2.setPosition(x, -y2).setOpacity(0).setFontSize(Math.random() * 6 + 17));
		var anime = new lime.animation.Sequence(
			new lime.animation.FadeTo(1).setDuration(1),
			new lime.animation.FadeTo(0).setDuration(7)
		);
		anime.addTarget(l1);
		anime.addTarget(l2);
		goog.events.listen(anime, 'stop', function() {
			layer.removeChild(l1);
			layer.removeChild(l2);
		});
		anime.play();
	}

	setInterval(step, 150);

	scene.appendChild(new lime.Sprite().setSize(960, 1500).setFill(0, 0, 0).setOpacity(.1));

	director.replaceScene(scene);
};

goog.exportSymbol('mylove.start', mylove.start);
