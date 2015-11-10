goog.provide('numrubik.Back');

goog.require('lime.GlossyButton');
goog.require('lime.Layer');
goog.require('lime.Scene');

numrubik.Back = function() {
	lime.Layer.call(this);

	this.btn = new lime.GlossyButton('BACK').setSize(80, 40);
	this.appendChild(this.btn);

	goog.events.listen(this.btn, 'click', function() {
		var scene = new lime.Scene(),
		layer = new lime.Layer().setPosition(160, 230);

		scene.appendChild(layer);

		layer.appendChild(numrubik.menu.setPosition(0, 0));

		numrubik.lime.builtWithLime(scene);

		numrubik.director.replaceScene(scene, lime.transitions.SlideIn);

		numrubik.lbl1.setText(numrubik.getCookie('bt33'));
		numrubik.lbl2.setText(numrubik.getCookie('bt44'));
		numrubik.lbl3.setText(numrubik.getCookie('bm33'));
		numrubik.lbl4.setText(numrubik.getCookie('bm44'));
	}, false, this);
};
goog.inherits(numrubik.Back, lime.Layer);
