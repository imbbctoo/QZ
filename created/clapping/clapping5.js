goog.provide('clapping.Back');

goog.require('lime.GlossyButton');
goog.require('lime.Layer');
goog.require('lime.Scene');

clapping.Back = function() {
	lime.Layer.call(this);

	this.btn = new lime.GlossyButton('BACK').setSize(80, 40);
	this.appendChild(this.btn);

	goog.events.listen(this.btn, 'click', function() {
		var scene = new lime.Scene(),
		layer = new lime.Layer().setPosition(clapping.director.getSize().width / 2, clapping.director.getSize().height / 2);

		scene.appendChild(layer);

		layer.appendChild(clapping.menu.setPosition(0, 0));

		if (!clapping.timer.enabled) {
			clapping.lime.builtWithLime(scene);
			clapping.director.replaceScene(scene);
		}

		clapping.lbl.setText(clapping.getCookie('myScore'));
	}, false, this);
};
goog.inherits(clapping.Back, lime.Layer);
