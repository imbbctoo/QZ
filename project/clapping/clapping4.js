goog.provide('clapping.Notice');

goog.require('lime.Layer');
goog.require('lime.RoundedRect');
goog.require('lime.Sprite');

clapping.Notice = function() {
	lime.Layer.call(this);

	var back = new lime.fill.LinearGradient().addColorStop(0, 255, 150, 0, .4)
        .addColorStop(0.5, 250, 150, 0, .05).addColorStop(1, 0, 0, 0, 0);

	this.box = new lime.RoundedRect().setSize(150, 150).setFill(back).setAnchorPoint(.5, .3);

	this.lbl1 = new lime.Label().setPosition(0, -30).setFontSize(20).setFontColor('#000').setSize(320, 12);
	this.box.appendChild(this.lbl1);

	this.lbl2 = new lime.Label().setPosition(0, 10).setFontColor('#000').setSize(320, 12);
	this.box.appendChild(this.lbl2);

	this.lbl3 = new lime.Label().setPosition(0, 30).setFontColor('#000').setSize(320, 12);
	this.box.appendChild(this.lbl3);

	this.lbl4 = new lime.Label().setPosition(0, 50).setFontColor('#000').setSize(320, 12);
	this.box.appendChild(this.lbl4);

	this.box2 = new lime.Sprite().setSize(320, 460).setAnchorPoint(.5, .5).setFill('#FFF').setOpacity(.7);

	this.appendChild(this.box2);
	this.appendChild(this.box.setPosition(0, -30));
};
goog.inherits(clapping.Notice, lime.Layer);
