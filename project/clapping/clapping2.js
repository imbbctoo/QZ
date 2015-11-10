goog.provide('clapping.Unit');

goog.require('lime.RoundedRect');

clapping.Unit = function(r) {
	lime.RoundedRect.call(this);

	this.setSize(r * 3.5, r * 2).setFill('#555');

	this.lbl = new lime.Label().setText(1).setFontColor('#fff').setFontSize(r);
	this.appendChild(this.lbl);

	this.shelter = new lime.RoundedRect().setSize(r * 3.5, r * 2).setFill('#555').setOpacity(.1);
	this.appendChild(this.shelter);
};
goog.inherits(clapping.Unit, lime.RoundedRect);
