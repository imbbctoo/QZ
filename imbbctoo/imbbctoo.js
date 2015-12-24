goog.provide('imbbctoo');

goog.require('goog.Timer');
goog.require('imbbctoo.Lime');
goog.require('lime.Director');
goog.require('lime.Label');
goog.require('lime.Layer');
goog.require('lime.RoundedRect');
goog.require('lime.Scene');
goog.require('lime.Sprite');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.MoveTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.Spawn');
goog.require('lime.fill.LinearGradient');

imbbctoo.start = function() {
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

	imbbctoo.director = new lime.Director(document.body, w, h);

	if (imbbctoo.director.getPosition().y > 0) location.reload();

	imbbctoo.director.makeMobileWebAppCapable();

	var scene = new lime.Scene();
	var layerx = new lime.Layer();
	var layer = [];

	scene.appendChild(new lime.Sprite().setSize(w, h).setFill(new lime.fill.LinearGradient().addColorStop(0, '#34c').addColorStop(1, '#0ae')).setPosition(w / 2, h / 2));
	scene.appendChild(new lime.Label().setText('WELCOME TO MY WORLD!').setFontColor('#fff').setFontSize(20).setPosition(w / 2, h / 460 * 20).setSize(320, 12));
	scene.appendChild(layerx.setPosition(parseInt(imbbctoo.getCookie('p')), 0));

	imbbctoo.x0 = 17.5;
	imbbctoo.y0 = h / 460 * 60;

	for (var i = 0; i < 3; i++) {
		layer[i] = new lime.Layer();
		layerx.appendChild(layer[i].setPosition(imbbctoo.x0 + i * w, imbbctoo.y0));
	}

	var name = [];
	var title = [];

	name[0] = ['coloroids', 'numrubik', 'blackbox', 'clapping', 'dung2048', 'blackjack'];
	name[1] = ['xmastree', 'mylove', 'myrose', 'loverose'];
	name[2] = ['drumset'];

	title[0] = 'web app games';
	title[1] = 'web effects';
	title[2] = 'web app games(PC only)';

	for (var i = 0; i < 3; i++) imbbctoo.manage(name[i], layer[i], title[i]);

	imbbctoo.lime = new imbbctoo.Lime(w / 2, h - 40);
	imbbctoo.lime.builtWithLime(scene);

	imbbctoo.director.replaceScene(scene);

	imbbctoo.ctr = new lime.Sprite().setSize(w * 4, h * 4).setFill(0, 0, 0).setOpacity(.1);
	scene.appendChild(imbbctoo.ctr.setPosition(w / 2, h / 2));

	//imbbctoo.ctr.appendChild(new lime.Sprite().setSize(20, 20).setFill(255, 255, 0));

	imbbctoo.p = parseInt(imbbctoo.getCookie('p'));

	goog.events.listen(imbbctoo.ctr, ['mousedown', 'touchstart'], function(e) {
		e.startDrag(false, new goog.math.Box(-h, w * 2, h * 2, -w));
		if (imbbctoo.move) imbbctoo.move.stop();
		var posx = layerx.getPosition();

		e.swallow(['mousemove', 'touchmove'], function() {
			var pos = this.getPosition();
			layerx.setPosition(pos.x - w / 2 + posx.x, 0);
		});

		e.swallow(['mouseup', 'touchend'], function() {
			var pos = this.getPosition();
			var len = layer.length;
			if (pos.x > w / 2 + 20) {
				for (var i = len; i >= -len; i--) {
					if (posx.x <= w * i + w / 2 && posx.x >= w * i - w / 2) {
						imbbctoo.p = w * (i + 1);
						var lim = 0;
						if (imbbctoo.p >= lim) imbbctoo.p = lim;
						break;
					}
				}
			} else if (pos.x < w / 2 - 20) {
				for (var i = -len; i <= len; i++) {
					if (posx.x <= w * i + w / 2 && posx.x >= w * i - w / 2) {
						imbbctoo.p = w * (i - 1);
						var lim = w * (1 - len);
						if (imbbctoo.p <= lim) imbbctoo.p = lim;
						break;
					}
				}
			}
			imbbctoo.move = new lime.animation.MoveTo(imbbctoo.p, 0);
			imbbctoo.setCookie('p', imbbctoo.p, 365);
			imbbctoo.move.setDuration(.2).setEasing(lime.animation.Easing.EASEOUT).addTarget(layerx).play();

			setTimeout(function() {imbbctoo.ctr.setPosition(w / 2, h / 2);}, 0);
		});
	});

	imbbctoo.show = new lime.Sprite().setFill(255, 255, 255);
	scene.appendChild(imbbctoo.show.setOpacity(0));

	var dur = .5;
	imbbctoo.scale = new lime.animation.Spawn(
		new lime.animation.MoveTo(w / 2, h / 2).setDuration(dur),
		new lime.animation.ScaleTo(10).setDuration(dur),
		new lime.animation.FadeTo(1).setDuration(dur)
	);

	imbbctoo.timer = new goog.Timer(dur * 1100);
	goog.events.listen(imbbctoo.timer, 'tick', function() {this.stop();});
};

