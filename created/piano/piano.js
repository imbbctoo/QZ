goog.provide('piano');

goog.require('lime.Director');
goog.require('lime.Label');
goog.require('lime.Layer');
goog.require('lime.Scene');
goog.require('lime.Sprite');
goog.require('lime.animation.Delay');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.Sequence');
goog.require('lime.audio.Audio');

piano.start = function() {
	console.log('created by imbbctoo');

	var director = new lime.Director(document.body, window.innerWidth, window.innerHeight);
	var w = director.getSize().width;
	var h = director.getSize().height;

	var a = w > h / 500 * 900 ? h / 500 * 900 : w;

	if (director.getPosition().y > 0) location.reload();

	var scene = new lime.Scene();
	var layer = new lime.Layer();
	var sprite = new lime.Sprite().setSize(a, a / 900 * 500).setFill('assets/piano.png');

	scene.appendChild(layer.setPosition(w / 2, h / 2));

	layer.appendChild(sprite);

	var l = new lime.Layer();

	var input = document.createElement('input');
	l.appendChild(input);

	l.appendChild(new lime.Sprite().setFill(255, 255, 255).setSize(w, h).setPosition(-w / 4, -h / 4));

	layer.appendChild(l.setPosition(-w / 2, -h / 2));

	var mask = new lime.Sprite().setSize(w + 2, h + 2).setFill(255, 255, 255).appendChild(new lime.Label().setText('LOADING>>>'));
	layer.appendChild(mask);

	mask.runAction(new lime.animation.Sequence(
		new lime.animation.Delay().setDuration(6),
		new lime.animation.FadeTo(0)
	));

	var num = 15;

	var d1 = [];
	var d2 = [];
	var d3 = [];
	var d4 = [];
	var d5 = [];
	var d6 = [];
	var d7 = [];
	var d8 = [];
	var p_1 = [];
	var p0 = [];
	var p1 = [];
	var p2 = [];
	var p3 = [];
	var p4 = [];
	var p5 = [];
	var p6 = [];
	var p7 = [];
	var p8 = [];

	var d1_n = 0;
	var d2_n = 0;
	var d3_n = 0;
	var d4_n = 0;
	var d5_n = 0;
	var d6_n = 0;
	var d7_n = 0;
	var d8_n = 0;
	var p_1_n = 0;
	var p0_n = 0;
	var p1_n = 0;
	var p2_n = 0;
	var p3_n = 0;
	var p4_n = 0;
	var p5_n = 0;
	var p6_n = 0;
	var p7_n = 0;
	var p8_n = 0;

	for (var i = 0; i < num; i++) {
		d1[i] = new lime.audio.Audio('assets/d1.mp3');
		d2[i] = new lime.audio.Audio('assets/d2.mp3');
		d3[i] = new lime.audio.Audio('assets/d3.mp3');
		d4[i] = new lime.audio.Audio('assets/d4.mp3');
		d5[i] = new lime.audio.Audio('assets/d5.mp3');
		d6[i] = new lime.audio.Audio('assets/d6.mp3');
		d7[i] = new lime.audio.Audio('assets/d7.mp3');
		d8[i] = new lime.audio.Audio('assets/d8.mp3');
		p_1[i] = new lime.audio.Audio('assets/p_1.mp3');
		p0[i] = new lime.audio.Audio('assets/p0.mp3');
		p1[i] = new lime.audio.Audio('assets/p1.mp3');
		p2[i] = new lime.audio.Audio('assets/p2.mp3');
		p3[i] = new lime.audio.Audio('assets/p3.mp3');
		p4[i] = new lime.audio.Audio('assets/p4.mp3');
		p5[i] = new lime.audio.Audio('assets/p5.mp3');
		p6[i] = new lime.audio.Audio('assets/p6.mp3');
		p7[i] = new lime.audio.Audio('assets/p7.mp3');
		p8[i] = new lime.audio.Audio('assets/p8.mp3');
	}

	var n1 = [65, 83, 68, 70, 71, 72, 74, 75, 76, 186];
	var n2 = [81, 87, 82, 84, 85, 73, 79, 219];

	goog.events.listen(sprite, ['mousedown', 'touchstart'], function() {input.focus();});

	goog.events.listen(sprite, 'keyup', function() {
		if (event.which == n1[0]) {
			p_1_n++;
			if (p_1_n > num - 1) p_1_n = 0;
		}
		if (event.which == n1[1]) {
			p0_n++;
			if (p0_n > num - 1) p0_n = 0;
		}
		if (event.which == n1[2]) {
			p1_n++;
			if (p1_n > num - 1) p1_n = 0;
		}
		if (event.which == n1[3]) {
			p2_n++;
			if (p2_n > num - 1) p2_n = 0;
		}
		if (event.which == n1[4]) {
			p3_n++;
			if (p3_n > num - 1) p3_n = 0;
		}
		if (event.which == n1[5]) {
			p4_n++;
			if (p4_n > num - 1) p4_n = 0;
		}
		if (event.which == n1[6]) {
			p5_n++;
			if (p5_n > num - 1) p5_n = 0;
		}
		if (event.which == n1[7]) {
			p6_n++;
			if (p6_n > num - 1) p6_n = 0;
		}
		if (event.which == n1[8]) {
			p7_n++;
			if (p7_n > num - 1) p7_n = 0;
		}
		if (event.which == n1[9]) {
			p8_n++;
			if (p8_n > num - 1) p8_n = 0;
		}
		/**/
		if (event.which == n2[0]) {
			d1_n++;
			if (d1_n > num - 1) d1_n = 0;
		}
		if (event.which == n2[1]) {
			d2_n++;
			if (d2_n > num - 1) d2_n = 0;
		}
		if (event.which == n2[2]) {
			d3_n++;
			if (d3_n > num - 1) d3_n = 0;
		}
		if (event.which == n2[3]) {
			d4_n++;
			if (d4_n > num - 1) d4_n = 0;
		}
		if (event.which == n2[4]) {
			d5_n++;
			if (d5_n > num - 1) d5_n = 0;
		}
		if (event.which == n2[5]) {
			d6_n++;
			if (d6_n > num - 1) d6_n = 0;
		}
		if (event.which == n2[6]) {
			d7_n++;
			if (d7_n > num - 1) d7_n = 0;
		}
		if (event.which == n2[7]) {
			d8_n++;
			if (d8_n > num - 1) d8_n = 0;
		}
	});

	goog.events.listen(sprite, 'keydown', function() {
		console.log('keycode: ' + event.which);
		if (event.which == n1[0]) {
			p_1[p_1_n].stop();
			p_1[p_1_n].play();
		}
		if (event.which == n1[1]) {
			p0[p0_n].stop();
			p0[p0_n].play();
		}
		if (event.which == n1[2]) {
			p1[p1_n].stop();
			p1[p1_n].play();
		}
		if (event.which == n1[3]) {
			p2[p2_n].stop();
			p2[p2_n].play();
		}
		if (event.which == n1[4]) {
			p3[p3_n].stop();
			p3[p3_n].play();
		}
		if (event.which == n1[5]) {
			p4[p4_n].stop();
			p4[p4_n].play();
		}
		if (event.which == n1[6]) {
			p5[p5_n].stop();
			p5[p5_n].play();
		}
		if (event.which == n1[7]) {
			p6[p6_n].stop();
			p6[p6_n].play();
		}
		if (event.which == n1[8]) {
			p7[p7_n].stop();
			p7[p7_n].play();
		}
		if (event.which == n1[9]) {
			p8[p8_n].stop();
			p8[p8_n].play();
		}
		/**/
		if (event.which == n2[0]) {
			d1[d1_n].stop();
			d1[d1_n].play();
		}
		if (event.which == n2[1]) {
			d2[d2_n].stop();
			d2[d2_n].play();
		}
		if (event.which == n2[2]) {
			d3[d3_n].stop();
			d3[d3_n].play();
		}
		if (event.which == n2[3]) {
			d4[d4_n].stop();
			d4[d4_n].play();
		}
		if (event.which == n2[4]) {
			d5[d5_n].stop();
			d5[d5_n].play();
		}
		if (event.which == n2[5]) {
			d6[d6_n].stop();
			d6[d6_n].play();
		}
		if (event.which == n2[6]) {
			d7[d7_n].stop();
			d7[d7_n].play();
		}
		if (event.which == n2[7]) {
			d8[d8_n].stop();
			d8[d8_n].play();
		}
	});

	director.replaceScene(scene);

};

goog.exportSymbol('piano.start', piano.start);
