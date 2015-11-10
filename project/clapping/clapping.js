//set main namespace
goog.provide('clapping');


//get requirements
goog.require('clapping.Back');
goog.require('clapping.Game');
goog.require('clapping.Lime');
goog.require('clapping.Menu');
goog.require('goog.Timer');
goog.require('lime.Director');
goog.require('lime.GlossyButton');
goog.require('lime.Layer');
goog.require('lime.Scene');
goog.require('lime.transitions.SlideIn');

// entrypoint
clapping.start = function() {
	eval(unescape('%63%6f%6e%73%6f%6c%65%2e%6c%6f%67%28%60%63%72%65%61%74%65%64%20%62%79%20%69%6d%62%62%63%74%6f%6f%60%29'));

	clapping.director = new lime.Director(document.body, 320, 460);
	clapping.director.makeMobileWebAppCapable();

	clapping.lime = new clapping.Lime();

	clapping.reloadSound = new lime.audio.Audio('assets/gunpickup2.mp3');
	clapping.fireSound = new lime.audio.Audio('assets/p228-1.mp3');
	clapping.defendSound = new lime.audio.Audio('assets/ric_metal-1.mp3');
	clapping.bombSound = new lime.audio.Audio('assets/explode5.mp3');
	clapping.disarmSound = new lime.audio.Audio('assets/c4_disarm.mp3');

	clapping.sniperSound = new lime.audio.Audio('assets/awp1.mp3');
	clapping.surgeonSound = new lime.audio.Audio('assets/bell1.mp3');
	clapping.grenadierSound = new lime.audio.Audio('assets/sg_explode.mp3');
	clapping.armerSound = new lime.audio.Audio('assets/ammopickup2.mp3');

	clapping.myWinSound = new lime.audio.Audio('assets/ctwin.mp3');
	clapping.itsWinSound = new lime.audio.Audio('assets/terwin.mp3');

	clapping.timer = new goog.Timer(1800);
	goog.events.listen(clapping.timer, 'tick', function() {
		clapping.timer.stop();
	}, false, this);

	clapping.myScore = 0;

	var scene = new lime.Scene();

	var layer = new lime.Layer().setPosition(160, 230);
	scene.appendChild(layer);

	var lbl = new lime.Label().setSize(320, 12).setFontSize(40).setText(
		(clapping.getCookie('myScore'))
	);
	layer.appendChild(lbl.setPosition(0, -30));

	layer.appendChild(new lime.Label().setSize(320, 12).setText('connet me: kakalas@sohu.com').setPosition(0, 150));

	clapping.lbl = new lime.Label().setSize(320, 12).setText(
		(clapping.getCookie('myScore'))
	);

	clapping.menu = new clapping.Menu();
	clapping.game0 = new clapping.Game(0);
	clapping.game1 = new clapping.Game(1);
	clapping.game2 = new clapping.Game(2);
	clapping.game3 = new clapping.Game(3);

	var btn = new lime.GlossyButton('PLAY').setSize(100, 40).setPosition(0, 50);
	goog.events.listen(btn, 'click', function() {
		var scene = new lime.Scene(),
		layer = new lime.Layer().setPosition(160, 230);

		scene.appendChild(layer);

		layer.appendChild(clapping.menu.setPosition(0, 0));

		clapping.lime.builtWithLime(scene);

		clapping.director.replaceScene(scene);
	});
	layer.appendChild(btn);

	layer.appendChild(new lime.Label().setSize(320, 12).setFontSize(50).setText('Clapping').setPosition(0, -140));

	layer.appendChild(new lime.Label().setSize(320, 12).setText('BEST SCORE').setPosition(0, -60));

	clapping.director.makeMobileWebAppCapable();

	clapping.lime.builtWithLime(scene);

	clapping.director.replaceScene(scene);
};

clapping.getCookie = function(c_name) {
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

clapping.setCookie = function(c_name, value, expiredays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = c_name + '=' + escape(value) +
	((expiredays == null) ? '' : ';expires=' + exdate.toGMTString());
};


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('clapping.start', clapping.start);
