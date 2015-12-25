goog.provide('dung2048');

goog.require('dung2048.Game');
goog.require('imbbctoo.Lime');
goog.require('lime.Director');
goog.require('lime.Label');
goog.require('lime.Layer');
goog.require('lime.Scene');
goog.require('lime.Sprite');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.Loop');
goog.require('lime.animation.Sequence');
goog.require('lime.transitions.Dissolve');

dung2048.start = function() {
	console.log('created by imbbctoo');

	dung2048.h = new Image();
	dung2048.h.src = 'assets/h.png';
	dung2048.w = new Image();
	dung2048.w.src = 'assets/w.png';
	dung2048.s = new Image();
	dung2048.s.src = 'assets/s.png';
	dung2048.c = new Image();
	dung2048.c.src = 'assets/c.png';
	dung2048.d = new Image();
	dung2048.d.src = 'assets/d.png';
	dung2048.btn = new Image();
	dung2048.btn.src = 'assets/shuffle.png';

	var w = 320;
	var h = window.innerHeight / window.innerWidth * w;
	h = h < 460 ? 460 : h;

	dung2048.director = new lime.Director(document.body, w, h);

	if (dung2048.director.getPosition().y > 0) location.reload();

	dung2048.lime = new imbbctoo.Lime(dung2048.director.getSize().width / 2, dung2048.director.getSize().height - 40);

	var scene = new lime.Scene();

	var layer = new lime.Layer().setPosition(dung2048.director.getSize().width / 2, dung2048.director.getSize().height / 2);
	scene.appendChild(layer);

	layer.appendChild(new lime.Label().setSize(320, 12).setFontSize(50).setText('Dung2048').setPosition(0, -140));

	layer.appendChild(new lime.Label().setSize(320, 12).setText('BEST SCORE').setPosition(0, -60));

	var lbl = new lime.Label().setSize(320, 12).setFontSize(40).setText(
		(dung2048.getCookie('myScore'))
	);
	layer.appendChild(lbl.setPosition(0, -30));

	layer.appendChild(new lime.Label().setSize(320, 12).setText('connet me: kakalas@sohu.com').setPosition(0, 150));

	var tap = new lime.Layer();
	layer.appendChild(tap);

	var tapHere = new lime.Label().setSize(320, 12).setText('Tap to start').setFontSize(20);
	var shelter = new lime.Sprite().setSize(dung2048.director.getSize().width, dung2048.director.getSize().height).setFill(255, 255, 255).setOpacity(.1);
	tap.appendChild(tapHere.setPosition(0, 50));
	tap.appendChild(shelter);

	var action1 = new lime.animation.Loop(
		new lime.animation.Sequence(
			new lime.animation.FadeTo(.1).setDuration(.5),
			new lime.animation.FadeTo(1).setDuration(.5)
		)
	);

	tap.runAction(action1);

	dung2048.game = new dung2048.Game();

	goog.events.listen(tap, ['mousedown', 'touchstart'], function() {});
	goog.events.listenOnce(tap, ['mousedown', 'touchstart'], function() {
		var scene = new lime.Scene(),
		layer = new lime.Layer().setPosition(dung2048.director.getSize().width / 2, dung2048.director.getSize().height / 2);

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
			layer.appendChild(dung2048.game);
			dung2048.director.replaceScene(scene, lime.transitions.Dissolve);
		});
	});

	dung2048.myScore = 0;

	dung2048.lime.builtWithLime(scene);

	dung2048.director.replaceScene(scene);
};

dung2048.getCookie = function(c_name) {
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

dung2048.setCookie = function(c_name, value, expiredays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = c_name + '=' + escape(value) +
	((expiredays == null) ? '' : ';expires=' + exdate.toGMTString());
};

goog.exportSymbol('dung2048.start', dung2048.start);
