goog.provide('blackbox.Game');

goog.require('blackbox.Bonus');
goog.require('blackbox.Box');
goog.require('blackbox.Move');
goog.require('blackbox.Notice');
goog.require('blackbox.Unit');
goog.require('goog.Timer');
goog.require('lime.RoundedRect');
goog.require('lime.Sprite');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.Loop');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.Sequence');
goog.require('lime.fill.LinearGradient');

blackbox.Game = function() {
	lime.Sprite.call(this);

	this.w = blackbox.director.getSize().width;
	this.h = blackbox.director.getSize().height;
	this.setSize(this.w, this.h).setAnchorPoint(.5, .5);

	var back = new lime.fill.LinearGradient().addColorStop(0, '#bbb').addColorStop(1, '#DDD');
	this.setFill(back);

	this.appendChild(new blackbox.Box());

	this.unit = [];
	for (var i = 0; i < 4; i++) {
		this.unit[i] = new blackbox.Unit(45, i * 90);
	}

	this.appendChild(this.unit[0].setPosition(-67, -77));
	this.appendChild(this.unit[1].setPosition(-67, 77));
	this.appendChild(this.unit[2].setPosition(67, 77));
	this.appendChild(this.unit[3].setPosition(67, -77));

	this.timer1 = new goog.Timer(1000);
	goog.events.listen(this.timer1, 'tick', function() {
		this.n += 1;
		this.s = this.n % 60;
		this.m = parseInt(this.n / 60) % 60;
		this.h = parseInt(this.n / 3600);
		this.str = this.h + ':' + this.m + ':' + this.s;
		this.lbl1.setText(this.str);
		if (this.mixed && this.s > this.l) {
			this.hint2.setHidden(false);
		}
	}, false, this);

	var timer2 = new goog.Timer(500);
	goog.events.listen(timer2, 'tick', function() {
		this.stop();
	});

	goog.events.listen(this.unit[0], ['mousedown', 'touchstart'], function() {
		if (!timer2.enabled) {
			this.turn(0);
			timer2.start();
		}
	}, false, this);
	goog.events.listen(this.unit[1], ['mousedown', 'touchstart'], function() {
		if (!timer2.enabled) {
			this.turn(1);
			timer2.start();
		}
	}, false, this);
	goog.events.listen(this.unit[2], ['mousedown', 'touchstart'], function() {
		if (!timer2.enabled) {
			this.turn(2);
			timer2.start();
		}
	}, false, this);
	goog.events.listen(this.unit[3], ['mousedown', 'touchstart'], function() {
		if (!timer2.enabled) {
			this.turn(3);
			timer2.start();
		}
	}, false, this);

	this.notice = new blackbox.Notice();
	this.appendChild(this.notice.setOpacity(1));

	this.chosen = [];

	this.d = [];
	this.d[0] = [];
	this.d[1] = [];

	this.p = [];
	this.p[0] = [];
	this.p[1] = [];
	this.p[2] = [];
	this.p[3] = [];

	this.q = [];

	this.r = [];

	this.load();

	this.check = new lime.animation.FadeTo(1).setDuration(.1);

	goog.events.listen(this.check, lime.animation.Event.STOP, function() {
		if (this.unit[0].getRotation() == 0 &&
			(this.unit[1].getRotation() == 90 || this.unit[1].getRotation() == -270) &&
			(this.unit[2].getRotation() == 180 || this.unit[2].getRotation() == -180) &&
			(this.unit[3].getRotation() == 270 || this.unit[3].getRotation() == -90) &&
			this.mixed == true) {
			this.notice.runAction(new lime.animation.FadeTo(1));
			this.notice.lbl4.setText(this.lbl2.getText());
			this.notice.lbl5.setText(this.lbl1.getText());
			this.timer1.stop();
			this.mixed = false;
			this.hint1.setHidden(this.mixed);
			this.lbl1.runAction(new lime.animation.ScaleTo(1).setDuration(.2));
			this.lbl2.runAction(new lime.animation.ScaleTo(1).setDuration(.2));
			this.hint2.setHidden(true);
			if (this.cheat) {
				this.bonus.runAction(new lime.animation.FadeTo(1));
			} else {
				this.bonus.lady[this.index].runAction(new lime.animation.FadeTo(1));
			}
		}/*
		for (var i = 0; i < 4; i++) {
			if (this.unit[i].getRotation % 90 != 0) {
				var rot = parseInt(this.unit[i].getRotation() / 90) * 90;
				this.unit[i].setRotation(rot);
			}
		}*/
	}, false, this);

	this.lbl1 = new lime.Label().setAnchorPoint(1, 0).setFontSize(30).setPosition(160, -215);
	this.appendChild(this.lbl1);

	this.lbl2 = new lime.Label().setAnchorPoint(0, 0).setFontSize(30).setPosition(-160, -215);
	this.appendChild(this.lbl2);

	this.lbl3 = new lime.Label().setText('TIME').setAnchorPoint(1, 0).setFontSize(15).setPosition(160, -230);
	this.appendChild(this.lbl3);

	this.lbl4 = new lime.Label().setText('MOVES').setAnchorPoint(0, 0).setFontSize(15).setPosition(-160, -230);
	this.appendChild(this.lbl4);

	this.key = [];

	this.key[0] = new lime.Label().setText(0).setAnchorPoint(.5, .5).setFontSize(20).setPosition(-67, -77);
	this.appendChild(this.key[0].setOpacity(0));

	this.key[1] = new lime.Label().setText(0).setAnchorPoint(.5, .5).setFontSize(20).setPosition(-67, 77);
	this.appendChild(this.key[1].setOpacity(0));

	this.key[2] = new lime.Label().setText(0).setAnchorPoint(.5, .5).setFontSize(20).setPosition(67, 77);
	this.appendChild(this.key[2].setOpacity(0));

	this.key[3] = new lime.Label().setText(0).setAnchorPoint(.5, .5).setFontSize(20).setPosition(67, -77);
	this.appendChild(this.key[3].setOpacity(0));

	this.n = 0;
	this.s = 0;
	this.m = 0;
	this.h = 0;
	this.l = 10;

	this.hint1 = new lime.RoundedRect().setSize(90, 50).setFill(0, 50, 255);
	this.hint1.runAction(
		new lime.animation.Loop(
			new lime.animation.Sequence(
				new lime.animation.FadeTo(.5).setDuration(.3),
				new lime.animation.FadeTo(1).setDuration(.3)
			)
		)
	);
	this.appendChild(this.hint1.setPosition(-100, 160));

	this.hint2 = new lime.RoundedRect().setSize(90, 50).setFill(0, 50, 255);
	this.hint2.runAction(
		new lime.animation.Loop(
			new lime.animation.Sequence(
				new lime.animation.FadeTo(.5).setDuration(.3),
				new lime.animation.FadeTo(1).setDuration(.3)
			)
		)
	);
	this.appendChild(this.hint2.setPosition(100, 160).setHidden(true));

	this.picnum = 22;
	this.index = parseInt(Math.random() * this.picnum);
	this.bonus = new blackbox.Bonus(this.picnum);
	this.appendChild(this.bonus.setOpacity(0));
	for (var i = 0; i < this.picnum; i++) {
		this.appendChild(this.bonus.lady[i].setOpacity(0));
	}

	this.renew();

	this.button1 = new lime.GlossyButton('START').setSize(80, 40);
	goog.events.listen(this.button1, 'click', function() {
		if (!timer2.enabled) {
			this.renew();
			this.load();
			this.disorganize();
			this.lbl1.runAction(new lime.animation.ScaleTo(1.5).setDuration(.2));
			this.lbl2.runAction(new lime.animation.ScaleTo(1.5).setDuration(.2));
			timer2.start();
		}
	}, false, this);
	this.appendChild(this.button1.setPosition(-100, 160));

	this.button2 = new lime.GlossyButton('REPLAY').setSize(80, 40);
	goog.events.listen(this.button2, 'click', function() {
		if (!timer2.enabled) {
			this.renew();
			this.lbl1.runAction(new lime.animation.ScaleTo(1).setDuration(.2));
			this.lbl2.runAction(new lime.animation.ScaleTo(1).setDuration(.2));
			timer2.start();
		}
	}, false, this);
	this.appendChild(this.button2.setPosition(0, 160));

	this.button3 = new lime.GlossyButton('UNLOCK').setSize(80, 40);
	goog.events.listen(this.button3, 'click', function() {
		if (!timer2.enabled) {
			if (this.mixed && this.s > this.l) {
				this.cheat = true;
				for (var i = 0; i < 4; i++) {
					this.key[i].setOpacity(.5);
				}
			}
			timer2.start();
		}
	}, false, this);
	this.appendChild(this.button3.setPosition(100, 160));
};
goog.inherits(blackbox.Game, lime.Sprite);

