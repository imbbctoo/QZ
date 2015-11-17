goog.provide('numrubik.Notice');

goog.require('lime.Layer');
goog.require('lime.RoundedRect');
goog.require('lime.Sprite');

numrubik.Notice = function() {
	lime.Layer.call(this);

	var back = new lime.fill.LinearGradient().addColorStop(0, 100, 150, 255, .7)
        .addColorStop(0.5, 100, 150, 255, .1).addColorStop(1, 0, 0, 0, 0);

	this.box = new lime.RoundedRect().setSize(150, 150).setFill(back).setAnchorPoint(.5, .1);

	this.lbl1 = new lime.Label().setText('You win!').setFontSize(20).setPosition(0, 0);
	this.box.appendChild(this.lbl1);
	this.lbl2 = new lime.Label().setText('MOVES').setAnchorPoint(0, 0).setPosition(-60, 30);
	this.box.appendChild(this.lbl2);
	this.lbl3 = new lime.Label().setText('TIME').setAnchorPoint(0, 0).setPosition(-60, 50);
	this.box.appendChild(this.lbl3);
	this.lbl4 = new lime.Label().setText('MOVES').setAnchorPoint(1, 0).setPosition(60, 30);
	this.box.appendChild(this.lbl4);
	this.lbl5 = new lime.Label().setText('TIME').setAnchorPoint(1, 0).setPosition(60, 50);
	this.box.appendChild(this.lbl5);

	this.box2 = new lime.Sprite().setSize(320, 460).setAnchorPoint(.5, .5).setFill('#FFF').setOpacity(.5);
	this.appendChild(this.box2);
	this.appendChild(this.box);
};
goog.inherits(numrubik.Notice, lime.Layer);
