goog.provide('drumset');

goog.require('lime.Director');
goog.require('lime.Label');
goog.require('lime.Layer');
goog.require('lime.Scene');
goog.require('lime.Sprite');
goog.require('lime.animation.Delay');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.Sequence');
goog.require('lime.audio.Audio');

drumset.start = function() {
	eval(unescape('%63%6f%6e%73%6f%6c%65%2e%6c%6f%67%28%60%63%72%65%61%74%65%64%20%62%79%20%69%6d%62%62%63%74%6f%6f%60%29'));

	var director = new lime.Director(document.body, 500, 500);
	var scene = new lime.Scene();
	var layer = new lime.Layer();
	var sprite = new lime.Sprite().setSize(500, 500).setFill('assets/drumset.png');

	scene.appendChild(layer.setPosition(250, 250));
	layer.appendChild(sprite);

	var num = 30;

	var jg = [];
	var bc = [];
	var ldt = [];
	var dc = [];
	var cc = [];
	var ddc = [];
	var t1 = [];
	var t2 = [];
	var t3 = [];
	var kc = [];
	var gb = [];

	var jg_n = 0;
	var bc_n = 0;
	var ldt_n = 0;
	var dc_n = 0;
	var cc_n = 0;
	var ddc_n = 0;
	var t1_n = 0;
	var t2_n = 0;
	var t3_n = 0;
	var kc_n = 0;
	var gb_n = 0;

	for (var i = 0; i < num; i++) {
		jg[i] = new lime.audio.Audio('assets/jg.mp3');
		bc[i] = new lime.audio.Audio('assets/bc.mp3');
		ldt[i] = new lime.audio.Audio('assets/ldt.mp3');
		dc[i] = new lime.audio.Audio('assets/dc.mp3');
		ddc[i] = new lime.audio.Audio('assets/ddc.mp3');
		t1[i] = new lime.audio.Audio('assets/t1.mp3');
		t2[i] = new lime.audio.Audio('assets/t2.mp3');
		t3[i] = new lime.audio.Audio('assets/t3.mp3');
		kc[i] = new lime.audio.Audio('assets/kc.mp3');
		gb[i] = new lime.audio.Audio('assets/gb.mp3');
	}

	var mask = new lime.Sprite().setSize(502, 502).setFill(255, 255, 255).appendChild(new lime.Label().setText('LOADING>>>'));
	layer.appendChild(mask);

	mask.runAction(new lime.animation.Sequence(
		new lime.animation.Delay().setDuration(4),
		new lime.animation.FadeTo(0)
	));

	goog.events.listen(sprite, 'keyup', function() {
		if (event.which == 83 || event.which == 74) {
			jg_n++;
			if (jg_n > num - 1) jg_n = 0;
		}
		if (event.which == 65 || event.which == 72) {
			if (event.shiftKey) {
				kc_n++;
				if (kc_n > num - 1) kc_n = 0;
			} else {
				bc_n++;
				if (bc_n > num - 1) bc_n = 0;
			}
			bc_n++;
			if (bc_n > num - 1) bc_n = 0;
		}
		if (event.which == 32) {
			ldt_n++;
			if (ldt_n > num - 1) ldt_n = 0;
		}
		if (event.which == 87 || event.which == 85) {
			dc_n++;
			if (dc_n > num - 1) dc_n = 0;
		}
		if (event.which == 16) {
			kc_n++;
			if (kc_n > num - 1) kc_n = 0;
		}
		if (event.which == 82 || event.which == 79) {
			ddc_n++;
			if (ddc_n > num - 1) ddc_n = 0;
		}
		if (event.which == 69 || event.which == 73) {
			t1_n++;
			if (t1_n > num - 1) t1_n = 0;
		}
		if (event.which == 68 || event.which == 75) {
			t2_n++;
			if (t2_n > num - 1) t2_n = 0;
		}
		if (event.which == 70 || event.which == 76) {
			t3_n++;
			if (t3_n > num - 1) t3_n = 0;
		}
		if (event.which == 88) {
			gb_n++;
			if (gb_n > num - 1) gb_n = 0;
		}
	});

	goog.events.listen(sprite, 'keydown', function() {
		console.log('keycode: ' + event.which);
		if (event.which == 83 || event.which == 74) {
			jg[jg_n].stop();
			jg[jg_n].play();
		}
		if (event.which == 65 || event.which == 72) {
			if (event.shiftKey) {
				kc[kc_n].stop();
				kc[kc_n].play();
			} else {
				bc[bc_n].stop();
				bc[bc_n].play();
			}
			bc[bc_n].stop();
			bc[bc_n].play();
		}
		if (event.which == 32) {
			ldt[ldt_n].stop();
			ldt[ldt_n].play();
		}
		if (event.which == 87 || event.which == 85) {
			dc[dc_n].stop();
			dc[dc_n].play();
		}
		if (event.which == 16) {
			if (event.shiftKey) kc[kc_n == 0 ? 0 : --kc_n].stop();
		}
		if (event.which == 82 || event.which == 79) {
			ddc[ddc_n].stop();
			ddc[ddc_n].play();
		}
		if (event.which == 69 || event.which == 73) {
			t1[t1_n].stop();
			t1[t1_n].play();
		}
		if (event.which == 68 || event.which == 75) {
			t2[t2_n].stop();
			t2[t2_n].play();
		}
		if (event.which == 70 || event.which == 76) {
			t3[t3_n].stop();
			t3[t3_n].play();
		}
		if (event.which == 88) {
			gb[gb_n].stop();
			gb[gb_n].play();
		}
	});

	director.replaceScene(scene);

};

goog.exportSymbol('drumset.start', drumset.start);