blackbox.Game.prototype.renew = function() {
	this.index = parseInt(Math.random() * this.picnum);
	this.notice.runAction(new lime.animation.FadeTo(0).setDuration(.3));
	this.timer1.stop();
	this.lbl1.setText('0:0:0');
	this.n = 0;
	this.lbl2.setText(0);
	this.mixed = false;
	for (var i = 0; i < 4; i++) {
		this.unit[i].setRotation(i * 90);
		this.unit[i].runAction(
			new lime.animation.Sequence(
				new lime.animation.ScaleTo(.9).setDuration(.1),
				new lime.animation.ScaleTo(1).setDuration(.1)
			)
		);
		this.q[i] = 0;
		this.r[i] = 0;
		this.key[i].setText(0);
	}
	this.hint1.setHidden(this.mixed);
	for (var i = 0; i < 4; i++) {
		this.key[i].setOpacity(0);
	}
	this.hint2.setHidden(true);
	this.cheat = false;
	this.bonus.runAction(new lime.animation.FadeTo(0));
	for (var i = 0; i < this.picnum; i++) {
		this.bonus.lady[i].runAction(new lime.animation.FadeTo(0));
	}
};

blackbox.Game.prototype.load = function() {
	this.chosen[0] = [0, 1, 2, 3];
	this.chosen[1] = [0, 1, 2, 3];
	this.chosen[2] = [0, 1, 2, 3];
	this.chosen[3] = [0, 1, 2, 3];

	for (var i = 0; i < 4; i++) {
		while (this.chosen[0][i] == i) {
			this.chosen[0][i] = parseInt(Math.random() * 4);
		}

		this.d[0][i] = (parseInt(Math.random() * 2) - .5) * 2;
		this.d[1][i] = (parseInt(Math.random() * 2) - .5) * 2;

		this.chosen[2][i] = i;

		while (this.chosen[1][i] == i || this.chosen[1][i] == this.chosen[0][i]) {
			this.chosen[1][i] = parseInt(Math.random() * 4);
		}

		while (this.chosen[3][i] == i || this.chosen[3][i] == this.chosen[0][i] || this.chosen[3][i] == this.chosen[1][i]) {
			this.chosen[3][i] = parseInt(Math.random() * 4);
		}
	}
};

