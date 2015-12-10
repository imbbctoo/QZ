goog.provide('blackjack.Game');

goog.require('blackjack.Button');
goog.require('blackjack.Card');
goog.require('blackjack.Chip');
goog.require('blackjack.Notice');
goog.require('blackjack.Scoreboard');
goog.require('goog.Timer');
goog.require('lime.Circle');
goog.require('lime.Layer');
goog.require('lime.Sprite');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.MoveTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.Sequence');
goog.require('lime.fill.LinearGradient');

blackjack.Game = function(myMode) {
	lime.Sprite.call(this);

	this.setSize(blackjack.director.getSize().width, blackjack.director.getSize().height).setFill(0, 0, 0);

	var w = 430;
	var h = 550;
	var r = 9 / 10;
	var table = new lime.Layer();
	this.appendChild(table.setPosition(0, -30));
	table.appendChild(new lime.Circle().setFill(136, 0, 21).setSize(w, h).setPosition(0, 15));
	table.appendChild(new lime.Circle().setFill(185, 122, 87).setSize(w, h));
	table.appendChild(new lime.Circle().setFill(136, 0, 21).setSize(w * r, h * r).setPosition(0, -12));
	table.appendChild(new lime.Circle().setFill(0, 0, 0).setSize(w * r + 2, h * r + 2));
	var back = new lime.fill.LinearGradient().addColorStop(0, '#2b4').addColorStop(1, '#183');
	table.appendChild(new lime.Circle().setFill(back).setSize(w * r, h * r));

	this.timer = [];
	this.timer[0] = new goog.Timer();
	this.timer[1] = new goog.Timer();
	this.timer[2] = new goog.Timer(900);
	this.timer[3] = new goog.Timer(300);

	goog.events.listen(this.timer[2], 'tick', function() {
		if (this.judge(1) == 1) return;
		this.draw(1, 0);
	}, false, this);

	this.p = [];

	this.p[2] = new blackjack.Scoreboard(0);
	this.appendChild(this.p[2].setPosition(0, -25));

	this.p[1] = new blackjack.Scoreboard(0);
	this.appendChild(this.p[1].setPosition(0, -55));

	this.c = [];

	this.c[2] = new blackjack.Scoreboard();
	this.c[2].label.setText('PLAYER');
	this.appendChild(this.c[2].setPosition(90, -200));

	this.c[1] = new blackjack.Scoreboard();
	this.c[1].label.setText('DEALER');
	this.appendChild(this.c[1].setPosition(-90, -200));

	this.cards = new blackjack.Scoreboard();
	this.cards.label.setText('CARDS');
	this.cards.number.setText(52);
	this.appendChild(this.cards.setPosition(0, -200));

	this.layer = [];

	this.layer[0] = new lime.Layer();
	this.layer[1] = new lime.Layer();
	this.layer[2] = new lime.Layer();
	this.layer[3] = new lime.Layer();
	this.layer[4] = new lime.Layer();

	this.appendChild(this.layer[0]);
	this.layer[0].appendChild(this.layer[1].setPosition(0, -115));
	this.layer[0].appendChild(this.layer[2].setPosition(0, 35));
	this.layer[0].appendChild(this.layer[3].setPosition(0, 160));
	this.layer[0].appendChild(this.layer[4].setPosition(0, 350));

	this.card_b = [];
	this.card_u = [];
	var k = 0;
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 13; j++) {
			this.card_b[k] = new blackjack.Card(i, j + 1);
			k++;
		}
	}

	this.chip = new blackjack.Chip();
	this.layer[0].appendChild(this.chip.setPosition(100, 107));

	goog.events.listen(this.chip, ['mousedown', 'touchstart'], function() {
		if (!this.timer[0].enabled && parseInt(this.chip.l.getText()) < 10 && parseInt(this.c[2].number.getText()) > 0 && parseInt(this.c[1].number.getText()) > 0) {
			this.chip.stop();
			this.chip.runAction(new lime.animation.Sequence(
				new lime.animation.ScaleTo(.9).setDuration(.1),
				new lime.animation.ScaleTo(1).setDuration(.1)
			));
			this.chip.l.setText(parseInt(this.chip.l.getText()) + 1);
			this.c[2].number.setText(parseInt(this.c[2].number.getText()) - 1);
			this.c[1].number.setText(parseInt(this.c[1].number.getText()) - 1);
		}
	}, false, this);

	this.deal = new blackjack.Button().deal;
	this.layer[3].appendChild(this.deal);

	goog.events.listen(this.deal, ['mousedown', 'touchstart'], function() {
		if (!this.timer[0].enabled) {
			this.timer[0].start();
			this.layer[4].runAction(new lime.animation.MoveTo(0, 160).setDuration(.3));
			this.layer[3].runAction(new lime.animation.MoveTo(0, 350).setDuration(.3));
			this.timer[3].start();
			var k = 0;
			goog.events.listen(this.timer[3], 'tick', function() {
				if (k == 0) this.draw(2, 0);
				if (k == 1) this.draw(2, 0);
				if (k == 2) this.draw(1, 0);
				if (k == 3) this.draw(1, 1);
				k++;
			}, false, this);
			this.chip.stop(1);
		}
	}, false, this);

	this.hit = new blackjack.Button().hit;
	this.layer[4].appendChild(this.hit.setPosition(-70, 0));

	goog.events.listen(this.hit, ['mousedown', 'touchstart'], function() {
		if (!this.timer[1].enabled && parseInt(this.cards.number.getText()) > 9) this.draw(2, 0);
	}, false, this);

	this.stand = new blackjack.Button().stand;
	this.layer[4].appendChild(this.stand.setPosition(70, 0));

	goog.events.listen(this.stand, ['mousedown', 'touchstart'], function() {
		if (!this.timer[1].enabled) {
			this.timer[1].start();
			this.timer[2].start();
			this.layer[1].getChildAt(1).back.setOpacity(0);

			this.p[1].number.setText(parseInt(this.p[1].number.getText()) + parseInt(this.layer[1].getChildAt(1).number2));

			if (this.layer[1].getChildAt(1).number1 == 'A' && this.layer[1].getChildAt(1).flower == '%u2660' && this.flag[0]) this.calculate(0, 1, 0);
			if (this.layer[1].getChildAt(1).number1 == 'A' && this.layer[1].getChildAt(1).flower == '%u2663' && this.flag[1]) this.calculate(1, 1, 0);
			if (this.layer[1].getChildAt(1).number1 == 'A' && this.layer[1].getChildAt(1).flower == '%u2665' && this.flag[2]) this.calculate(2, 1, 0);
			if (this.layer[1].getChildAt(1).number1 == 'A' && this.layer[1].getChildAt(1).flower == '%u2666' && this.flag[3]) this.calculate(3, 1, 0);
		}
	}, false, this);

	this.notice = [];
	for (var i = 0; i <= 8; i++) {
		this.notice[i] = new blackjack.Notice(i);
		this.notice[i].refresh(0);
		this.appendChild(this.notice[i].setOpacity(0));
	}

	for (var i = 0; i <= 6; i++) {
		goog.events.listen(this.notice[i], ['mousedown', 'touchstart'], function() {
			this.timer[0].stop();
			this.newRound();
		}, false, this);
	}

	for (var i = 7; i <= 8; i++) {
		goog.events.listen(this.notice[i], ['mousedown', 'touchstart'], function() {
			this.timer[0].stop();
			this.newGame();
		}, false, this);
	}

	this.shuffle_notice = new lime.Layer().appendChild(new lime.Sprite().setSize(350, 35).setFill(0, 0, 0).setOpacity(.6)).appendChild(new lime.Label().setFontSize(20).setFontColor('#fff').setText('SHUFFLING'));
	this.appendChild(this.shuffle_notice.setPosition(0, -100));

	this.newGame();

	this.appendChild(new lime.Sprite().setSize(blackjack.director.getSize().width, blackjack.director.getSize().height).setFill(0, 0, 0).setOpacity(.1));
};
goog.inherits(blackjack.Game, lime.Sprite);

