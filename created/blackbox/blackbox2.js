goog.provide('blackbox.Unit');

goog.require('lime.Circle');
goog.require('lime.Sprite');

blackbox.Unit = function(r) {
	lime.Circle.call(this);

	this.setSize(2 * r, 2 * r).setFill(255, 255, 255);

	this.appendChild(new lime.Circle().setSize(2 * r - 9, 2 * r - 9).setFill(255, 150, 0));

	var mask = new lime.Sprite().setSize(r, r).setFill(255, 255, 255).setAnchorPoint(-.1, -.1);
	var cir = new lime.Circle().setSize(2 * r - 9, 2 * r - 9).setFill(0, 150, 255);

	this.appendChild(cir.setMask(mask));

	var f1 = new lime.Sprite().setSize(4.5, 40.5).setFill(255, 255, 255).setAnchorPoint(0, 0);
	var f2 = new lime.Sprite().setSize(40.5, 4.5).setFill(255, 255, 255).setAnchorPoint(0, 0);
	this.appendChild(f1.setPosition(.05 * r, .05 * r));
	this.appendChild(f2.setPosition(.05 * r, .05 * r));
};
goog.inherits(blackbox.Unit, lime.Circle);