blackbox.Game.prototype.turn = function(val, boo) {
	if (this.unit[val].getRotation() % 90 == 0) {
		this.lbl2.setText(parseInt(this.lbl2.getText()) + 1);
		for (var i = 0; i < 4; i++) {
			if (i == val) {
				this.q[val] += 1;
				this.r[val] = (this.q[val] * 3) % 4;
				this.key[val].setText(this.r[val]);
				this.unit[i].runAction(new lime.animation.Sequence(new blackbox.Move(90).move, this.check));
			}
			for (var j = 0; j < 2; j++) {
				if (i == this.chosen[j][val]) {
					this.unit[i].runAction(new blackbox.Move(90 * this.d[j][val]).move);
				}
			}
		}
	}
};

blackbox.Game.prototype.disorganize = function() {
	this.lbl2.setText(0);
	this.mixed = true;
	for (var i = 0; i < 4; i++) {
		this.p[i][this.chosen[0][i]] = this.d[0][i];
		this.p[i][this.chosen[1][i]] = this.d[1][i];
		this.p[i][this.chosen[2][i]] = 1;
		this.p[i][this.chosen[3][i]] = 0;
	}
	var origin = [2, 3, 0, 1];
	while (origin[0] == 2 || origin[1] == 3 || origin[2] == 0 || origin[3] == 1) {
		var num = parseInt(Math.random() * 4);
		this.q[num] += 1;
		this.r[num] = (this.q[num] * 3) % 4;
		this.key[num].setText(this.r[num]);
		for (var i = 0; i < 4; i++) {
			origin[i] += this.p[num][i];
			origin[i] %= 4;
			origin[i] < 0 ? origin[i] += 4 : origin[i];
			this.unit[i].setRotation(90 * origin[i] + 180);
			this.unit[i].runAction(
				new lime.animation.Sequence(
					new lime.animation.ScaleTo(.9).setDuration(.1),
					new lime.animation.ScaleTo(1).setDuration(.1)
				)
			);
			//console.log(this.r[i]);
		}
	}
	this.hint1.setHidden(this.mixed);
	this.timer1.start();
};
