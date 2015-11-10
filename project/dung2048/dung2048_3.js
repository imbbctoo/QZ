goog.provide('dung2048.Notice');

goog.require('lime.Label');
goog.require('lime.Layer');
goog.require('lime.Sprite');

dung2048.Notice = function(val) {
    lime.Layer.call(this);

	var back = new lime.Sprite().setSize(320, 460).setFill(255, 255, 255).setOpacity(.7);
	this.appendChild(back);

	var lbl = [];

	lbl[0] = new lime.Label().setSize(320, 12).setFontSize(20).setText('YOU WIN!');
	lbl[1] = new lime.Label().setSize(320, 12).setFontSize(20).setText('YOU LOSE!');
	this.appendChild(lbl[val].setPosition(0, -50));

	var lbl2 = new lime.Label().setSize(320, 12).setFontSize(18).setText('SCORE:');
	this.appendChild(lbl2.setPosition(0, -10));

	this.lbl_s = new lime.Label().setSize(320, 12).setFontSize(18).setText(0);
	this.appendChild(this.lbl_s.setPosition(0, 15));
};
goog.inherits(dung2048.Notice, lime.Layer);
