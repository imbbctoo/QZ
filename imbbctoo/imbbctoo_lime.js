goog.provide('imbbctoo.Lime');

goog.require('lime.Label');
goog.require('lime.Layer');
goog.require('lime.Sprite');

imbbctoo.Lime = function(x, y) {
	lime.Layer.call(this);

	this.back = new lime.Sprite().setFill(54, 208, 20).setSize(41, 12);
	this.lime = new lime.Label().setFontColor('#FFF').setFontSize(12).setText('LIME');
	this.back.appendChild(this.lime.setPosition(20.5, 7.5));
	this.appendChild(this.back.setAnchorPoint(0, 0));
	this.txt = new lime.Label().setText('Built with').setFontSize(12).setSize(60, 12);
	this.appendChild(this.txt.setAnchorPoint(1, 0));
	this.setPosition(x, y);

};
goog.inherits(imbbctoo.Lime, lime.Layer);

imbbctoo.Lime.prototype.builtWithLime = function(scene) {
	scene.appendChild(this);
};
