goog.provide('blackbox.Box');

goog.require('lime.Sprite');

blackbox.Box = function() {
	lime.Sprite.call(this);

	this.setSize(120, 140).setFill(255, 255, 255);

	this.back = new lime.Sprite().setSize(111, 131).setFill(0, 150, 255);
	this.appendChild(this.back);
};
goog.inherits(blackbox.Box, lime.Sprite);
