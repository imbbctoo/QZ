//set main namespace
goog.provide('numrubik');


//get requirements
goog.require('lime.Director');
goog.require('lime.GlossyButton');
goog.require('lime.Layer');
goog.require('lime.Scene');
goog.require('lime.transitions.SlideIn');
goog.require('numrubik.Back');
goog.require('numrubik.Game33');
goog.require('numrubik.Game44');
goog.require('numrubik.Lime');
goog.require('numrubik.Menu');
goog.require('numrubik.Table');


// entrypoint
numrubik.start = function() {
	console.log('created by imbbctoo');

	numrubik.director = new lime.Director(document.body, 320, 460);
	numrubik.director.makeMobileWebAppCapable();

	numrubik.lime = new numrubik.Lime();

	var scene = new lime.Scene();

	var layer = new lime.Layer().setPosition(160, 230);
	scene.appendChild(layer);

	var lbl1 = new lime.Label().setSize(320, 12).setFontSize(10).setText(
		(numrubik.getCookie('bt33'))
	);

	var lbl2 = new lime.Label().setSize(320, 12).setFontSize(10).setText(
		(numrubik.getCookie('bt44'))
	);

	var lbl3 = new lime.Label().setSize(320, 12).setFontSize(10).setText(
		(numrubik.getCookie('bm33'))
	);

	var lbl4 = new lime.Label().setSize(320, 12).setFontSize(10).setText(
		(numrubik.getCookie('bm44'))
	);

	layer.appendChild(lbl1.setPosition(10, 0));
	layer.appendChild(lbl2.setPosition(100, 0));
	layer.appendChild(lbl3.setPosition(10, 40));
	layer.appendChild(lbl4.setPosition(100, 40));

	layer.appendChild(new lime.Label().setSize(320, 12).setText('connet me: kakalas@sohu.com').setPosition(0, 150));

	numrubik.lbl1 = new lime.Label().setSize(320, 12).setText(
		(numrubik.getCookie('bt33'))
	);

	numrubik.lbl2 = new lime.Label().setSize(320, 12).setText(
		(numrubik.getCookie('bt44'))
	);

	numrubik.lbl3 = new lime.Label().setSize(320, 12).setText(
		(numrubik.getCookie('bm33'))
	);

	numrubik.lbl4 = new lime.Label().setSize(320, 12).setText(
		(numrubik.getCookie('bm44'))
	);

	numrubik.menu = new numrubik.Menu();
	numrubik.game33 = new numrubik.Game33();
	numrubik.game44 = new numrubik.Game44();

	var btn = new lime.GlossyButton('PLAY').setSize(100, 40).setPosition(0, 110);
	goog.events.listen(btn, 'click', function() {
		var scene = new lime.Scene(),
		layer = new lime.Layer().setPosition(160, 230);

		scene.appendChild(layer);

		layer.appendChild(numrubik.menu.setPosition(0, 0));

		numrubik.lime.builtWithLime(scene);

		numrubik.director.replaceScene(scene, lime.transitions.SlideIn);
	});
	layer.appendChild(btn);

	layer.appendChild(new lime.Label().setSize(320, 12).setFontSize(50).setText('Numrubik').setPosition(0, -140));

	layer.appendChild(new numrubik.Table());

	numrubik.director.makeMobileWebAppCapable();

	numrubik.lime.builtWithLime(scene);

	numrubik.director.replaceScene(scene, lime.transitions.SlideIn);
};

numrubik.getCookie = function(c_name) {
	if (document.cookie.length > 0) {
		c_start = document.cookie.indexOf(c_name + '=');
		if (c_start != -1) {
			c_start = c_start + c_name.length + 1;
			c_end = document.cookie.indexOf(';', c_start);
			if (c_end == -1) c_end = document.cookie.length;
			return unescape(document.cookie.substring(c_start, c_end));
		}
	}
	return '';
};

numrubik.setCookie = function(c_name, value, expiredays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = c_name + '=' + escape(value) +
	((expiredays == null) ? '' : ';expires=' + exdate.toGMTString());
};


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('numrubik.start', numrubik.start);
