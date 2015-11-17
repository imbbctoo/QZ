goog.provide('blackjack.Scoreboard');

goog.require('lime.Label');
goog.require('lime.RoundedRect');

blackjack.Scoreboard = function(val) {
	lime.RoundedRect.call(this);

	this.setSize(30, 20).setFill(255, 255, 255).appendChild(new lime.RoundedRect().setSize(28, 18).setFill(0, 0, 0));

	this.number = new lime.Label().setText(0).setFontColor('#fff');
	this.appendChild(this.number);

	this.label = new lime.Label().setText(123).setFontColor('#f0f').setFontSize(14).setSize(320, 12);
	this.appendChild(this.label.setPosition(0, 20).setOpacity(val));
};
goog.inherits(blackjack.Scoreboard, lime.RoundedRect);
