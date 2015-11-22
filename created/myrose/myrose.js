goog.provide('myrose');

goog.require('lime.Director');
goog.require('lime.Label');
goog.require('lime.Layer');
goog.require('lime.Scene');
goog.require('lime.Sprite');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.Sequence');
goog.require('myrose.Function');

myrose.start = function() {
	console.log('created by imbbctoo');

	var sound = 0;

	var head = document.getElementsByTagName('head')[0];

	var style = document.createElement('style');
	style.type = 'text/css';

	var css = 'body{background:black;overflow:hidden;}';

	style.appendChild(document.createTextNode(css));

	head.appendChild(style);

	if (sound) {
		var music = document.createElement('audio');
		music.src = 'assets/myrose.mp3';
		music.loop = 'loop';
		music.autoplay = 'autoplay';
	}

	var director = new lime.Director(document.body, 320, 500);
	var scene = new lime.Scene();
	var layer = new lime.Layer();
	scene.appendChild(layer.setPosition(160, 250));

	director.makeMobileWebAppCapable();

	var color1 = '#f3a';
	var color2 = '#5a6';

	function step() {
		var coordinate = new myrose.Function();
		var r = parseInt(Math.random() * 21);
		var l1 = new lime.Label().setText(parseInt(Math.random() * 2)).setFontSize(1).setFontColor(r < 4 ? color2 : color1).setSize(320, 12);
		var x = coordinate.x[r];
		var y = coordinate.y[r];
		layer.appendChild(l1.setPosition(x, -y).setOpacity(0).setFontSize(Math.random() * 4 + 12));
		var anime = new lime.animation.Sequence(
			new lime.animation.FadeTo(1).setDuration(1),
			new lime.animation.FadeTo(0).setDuration(60)
		);
		anime.addTarget(l1);
		goog.events.listen(anime, 'stop', function() {
			layer.removeChild(l1);
		});
		anime.play();
	}

	lime.scheduleManager.schedule(step, this);

	scene.appendChild(new lime.Sprite().setSize(960, 1500).setFill(0, 0, 0).setOpacity(.1));

	director.replaceScene(scene);
};

goog.exportSymbol('myrose.start', myrose.start);