blackjack.Game.prototype.newRound = function() {
	this.timer[0].stop();
	this.timer[1].start();
	this.timer[2].stop();
	this.timer[3].stop();
	this.p[2].number.setText(0);
	this.p[1].number.setText(0);
	this.chip.l.setText(1);
	this.c[2].number.setText(parseInt(this.c[2].number.getText()) - parseInt(this.chip.l.getText()));
	this.c[1].number.setText(parseInt(this.c[1].number.getText()) - parseInt(this.chip.l.getText()));
	this.chip.anime.play();
	this.layer[3].runAction(new lime.animation.MoveTo(0, 160).setDuration(.3));
	this.layer[4].runAction(new lime.animation.MoveTo(0, 350).setDuration(.3));
	for (var i = 0; i <= 8; i++) this.notice[i].runAction(new lime.animation.FadeTo(0));
	var anime = new lime.animation.MoveTo(0, -350).setDuration(.3);
	anime.addTarget(this.layer[1]);
	anime.addTarget(this.layer[2]);
	anime.play();
	goog.events.listen(anime, 'stop', function() {
		for (var i = 0; i < 52; i++) {
			if (this.layer[1].getChildAt(0) == null) break;
			this.layer[1].removeChild(this.layer[1].getChildAt(0));
		}
		for (var i = 0; i < 52; i++) {
			if (this.layer[2].getChildAt(0) == null) break;
			this.layer[2].removeChild(this.layer[2].getChildAt(0));
		}
		if (parseInt(this.cards.number.getText()) < 17) this.shuffle();
		this.layer[1].setPosition(0, -115);
		this.layer[2].setPosition(0, 35);
	}, false, this);
};

