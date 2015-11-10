goog.provide('coloroids.Notice');

goog.require('lime.RoundedRect');

coloroids.Notice = function() {
	lime.RoundedRect.call(this);

	var back = new lime.fill.LinearGradient().addColorStop(0, 255, 150, 0, .4)
        .addColorStop(0.9, 250, 150, 0, .05).addColorStop(1, 0, 0, 0, 0);

	this.setSize(150, 100).setFill(back).setAnchorPoint(.5, 0);

	this.t1 = new lime.Label().setText('Welcome!').setPosition(0, 20).setFontColor('#FFF').setSize(60, 12);
	this.appendChild(this.t1);

	this.t2 = new lime.Label().setFontSize(30).setText(0).setPosition(0, 50).setFontColor('#FFF');
	this.appendChild(this.t2);

};
goog.inherits(coloroids.Notice, lime.RoundedRect);

