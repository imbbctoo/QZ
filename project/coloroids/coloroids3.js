goog.provide('coloroids.Triangle');

goog.require('lime.Sprite');

coloroids.Triangle = function() {
	lime.Sprite.call(this);

	this.setFill('assets/fj.png');

	goog.events.listen(this, ['mousedown', 'touchstart'], function(e) {
		var height = this.getParent().getSize().height / 2;
		var width = this.getParent().getSize().width / 2;
		e.startDrag(true, new goog.math.Box(-height, width, height, -width));
	});

};
goog.inherits(coloroids.Triangle, lime.Sprite);
