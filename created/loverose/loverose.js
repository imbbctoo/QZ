goog.provide('loverose');

goog.require('lime.Circle');
goog.require('lime.Director');
goog.require('lime.Label');
goog.require('lime.Layer');
goog.require('lime.Scene');
goog.require('lime.Sprite');
goog.require('lime.animation.Delay');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.Loop');
goog.require('lime.animation.Sequence');
goog.require('loverose.Function');

loverose.start = function() {
	console.log('created by imbbctoo');

	var head = document.getElementsByTagName('head')[0];

	var style = document.createElement('style');
	style.type = 'text/css';

	var css = 'body{background:black;z-index:-1;}';

	style.appendChild(document.createTextNode(css));

	head.appendChild(style);

	var mode = 1;
	var flag1 = 0;
	var sound = 1;
	var flag2 = 0;

	if (sound) {
		var music = document.createElement('audio');
		music.src = 'assets/loverose.mp3';
		music.loop = 'loop';
		music.autoplay = 'autoplay';
	}

	var w = 320;
	var h = window.innerHeight / window.innerWidth * w;
	h = h < 460 ? 460 : h;

	var director = new lime.Director(document.body, w, h);

	var scene = new lime.Scene();
	var layerx = new lime.Layer();
	scene.appendChild(layerx.setPosition(w / 2 + 50, -h / 2 - 50).setRotation(-10));
	var layer = [];
	layer[0] = new lime.Layer();
	layerx.appendChild(layer[0].setPosition(w / 2, h / 2));
	layer[1] = new lime.Layer().setRotation(-10);
	layerx.appendChild(layer[1].setPosition(w / 2, h / 2));
	layer[2] = new lime.Layer().setRotation(-20);
	layerx.appendChild(layer[2].setPosition(w / 2, h / 2));
	layer[3] = new lime.Layer().setRotation(-30);
	layerx.appendChild(layer[3].setPosition(w / 2, h / 2));
	layer[4] = new lime.Layer().setRotation(-40);
	layerx.appendChild(layer[4].setPosition(w / 2, h / 2));
	var layer1 = new lime.Layer();
	scene.appendChild(layer1.setPosition(w / 2 + 51, h / 2 + 30));
	var layer2 = new lime.Layer();
	scene.appendChild(layer2.setPosition(w / 2 - 58, h / 2 + 5).setRotation(15));

	if (mode == 1) {
		var name1 = 'demo';
		if (flag1) {
			var name1 = unescape('%u540D%u5B57');
		}
	} else if (mode == 2) {
		var name1 = ['Jack', 'Jill'];
		if (flag1) {
			var name1 = [unescape('%u7537%u5B69'), unescape('%u5973%u5B69')];
		}
	}
	var a = 80;
	var b = 120;

	var color1 = '#fad';
	var color2 = '#f3a';

	var anime = new lime.animation.Loop(new lime.animation.Sequence(
		new lime.animation.FadeTo(1).setDuration(1),
		new lime.animation.FadeTo(0).setDuration(3)
	));

	var delay = new lime.animation.Delay().setDuration(4);

	var l = [];
	for (var i = 0; i < (mode == 1 ? 9 : (mode == 2 ? 10 : 10)); i++) {
		if (mode == 1) {
			l[i] = new lime.Label().setText(name1).setFontSize(14 * a / b).setFontColor(color1).setSize(320, 12);
		} else if (mode == 2) {
			l[i] = new lime.Label().setText(name1[parseInt(Math.random() * 2)]).setFontSize(14 * a / b).setFontColor(color1).setSize(320, 12);
		}
		layer1.appendChild(l[i].setOpacity(0));
		delay.addTarget(l[i]);
		anime.addTarget(l[i]);
	}
	l[0].setPosition(0 * a / b, -90 * a / b);
	l[1].setPosition(-80 * a / b, -136 * a / b);
	l[2].setPosition(80 * a / b, -136 * a / b);
	l[3].setPosition(-120 * a / b, -90 * a / b);
	l[4].setPosition(120 * a / b, -90 * a / b);
	l[5].setPosition(-64 * a / b, 17 * a / b);
	l[6].setPosition(64 * a / b, 17 * a / b);
	l[7].setPosition(0 * a / b, 90 * a / b);
	if (mode == 1) {
		l[8].setPosition(0 * a / b, -40 * a / b).setFontSize(40 * a / b).setText(name1);
	} else if (mode == 2) {
		l[8].setPosition(-65 * a / b, -65 * a / b).setFontSize(40 * a / b).setText(name1[0]);
		l[9].setPosition(65 * a / b, -65 * a / b).setFontSize(40 * a / b).setText(name1[1]);
	}

	delay.play();
	goog.events.listen(delay, 'stop', function() {
		anime.play();
	});

	function step1(a, b) {
		if (mode == 1) {
			var l1 = new lime.Label().setText(name1).setFontSize(12 * a / b).setFontColor(color1).setSize(320, 12);
			var l2 = new lime.Label().setText(name1).setFontSize(12 * a / b).setFontColor(color2).setSize(320, 12);
		} else if (mode == 2) {
			var l1 = new lime.Label().setText(name1[parseInt(Math.random() * 2)]).setFontSize(12 * a / b).setFontColor(color1).setSize(320, 12);
			var l2 = new lime.Label().setText(name1[parseInt(Math.random() * 2)]).setFontSize(12 * a / b).setFontColor(color2).setSize(320, 12);
		}
		var sig = Math.pow(-1, parseInt(Math.random() * 2));
		var x = Math.random() * a * 2 - a;
		var y = (Math.pow(Math.pow(x / a, 2), 1 / 3) + Math.pow(1 - x * x / a / a, 1 / 2) * sig) * a / 4 * 3;
		var yy = (Math.pow(Math.pow(x / a, 2), 1 / 3) + Math.pow(1 - x * x / a / a, 1 / 2) * (-sig)) * a / 4 * 3;
		var y2 = Math.random() * Math.abs(y - yy) + Math.min(y, yy);
		layer1.appendChild(l1.setPosition(x, -y).setOpacity(0).setFontSize((Math.random() * 4 + 12) * a / b));
		layer1.appendChild(l2.setPosition(x, -y2).setOpacity(0).setFontSize((Math.random() * 6 + 21) * a / b));
		var anime = new lime.animation.Sequence(
			new lime.animation.FadeTo(1).setDuration(1),
			new lime.animation.FadeTo(0).setDuration(4)
		);
		anime.addTarget(l1);
		anime.addTarget(l2);
		goog.events.listen(anime, 'stop', function() {
			layer1.removeChild(l1);
			layer1.removeChild(l2);
		});
		anime.play();
	}

	var name2 = ['0', '1'];
	if (flag2) var name2 = [unescape('%u2661'), unescape('%u2661')];

	var color3 = '#45d';
	var color4 = '#5a6';

	function step2() {
		var coordinate = new loverose.Function();
		var r = parseInt(Math.random() * 25);
		var l1 = new lime.Label().setText(name2[parseInt(Math.random() * 2)]).setFontSize(1).setFontColor(r < 4 || r > 20 ? color4 : color3).setSize(320, 12);
		var x = parseInt(coordinate.x[r]);
		var y = parseInt(coordinate.y[r]);
		layer2.appendChild(l1.setPosition(x, -y).setOpacity(0).setFontSize(Math.random() * 5 + 10));
		var anime = new lime.animation.Sequence(
			new lime.animation.FadeTo(1).setDuration(1),
			new lime.animation.Delay().setDuration(15),
			new lime.animation.FadeTo(0).setDuration(1)
		);
		anime.addTarget(l1);
		goog.events.listen(anime, 'stop', function() {
			layer2.removeChild(l1);
		});
		anime.play();
	}

	var color5 = '#ffa';

	var x = [];
	for (var i = 0; i < 5; i++) x[i] = 200 + Math.random() * 600;

	function step3() {
		var a = 160;
		var b = 120;

		var l = [];

		var anime = new lime.animation.FadeTo(0).setDuration(2);

		for (var i = 0; i < 5; i++) {
			var r = 200 + Math.random() * 600;
			var rr = (1 - x[i] / 100) * a / b;
			l[i] = new lime.Circle().setFill(color5).setOpacity(.1);
			x[i] < -600 ? x[i] = r : x[i] -= 10;
			layer[i].appendChild(l[i].setPosition(0, -x[i]).setSize(rr, rr * 20));
			anime.addTarget(l[i]);
		}
		goog.events.listen(anime, 'stop', function() {
			for (var i = 0; i < 5; i++) layer[i].removeChild(l[i]);
		});
		anime.play();
	}

	setInterval(function() {step1(a, b);}, 170);
	setInterval(step2, 20);
	setInterval(step3, 30);

	scene.appendChild(new lime.Sprite().setSize(960, 1500).setFill(0, 0, 0).setOpacity(.1));

	director.replaceScene(scene);
};

goog.exportSymbol('loverose.start', loverose.start);
