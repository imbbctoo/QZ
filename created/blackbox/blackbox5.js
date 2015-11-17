goog.provide('blackbox.Notice');

goog.require('lime.Layer');

blackbox.Notice = function() {
	lime.Layer.call(this);

	this.lbl1 = new lime.Label().setText('You win!').setFontSize(25).setAnchorPoint(.5, 1).setPosition(0, -70);
	this.appendChild(this.lbl1);
	this.lbl2 = new lime.Label().setText('MOVES').setFontSize(15).setAnchorPoint(0, 0).setPosition(-65, -70).setRotation(-90);
	this.appendChild(this.lbl2);
	this.lbl3 = new lime.Label().setText('TIME').setFontSize(15).setAnchorPoint(0, 1).setPosition(65, -70).setRotation(-90);
	this.appendChild(this.lbl3);
	this.lbl4 = new lime.Label().setText('MOVES').setFontSize(15).setAnchorPoint(1, 0).setPosition(-65, 70).setRotation(-90);
	this.appendChild(this.lbl4);
	this.lbl5 = new lime.Label().setText('TIME').setFontSize(15).setAnchorPoint(1, 1).setPosition(65, 70).setRotation(-90);
	this.appendChild(this.lbl5);
};
goog.inherits(blackbox.Notice, lime.Layer);
