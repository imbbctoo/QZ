goog.provide('numrubik.Unit');

goog.require('lime.Sprite');

numrubik.Unit = function(r) {
	lime.Sprite.call(this);

	this.setSize(r * 2, r * 2).setFill(255, 150, 0);

	this.lbl = new lime.Label().setText(1).setFontColor('#FFF').setFontSize(50 / 35 * r);
	this.appendChild(this.lbl);

	this.shelter = new lime.Sprite().setSize(r * 2, r * 2).setFill(255, 150, 0).setOpacity(.1);
	this.appendChild(this.shelter);
};
goog.inherits(numrubik.Unit, lime.Sprite);
