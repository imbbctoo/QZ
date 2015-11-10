goog.provide('blackjack');

goog.require('blackjack.Game');
goog.require('blackjack.Lime');
goog.require('lime.Director');
goog.require('lime.Label');
goog.require('lime.Layer');
goog.require('lime.Scene');
goog.require('lime.Sprite');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.Loop');
goog.require('lime.animation.Sequence');
goog.require('lime.transitions.Dissolve');

blackjack.start = function() {
	eval(unescape('%63%6f%6e%73%6f%6c%65%2e%6c%6f%67%28%60%63%72%65%61%74%65%64%20%62%79%20%69%6d%62%62%63%74%6f%6f%60%29'));

	blackjack.director = new lime.Director(document.body, 320, 460);
	blackjack.director.makeMobileWebAppCapable();

	blackjack.lime = new blackjack.Lime();

	var scene = new lime.Scene();

	var layer = new lime.Layer().setPosition(160, 230);
	scene.appendChild(layer);

	layer.appendChild(new lime.Label().setSize(320, 12).setFontSize(50).setText('Black Jack').setPosition(0, -140));

	layer.appendChild(new lime.Label().setSize(320, 12).setText('BEST SCORE').setPosition(0, -60));

	var lbl = new lime.Label().setSize(320, 12).setFontSize(40).setText(
		(blackjack.getCookie('myScore'))
	);
	layer.appendChild(lbl.setPosition(0, -30));

	layer.appendChild(new lime.Label().setSize(320, 12).setText('connet me: kakalas@sohu.com').setPosition(0, 150));

	var tap = new lime.Layer();
	layer.appendChild(tap);

	var tapHere = new lime.Label().setSize(320, 12).setText('Tap to start').setFontSize(20);
	var shelter = new lime.Sprite().setSize(320, 460).setFill(255, 255, 255).setOpacity(.1);
	tap.appendChild(tapHere.setPosition(0, 50));
	tap.appendChild(shelter);

	var action1 = new lime.animation.Loop(
		new lime.animation.Sequence(
			new lime.animation.FadeTo(.1).setDuration(.5),
			new lime.animation.FadeTo(1).setDuration(.5)
		)
	);

	tap.runAction(action1);

	blackjack.game = new blackjack.Game();

	goog.events.listen(tap, ['mousedown', 'touchstart'], function() {
		var scene = new lime.Scene(),
		layer = new lime.Layer().setPosition(160, 230);

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

	blackjack.director.makeMobileWebAppCapable();

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