blackjack.Game.prototype.newGame = function() {
	this.c[2].number.setText(200);
	this.c[1].number.setText(400 - parseInt(this.c[2].number.getText()));
	this.newRound();
	this.shuffle();
	/*
			1	2	3	4	5	6	7	8	9	10	11	12	13
		1	0	1	2	3	4	5	6	7	8	9	10	11	12

		2	13	14	15	16	17	18	19	20	21	22	23	24	25

		3	26	27	28	29	30	31	32	33	34	35	36	37	38

		4	39	40	41	42	43	44	45	46	47	48	49	50	51
	*/
	//this.a = [0, 18, 5, 26, 2, 39, 27, 0, 8];
};

blackjack.Game.prototype.draw = function(num, val) {
	//var index = this.a[this.a.length - 1];
	//this.a.pop();
	var index = parseInt(Math.random() * this.card_u.length);
	var card = this.card_u[index];
	this.card_u[index] = this.card_u[this.card_u.length - 1];
	this.card_u.pop();

	var number = this.layer[num].getNumberOfChildren() + 1;
	this.layer[num].appendChild(card.setPosition(number * 25, -350));

	var x1 = this.layer[num].getChildAt(0).getPosition().x;
	var x2 = this.layer[num].getChildAt(number - 1).getPosition().x;
	this.layer[num].runAction(new lime.animation.MoveTo(-(x1 + x2) / 2, this.layer[num].getPosition().y).setDuration(.3));

	if (val == 0) this.p[num].number.setText(parseInt(this.p[num].number.getText()) + parseInt(this.layer[num].getChildAt(this.layer[num].getNumberOfChildren() - 1).number2));

	var anime = new lime.animation.MoveTo(number * 25, 0).setDuration(.3);
	card.runAction(anime);
	goog.events.listen(anime, 'stop', function() {
		card.back.setOpacity(val);
		if (val == 1) {
			this.timer[1].stop();
			this.timer[3].stop();
			this.judge(2);
		}
	}, false, this);
	this.cards.number.setText(parseInt(this.cards.number.getText()) - 1);

	for (var i = 0, len = this.layer[num].getNumberOfChildren(); i < len; i++) {
		if (this.layer[num].getChildAt(i).number1 == 'A' && this.layer[num].getChildAt(i).flower == '%u2660' && this.flag[0]) this.calculate(0, num, val);
		if (this.layer[num].getChildAt(i).number1 == 'A' && this.layer[num].getChildAt(i).flower == '%u2663' && this.flag[1]) this.calculate(1, num, val);
		if (this.layer[num].getChildAt(i).number1 == 'A' && this.layer[num].getChildAt(i).flower == '%u2665' && this.flag[2]) this.calculate(2, num, val);
		if (this.layer[num].getChildAt(i).number1 == 'A' && this.layer[num].getChildAt(i).flower == '%u2666' && this.flag[3]) this.calculate(3, num, val);
	}

	if (num == 2 && !this.timer[3].enabled) this.judge(num);
};

