goog.provide('coloroids.Bullet');

goog.require('lime.Polygon');

coloroids.Bullet = function() {
	lime.Polygon.call(this);

	this.addPoints(2, 20, 2, 0, -2, 0, -2, 20).setFill('#c00');

};
goog.inherits(coloroids.Bullet, lime.Polygon);
