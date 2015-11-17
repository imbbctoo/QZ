goog.provide('blackbox.Unit');

goog.require('lime.Circle');
goog.require('lime.Sprite');

blackbox.Unit = function(r, a) {
	lime.Circle.call(this);

	this.setSize(2 * r, 2 * r).setFill(255, 255, 255).setRotation(a);

	var knob = new lime.Circle().setSize(2 * r - 9, 2 * r - 9).setFill(255, 150, 0);
	this.appendChild(knob);
	
	var mask1 = new lime.Circle().setSize(2 * r - 9, 2 * r - 9).setFill(0, 150, 255);
	this.appendChild(mask1);
	
	var mask2 = new lime.Sprite().setSize(r, r).setFill(255, 255, 255).setAnchorPoint(0, 0);
	this.appendChild(mask2.setPosition(.06 * r, .06 * r));
	mask1.setMask(mask2);

	var figure1 = new lime.Sprite().setSize(4.5, 40.5).setFill(255, 255, 255).setAnchorPoint(0, 0);
	var figure2 = new lime.Sprite().setSize(40.5, 4.5).setFill(255, 255, 255).setAnchorPoint(0, 0);
	this.appendChild(figure1.setPosition(.05 * r, .05 * r));
	this.appendChild(figure2.setPosition(.05 * r, .05 * r));
};
goog.inherits(blackbox.Unit, lime.Circle);
