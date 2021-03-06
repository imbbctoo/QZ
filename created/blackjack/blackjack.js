goog.provide('blackjack');

goog.require('blackjack.Game');
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

blackjack.start = function() {
	console.log('created by imbbctoo');

	blackjack.bgMusic = document.createElement('audio');
	blackjack.bgMusic.src = 'assets/baccano.mp3';
	blackjack.bgMusic.loop = 'loop';
	blackjack.bgMusic.autoplay = 'autoplay';
	blackjack.bgMusic.pause();

	var head = document.getElementsByTagName('head')[0];

	var style = document.createElement('style');
	style.type = 'text/css';

	var css = 'body{background:black;z-index:-1;}';

	style.appendChild(document.createTextNode(css));

	head.appendChild(style);

	var w = 320;
	var h = window.innerHeight / window.innerWidth * w;
	h = h < 460 ? 460 : h;

	blackjack.director = new lime.Director(document.body, w, h);

	blackjack.lime = new imbbctoo.Lime(w / 2, h - 40);

	var scene = new lime.Scene();

	var layer = new lime.Layer().setPosition(w / 2, h / 2);
	scene.appendChild(layer);

	layer.appendChild(new lime.Sprite().setSize(w, h).setFill(0, 0, 0));

	var w0 = 430;
	var h0 = 550;
	var r = 9 / 10;
	var table = new lime.Layer();
	layer.appendChild(table.setPosition(0, -30));
	table.appendChild(new lime.Circle().setFill(136, 0, 21).setSize(w0, h0).setPosition(0, 15));
	table.appendChild(new lime.Circle().setFill(185, 122, 87).setSize(w0, h0));
	table.appendChild(new lime.Circle().setFill(136, 0, 21).setSize(w0 * r, h0 * r).setPosition(0, -12));
	table.appendChild(new lime.Circle().setFill(0, 0, 0).setSize(w0 * r + 2, h0 * r + 2));
	var back = new lime.fill.LinearGradient().addColorStop(0, '#2b4').addColorStop(1, '#183');
	table.appendChild(new lime.Circle().setFill(back).setSize(w0 * r, h0 * r));
	layer.appendChild(new lime.Sprite().setSize(w, h).setFill(255, 255, 255).setOpacity(.7));

	layer.appendChild(new lime.Label().setSize(320, 12).setFontSize(50).setText('Black Jack').setPosition(0, -140));

	layer.appendChild(new lime.Label().setSize(320, 12).setText('BEST SCORE').setPosition(0, -60));

	layer.appendChild(new lime.Label().setSize(320, 12).setFontSize(40).setText(blackjack.getCookie('cache')).setPosition(0, -30));

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

	blackjack.game = new blackjack.Game();

	goog.events.listen(tap, ['mousedown', 'touchstart'], function() {});
	goog.events.listenOnce(tap, ['mousedown', 'touchstart'], function() {
		blackjack.bgMusic.play();

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
			layer.appendChild(blackjack.game);
			blackjack.director.replaceScene(scene, lime.transitions.Dissolve);
		});
	});

	blackjack.myScore = 0;

	blackjack.lime.builtWithLime(scene);

	blackjack.director.replaceScene(scene);

};

blackjack.getCookie = function(c_name) {
	if (document.cookie.length > 0) {
		c_start = document.cookie.indexOf(c_name + '=');
		if (c_start != -1) {
			c_start = c_start + c_name.length + 1;
			c_end = document.cookie.indexOf(';', c_start);
			if (c_end == -1) c_end = document.cookie.length;
			return unescape(document.cookie.substring(c_start, c_end));
		}
	}
	return 200;
};

blackjack.setCookie = function(c_name, value, expiredays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = c_name + '=' + escape(value) +
	((expiredays == null) ? '' : ';expires=' + exdate.toGMTString());
};

goog.exportSymbol('blackjack.start', blackjack.start);
