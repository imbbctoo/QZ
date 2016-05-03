goog.provide('citybloxx.Flat');

goog.require('lime.Layer');
goog.require('lime.Sprite');

citybloxx.Flat = function(w, h, c) {
	lime.Sprite.call(this);

	this.setSize(w, h).setFill(c);
};
goog.inherits(citybloxx.Flat, lime.Sprite);
