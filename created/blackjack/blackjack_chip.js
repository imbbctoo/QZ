goog.provide('blackjack.Chip');

goog.require('lime.Circle');
goog.require('lime.Label');
goog.require('lime.Sprite');
goog.require('lime.animation.Delay');
goog.require('lime.animation.Loop');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.Sequence');

blackjack.Chip = function() {
	lime.Circle.call(this);

	var back1 = new lime.fill.LinearGradient().addColorStop(0, '#f00').addColorStop(1, '#a00').setDirection(0, 0, 1, 1);
	this.setSize(50, 50).setFill(back1);

	var s = [];
	var cw = [];

	for (var i = 0; i < 4; i++) {
		s[i] = new lime.Sprite().setSize(10, 60).setFill(255, 255, 255);
		cw[i] = new lime.Circle().setSize(50, 50).setFill(255, 255, 255);
	}

	this.appendChild(cw[0]);
	this.appendChild(cw[1].setRotation(90));
	this.appendChild(cw[2].setRotation(45));
	this.appendChild(cw[3].setRotation(-45));

	this.appendChild(s[0]);
	this.appendChild(s[1].setRotation(90));
	this.appendChild(s[2].setRotation(45));
	this.appendChild(s[3].setRotation(-45));

	for (var i = 0; i < 4; i++) {
		cw[i].setMask(s[i]);
	}

	var back2 = new lime.fill.LinearGradient().addColorStop(0, '#f00').addColorStop(1, '#a00').setDirection(1, 1, 0, 0);

	this.appendChild(new lime.Circle().setSize(40, 40).setFill(back2));

	this.l = new lime.Label().setText().setFontSize(30).setFontColor('#fff');
	this.appendChild(this.l);

	this.anime = new lime.animation.Loop(new lime.animation.Sequence(
		new lime.animation.ScaleTo(1.1).setDuration(.1),
		new lime.animation.Delay().setDuration(.4),
		new lime.animation.ScaleTo(1).setDuration(.1),
		new lime.animation.Delay().setDuration(.4)
	));
	this.anime.addTarget(this);
	this.anime.play();

	this.stop = function(val) {
		this.anime.stop();
		if (val) this.runAction(new lime.animation.ScaleTo(1).setDuration(.1));
	};
};
goog.inherits(blackjack.Chip, lime.Circle);
