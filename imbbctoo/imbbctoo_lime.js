goog.provide('imbbctoo.Lime');

goog.require('lime.Sprite');

imbbctoo.Lime = function() {
	lime.Sprite.call(this);

	this.back = new lime.Sprite().setFill(54, 208, 20).setSize(41, 12);
	this.lime = new lime.Label().setFontColor('#FFF').setFontSize(12).setText('LIME');
	this.back.appendChild(this.lime.setPosition(20.5, 7.5));
	this.appendChild(this.back.setAnchorPoint(0, 0).setPosition(170, 430));
	this.txt = new lime.Label().setText('Built with').setFontSize(12).setSize(60, 12);
	this.appendChild(this.txt.setAnchorPoint(1, 0).setPosition(160, 430));

};
goog.inherits(imbbctoo.Lime, lime.Sprite);

imbbctoo.Lime.prototype.builtWithLime = function(scene) {
	scene.appendChild(this);
};
