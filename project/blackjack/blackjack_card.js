goog.provide('blackjack.Card');

goog.require('lime.Label');
goog.require('lime.RoundedRect');

blackjack.Card = function(f, n) {
	lime.RoundedRect.call(this);

	this.setSize(57, 82).setFill(0, 0, 0);

	this.c = [];
	for (var i = 0; i < 4; i++) {
		this.c[i] = [];
	}

	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 13; j++) {
			this.c[i][j] = {};
			this.c[i][j].flower = i == 0 ? '%u2660' : i == 1 ? '%u2663' : i == 2 ? '%u2665' : i == 3 ? '%u2666' : null;
			this.c[i][j].number1 = j + 1 == 11 ? 'J' : j + 1 == 12 ? 'Q' : j + 1 == 13 ? 'K' : j + 1 == 1 ? 'A' : j + 1;
			this.c[i][j].number2 = j + 1 > 10 ? 10 : j + 1 == 1 ? 11 : j + 1;
			this.c[i][j].color = i > 1 ? 'red' : 'black';
		}
	}

	this.appendChild(new lime.RoundedRect().setSize(55, 80).setFill(255, 255, 255));

	this.flower = this.c[f][n - 1].flower;
	this.number1 = this.c[f][n - 1].number1;
	this.number2 = this.c[f][n - 1].number2;
	this.color = this.c[f][n - 1].color;

	this.appendChild(new lime.Label().setText(unescape(this.flower)).setFontSize(40).setFontColor(this.color));

	this.appendChild(new lime.Label().setText(this.number1).setFontSize(16).setAnchorPoint(0, 0).setFontColor(this.color).setPosition(-25, -35));
	this.appendChild(new lime.Label().setText(this.number1).setFontSize(16).setAnchorPoint(0, 0).setFontColor(this.color).setPosition(25, 35).setRotation(180));

	this.back = new lime.RoundedRect().setSize(55, 80).setFill(255, 255, 255);
	this.back.appendChild(new lime.RoundedRect().setSize(51, 76).setFill(54, 208, 20)).appendChild(new lime.Label().setText('LIME').setFontColor('#fff').setFontSize(20));
	this.appendChild(this.back.setOpacity(1));
};
goog.inherits(blackjack.Card, lime.RoundedRect);