imbbctoo.manage = function(name, layer, title) {
	var a = [];
	var d = 60;
	var icon = [];
	var label = new lime.Label().setText(title).setSize(320, 12).setFontColor('#fff').setPosition(142.5, -16);
	layer.appendChild(label);
	for (var i = 0, len = parseInt(name.length / 4) + 1; i < len; i++) {
		for (var j = 0; j < 4; j++) {
			var n = i * 4 + j;
			if (name[n]) {
				a[n] = document.createElement('a');
				a[n].href = 'compiled/' + name[n] + '_c/' + name[n] + '_c.html';
				var x = j * (d + 15);
				var y = i * (d + 30);
				icon[n] = new lime.RoundedRect().setSize(d, d).setFill('compiled/' + name[n] + '_c/assets/icon.png').setAnchorPoint(0, 0).setPosition(x, y).setRadius(12);
				layer.appendChild(icon[n].appendChild(a[n]));
				layer.appendChild(new lime.Label().setText(name[n]).setFontColor('#fff').setPosition(x + d / 2, y + d + 10));
			}
		}
	}
	if (name.length > 0) goog.events.listen(icon[0], ['mousedown', 'touchstart'], function(e) {imbbctoo.showup(icon[0], a[0], e, d)});
	if (name.length > 1) goog.events.listen(icon[1], ['mousedown', 'touchstart'], function(e) {imbbctoo.showup(icon[1], a[1], e, d)});
	if (name.length > 2) goog.events.listen(icon[2], ['mousedown', 'touchstart'], function(e) {imbbctoo.showup(icon[2], a[2], e, d)});
	if (name.length > 3) goog.events.listen(icon[3], ['mousedown', 'touchstart'], function(e) {imbbctoo.showup(icon[3], a[3], e, d)});
	if (name.length > 4) goog.events.listen(icon[4], ['mousedown', 'touchstart'], function(e) {imbbctoo.showup(icon[4], a[4], e, d)});
	if (name.length > 5) goog.events.listen(icon[5], ['mousedown', 'touchstart'], function(e) {imbbctoo.showup(icon[5], a[5], e, d)});
	if (name.length > 6) goog.events.listen(icon[6], ['mousedown', 'touchstart'], function(e) {imbbctoo.showup(icon[6], a[6], e, d)});
	if (name.length > 7) goog.events.listen(icon[7], ['mousedown', 'touchstart'], function(e) {imbbctoo.showup(icon[7], a[7], e, d)});
	if (name.length > 8) goog.events.listen(icon[8], ['mousedown', 'touchstart'], function(e) {imbbctoo.showup(icon[8], a[8], e, d)});
	if (name.length > 9) goog.events.listen(icon[9], ['mousedown', 'touchstart'], function(e) {imbbctoo.showup(icon[9], a[9], e, d)});
	if (name.length > 10) goog.events.listen(icon[10], ['mousedown', 'touchstart'], function(e) {imbbctoo.showup(icon[10], a[10], e, d)});
	if (name.length > 11) goog.events.listen(icon[11], ['mousedown', 'touchstart'], function(e) {imbbctoo.showup(icon[11], a[11], e, d)});
	if (name.length > 12) goog.events.listen(icon[12], ['mousedown', 'touchstart'], function(e) {imbbctoo.showup(icon[12], a[12], e, d)});
	if (name.length > 13) goog.events.listen(icon[13], ['mousedown', 'touchstart'], function(e) {imbbctoo.showup(icon[13], a[13], e, d)});
	if (name.length > 14) goog.events.listen(icon[14], ['mousedown', 'touchstart'], function(e) {imbbctoo.showup(icon[14], a[14], e, d)});
	if (name.length > 15) goog.events.listen(icon[15], ['mousedown', 'touchstart'], function(e) {imbbctoo.showup(icon[15], a[15], e, d)});
};

imbbctoo.showup = function(icon, a, e, d) {
	if (!imbbctoo.timer.enabled) {
		imbbctoo.timer.start();
		var pos = imbbctoo.ctr.getPosition();
		e.swallow(['mouseup', 'touchend'], function() {
			if (pos.x == imbbctoo.ctr.getPosition().x && pos.y == imbbctoo.ctr.getPosition().y) {
				var x = icon.getPosition().x + imbbctoo.x0 + d / 2;
				var y = icon.getPosition().y + imbbctoo.y0 + d / 2;
				imbbctoo.show.setPosition(x, y).setSize(imbbctoo.director.getSize().width / 10, imbbctoo.director.getSize().height / 10);
				imbbctoo.show.runAction(imbbctoo.scale);
				goog.events.listen(imbbctoo.scale, 'stop', function() {a.click();});
			}
		});
	}
};

imbbctoo.getCookie = function(c_name) {
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

imbbctoo.setCookie = function(c_name, value, expiredays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = c_name + '=' + escape(value) +
	((expiredays == null) ? '' : ';expires=' + exdate.toGMTString());
};

goog.exportSymbol('imbbctoo.start', imbbctoo.start);
