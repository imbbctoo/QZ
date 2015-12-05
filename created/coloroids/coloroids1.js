goog.provide('coloroids.Game');

goog.require('coloroids.Bullet');
goog.require('coloroids.Enemy');
goog.require('coloroids.Notice');
goog.require('coloroids.Triangle');
goog.require('lime.Sprite');
goog.require('lime.animation.FadeTo');
goog.require('lime.audio.Audio');
goog.require('lime.fill.LinearGradient');

coloroids.Game = function() {
	this.bgMusic = document.createElement('audio');
	this.bgMusic.src = 'assets/civil.mp3';
	this.bgMusic.loop = 'loop';
	this.bgMusic.autoplay = 'autoplay';

	lime.Sprite.call(this);

	this.w = coloroids.director.getSize().width;
	this.h = coloroids.director.getSize().height;
	this.setSize(this.w, this.h).setAnchorPoint(.5, .5);

	this.setFill('assets/bg.png');

	this.notice = new coloroids.Notice();
	this.appendChild(this.notice.setPosition(0, 0));

	this.triangle = new coloroids.Triangle();

	this.setTriangle();

	this.bullet = new coloroids.Bullet();

	this.enemy = new coloroids.Enemy();

	this.n = -2;

	this.endRoundSound = new lime.audio.Audio('assets/end.mp3');
	this.bounceSound = new lime.audio.Audio('assets/bounce.mp3');
	this.missSound = new lime.audio.Audio('assets/miss.mp3');
};
goog.inherits(coloroids.Game, lime.Sprite);

coloroids.Game.prototype.start = function() {
    lime.scheduleManager.schedule(this.step_, this);
};

coloroids.Game.prototype.step_ = function(dt) {
	var pos1 = this.enemy.getPosition();
	var pos2 = this.bullet.getPosition();
	var pos3 = this.triangle.getPosition();

	var x = Math.random() * (this.w - this.enemy.r * 2) - (this.w - this.enemy.r * 2) / 2;
	var y = - this.h / 2 - this.enemy.r - 10;

	pos1.y += (this.n / 300 + 0.3) * dt;
	if (pos1.y >= this.h / 2 + this.enemy.r) {
		if (this.n >= 1) {
			this.n -= 1;
		}
		pos1.x = x;
		pos1.y = y;
		this.appendChild(this.enemy);
		this.missSound.stop();
		this.missSound.play();
	}
	this.enemy.setPosition(pos1);

	pos2.y -= 1.5 * dt;
	if (pos2.y - pos3.y <= -500) {
		pos2.x = pos3.x;
		pos2.y = pos3.y - 50;
		this.appendChild(this.bullet);
	}
	this.bullet.setPosition(pos2);

	if ((pos1.x - pos2.x) * (pos1.x - pos2.x) + (pos1.y - pos2.y) * (pos1.y - pos2.y) <= 1600) {
		pos1.x = x;
		pos1.y = y;
		this.appendChild(this.enemy);
		this.n += 2;
        this.bounceSound.stop();
        this.bounceSound.play();
	}

	if ((pos1.x - pos3.x) * (pos1.x - pos3.x) + (pos1.y - pos3.y) * (pos1.y - pos3.y) <= 1600) {
		pos1.x = x;
		pos1.y = y;
		this.appendChild(this.enemy);

		var a = this.notice.t2.getText();
		var b = this.n;
		a > b ? this.notice.t2.setText(a) : this.notice.t2.setText(b);

		this.endRound();
	}
	this.notice.t1.setText(this.n);
};

coloroids.Game.prototype.setTriangle = function() {
	this.appendChild(this.triangle.setPosition(0, 128));
	goog.events.listenOnce(this.triangle, ['touchstart', 'mousedown'], this.start, false, this);
};

coloroids.Game.prototype.endRound = function() {
	this.n = 0;

	var show = new lime.animation.FadeTo(1);
	goog.events.listen(show, lime.animation.Event.STOP, function() {
		this.notice.t1.setText('You died!');
		this.setTriangle();
		this.bullet.setPosition(0, -500);
	}, false, this);
	this.notice.runAction(show);

	lime.scheduleManager.unschedule(this.step_, this);
	this.endRoundSound.stop();
	this.endRoundSound.play();
};
