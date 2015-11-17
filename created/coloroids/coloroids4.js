goog.provide('coloroids.Enemy');

goog.require('lime.Sprite');
goog.require('lime.animation.Loop');
goog.require('lime.animation.RotateBy');

coloroids.Enemy = function() {
	lime.Sprite.call(this);

	this.r = 20;
	this.setSize(this.r * 2, this.r * 2).setFill('assets/ys.png');

	var keepturning = new lime.animation.Loop(new lime.animation.RotateBy(360).setEasing(lime.animation.Easing.LINEAR));
	this.runAction(keepturning);

};
goog.inherits(coloroids.Enemy, lime.Sprite);
