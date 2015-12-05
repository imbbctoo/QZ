goog.provide('numrubik.Menu');

goog.require('lime.GlossyButton');
goog.require('lime.Layer');
goog.require('lime.Scene');
goog.require('numrubik.Table');

numrubik.Menu = function() {
	lime.Layer.call(this);

	this.btn33 = new lime.GlossyButton('3*3').setSize(100, 40).setPosition(0, -70);
	this.appendChild(this.btn33);
	this.btn44 = new lime.GlossyButton('4*4').setSize(100, 40).setPosition(0, 20);
	this.appendChild(this.btn44);

	goog.events.listen(this.btn33, 'click', function() {
		var scene = new lime.Scene(),
		layer = new lime.Layer().setPosition(numrubik.director.getSize().width / 2, numrubik.director.getSize().height / 2);

		scene.appendChild(layer);

		layer.appendChild(numrubik.game33.setPosition(0, 0));

		numrubik.lime.builtWithLime(scene);

		numrubik.director.replaceScene(scene, lime.transitions.SlideIn);
	});

	goog.events.listen(this.btn44, 'click', function() {
		var scene = new lime.Scene(),
		layer = new lime.Layer().setPosition(numrubik.director.getSize().width / 2, numrubik.director.getSize().height / 2);

		scene.appendChild(layer);

		layer.appendChild(numrubik.game44.setPosition(0, 0));

		numrubik.lime.builtWithLime(scene);

		numrubik.director.replaceScene(scene, lime.transitions.SlideIn);
	});

	this.appendChild(new lime.Label().setSize(320, 12).setFontSize(25).setText('Choose mode').setPosition(0, -160));

	this.appendChild(new numrubik.Table().setPosition(0, 130));

	this.appendChild(numrubik.lbl1.setPosition(10, 130).setFontSize(10));
	this.appendChild(numrubik.lbl2.setPosition(100, 130).setFontSize(10));
	this.appendChild(numrubik.lbl3.setPosition(10, 170).setFontSize(10));
	this.appendChild(numrubik.lbl4.setPosition(100, 170).setFontSize(10));
};
goog.inherits(numrubik.Menu, lime.Layer);
