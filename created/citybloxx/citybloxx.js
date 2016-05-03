goog.provide('citybloxx');

goog.require('citybloxx.Game');
goog.require('imbbctoo.Lime');
goog.require('lime.Director');
goog.require('lime.Label');
goog.require('lime.Layer');
goog.require('lime.Scene');
goog.require('lime.Sprite');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.Loop');
goog.require('lime.animation.Sequence');
goog.require('lime.fill.LinearGradient');
goog.require('lime.transitions.Dissolve');

citybloxx.start = function() {
	console.log('created by imbbctoo');

	/*citybloxx.bgMusic = document.createElement('audio');
	citybloxx.bgMusic.src = 'assets/baccano.mp3';
	citybloxx.bgMusic.loop = 'loop';
	citybloxx.bgMusic.autoplay = 'autoplay';
	citybloxx.bgMusic.pause();*/

	var w = 320;
	var h = window.innerHeight / window.innerWidth * w;
	h = h < 460 ? 460 : h;

	citybloxx.director = new lime.Director(document.body, w, h);

	if (citybloxx.director.getPosition().y > 0) location.reload();

	citybloxx.lime = new imbbctoo.Lime(w / 2, h - 40);

	var scene = new lime.Scene();

	var layer = new lime.Layer().setPosition(w / 2, h / 2);
	scene.appendChild(layer);

	layer.appendChild(new lime.Sprite().setSize(w, h).setFill(255, 255, 255));

	layer.appendChild(new lime.Label().setSize(320, 12).setFontSize(50).setText('City Bloxx').setPosition(0, -140));

	layer.appendChild(new lime.Label().setSize(320, 12).setText('BEST SCORE').setPosition(0, -60));

	layer.appendChild(new lime.Label().setSize(320, 12).setFontSize(40).setText(citybloxx.getCookie('cache')).setPosition(0, -30));

	layer.appendChild(new lime.Label().setSize(320, 12).setText('connet me: kakalas@sohu.com').setPosition(0, 150));

	var tap = new lime.Sprite().setSize(w, h);
	layer.appendChild(tap);

	tap.appendChild(new lime.Label().setSize(320, 12).setText('Tap to start').setFontSize(20).setPosition(0, 50));

	layer.appendChild(new lime.Sprite().setSize(w, h).setFill(255, 255, 255).setOpacity(.1));

	var action1 = new lime.animation.Loop(
		new lime.animation.Sequence(
			new lime.animation.FadeTo(.1).setDuration(.5),
			new lime.animation.FadeTo(1).setDuration(.5)
		)
	);

	tap.runAction(action1);

	citybloxx.game = new citybloxx.Game();

	goog.events.listen(tap, ['mousedown', 'touchstart'], function() {});
	goog.events.listenOnce(tap, ['mousedown', 'touchstart'], function() {
		//citybloxx.bgMusic.play();

		var scene = new lime.Scene();

		var layer = new lime.Layer().setPosition(w / 2, h / 2);

		scene.appendChild(layer);

		var action2 = new lime.animation.Sequence(
			new lime.animation.FadeTo(.1).setDuration(.1),
			new lime.animation.FadeTo(1).setDuration(.1),
			new lime.animation.FadeTo(.1).setDuration(.1),
			new lime.animation.FadeTo(1).setDuration(.1),
			new lime.animation.FadeTo(.1).setDuration(.1),
			new lime.animation.FadeTo(1).setDuration(.1),
			new lime.animation.FadeTo(.1).setDuration(.1),
			new lime.animation.FadeTo(1).setDuration(.1),
			new lime.animation.FadeTo(0).setDuration(.1)
		);

		action1.stop();
		tap.runAction(action2);

		goog.events.listen(action2, 'stop', function() {
			layer.appendChild(citybloxx.game);
			citybloxx.director.replaceScene(scene, lime.transitions.Dissolve);
		});
	});

	citybloxx.myScore = 0;

	citybloxx.lime.builtWithLime(scene);

	citybloxx.director.replaceScene(scene);

};

citybloxx.getCookie = function(c_name) {
	if (document.cookie.length > 0) {
		c_start = document.cookie.indexOf(c_name + '=');
		if (c_start != -1) {
			c_start = c_start + c_name.length + 1;
			c_end = document.cookie.indexOf(';', c_start);
			if (c_end == -1) c_end = document.cookie.length;
			return unescape(document.cookie.substring(c_start, c_end));
		}
	}
	return 0;
};

citybloxx.setCookie = function(c_name, value, expiredays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = c_name + '=' + escape(value) +
	((expiredays == null) ? '' : ';expires=' + exdate.toGMTString());
};

goog.exportSymbol('citybloxx.start', citybloxx.start);
