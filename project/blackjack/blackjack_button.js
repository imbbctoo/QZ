goog.provide('blackjack.Button');

goog.require('lime.GlossyButton');
goog.require('lime.Layer');

blackjack.Button = function() {
	lime.Layer.call(this);

	this.deal = new lime.GlossyButton('DEAL').setSize(100, 40).setColor('#999');
	this.hit = new lime.GlossyButton('HIT').setSize(100, 40).setColor('#999');
	this.stand = new lime.GlossyButton('STAND').setSize(100, 40).setColor('#999');
};
goog.inherits(blackjack.Button, lime.Layer);