blackjack.Game.prototype.shuffle = function() {
	for (var i = 0; i < 52; i++) {
		this.card_b[i].back.setOpacity(1);
		this.card_u[i] = this.card_b[i];
	}
	this.cards.number.setText(52);
	this.flag = [];
	for (var i = 0; i < 4; i++) this.flag[i] = true;
	this.shuffle_notice.runAction(new lime.animation.Sequence(
		new lime.animation.FadeTo(.7).setDuration(.2),
		new lime.animation.FadeTo(0).setDuration(.3),
		new lime.animation.FadeTo(.7).setDuration(.2),
		new lime.animation.FadeTo(0).setDuration(.3)
	));
};

blackjack.Game.prototype.calculate = function(index, num, val) {
	var points = parseInt(this.p[num].number.getText());
	if (points > 21) {
		points -= 10;
		if (val == 0) this.flag[index] = false;
	}
	this.p[num].number.setText(points);
};

blackjack.Game.prototype.show = function(val, c) {
	if (parseInt(this.c[1].number.getText()) <= 0) {
		this.notice[7].runAction(new lime.animation.FadeTo(1));
	} else if (parseInt(this.c[2].number.getText()) <= 0) {
		this.notice[8].runAction(new lime.animation.FadeTo(1));
	} else {
		this.notice[val].runAction(new lime.animation.FadeTo(1));
	}
	this.notice[val].refresh(c);
	this.timer[1].start();

	var cache = parseInt(blackjack.getCookie('cache'));
	if (cache != null && cache != '') {
		cache = (cache > parseInt(this.c[2].number.getText()) ? cache : parseInt(this.c[2].number.getText()));
	} else {
		cache = parseInt(this.c[2].number.getText());
	}
	blackjack.setCookie('cache', cache, 365);
};

blackjack.Game.prototype.judge = function(num) {
	var p1 = parseInt(this.p[1].number.getText());
	var p2 = parseInt(this.p[2].number.getText());
	var c1 = parseInt(this.c[1].number.getText());
	var c2 = parseInt(this.c[2].number.getText());
	var c = parseInt(this.chip.l.getText());
	if (num == 2) {
		if (p2 == 21) {
			this.c[2].number.setText(c2 + c * 3);
			this.c[1].number.setText(c1 - c);
			this.show(4, c * 2);
		} else if (p2 > 21) {
			this.c[1].number.setText(c1 + c * 2);
			this.show(2, c);
		}
	} else if (num == 1) {
		var lim = 17;
		if (p1 >= lim && p1 < 21) {
			if (p2 > p1) {
				this.c[2].number.setText(c2 + c * 2);
				this.show(0, c);
			} else if (p2 == p1) {
				this.c[1].number.setText(c1 + c);
				this.c[2].number.setText(c2 + c);
				this.show(6, c);
			} else if (p2 < p1) {
				this.c[1].number.setText(c1 + c * 2);
				this.show(1, c);
			}
		} else if (p1 == 21) {
			this.c[1].number.setText(c1 + c * 3);
			this.c[2].number.setText(c2 - c);
			this.show(5, c * 2);
		} else if (p1 > 21) {
			this.c[2].number.setText(c2 + c * 2);
			this.show(3, c);
		}
		if (p1 >= lim) {
			this.timer[2].stop();
			return 1;
		}
	}
};
