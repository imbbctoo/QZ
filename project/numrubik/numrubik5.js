goog.provide('numrubik.Table');

goog.require('lime.Label');
goog.require('lime.Layer');

numrubik.Table = function() {
	lime.Layer.call(this);

	this.appendChild(new lime.Label().setSize(320, 12).setText('BEST SCORE').setPosition(0, -60));
	this.appendChild(new lime.Label().setSize(320, 12).setText('3*3').setPosition(10, -30).setFontSize(10));
	this.appendChild(new lime.Label().setSize(320, 12).setText('4*4').setPosition(100, -30).setFontSize(10));
	this.appendChild(new lime.Label().setSize(320, 12).setText('BEST TIME').setPosition(-100, 0).setFontSize(10));
	this.appendChild(new lime.Label().setSize(320, 12).setText('BEST MOVES').setPosition(-100, 40).setFontSize(10));
};
goog.inherits(numrubik.Table, lime.Layer);
