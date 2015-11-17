goog.provide('blackbox.Move');

goog.require('lime.Layer');
goog.require('lime.animation.RotateBy');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.Sequence');

blackbox.Move = function(a) {
	lime.Layer.call(this);

	this.move = new lime.animation.Sequence(
					new lime.animation.ScaleTo(.9).setDuration(.1),
					new lime.animation.RotateBy(a).setDuration(.1),
					new lime.animation.ScaleTo(1).setDuration(.1)
				);
};
goog.inherits(blackbox.Move, lime.Layer);
