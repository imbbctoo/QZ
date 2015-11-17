goog.provide('blackbox.Bonus');

goog.require('lime.Sprite');

blackbox.Bonus = function(val) {
	lime.Sprite.call(this);

	this.setSize(120, 140).setFill('assets/fail.jpg');

	this.lady = [];

	for (var i = 0; i < val; i++) {
		this.str = 'assets/' + i + '.jpg';
		this.lady[i] = new lime.Sprite().setSize(120, 140).setFill(this.str);
	}
};
goog.inherits(blackbox.Bonus, lime.Sprite);
