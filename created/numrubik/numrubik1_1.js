goog.provide('numrubik.Game44');

goog.require('goog.Timer');
goog.require('lime.GlossyButton');
goog.require('lime.RoundedRect');
goog.require('lime.Sprite');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.Loop');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.Sequence');
goog.require('lime.animation.Spawn');
goog.require('numrubik.Notice');
goog.require('numrubik.Unit');

numrubik.Game44 = function() {
	lime.Sprite.call(this);

	this.w = numrubik.director.getSize().width;
	this.h = numrubik.director.getSize().height;
	this.setSize(this.w, this.h).setAnchorPoint(.5, .5).setFill('#FFF');

	this.unit = [];
	for (var i = 0; i < 16; i++) {
		this.unit[i] = new numrubik.Unit(28);
	}

	this.appendChild(this.unit[0].setPosition(-96, -96));
	this.appendChild(this.unit[1].setPosition(-96, -32));
	this.appendChild(this.unit[2].setPosition(-96, 32));
	this.appendChild(this.unit[3].setPosition(-96, 96));
	this.appendChild(this.unit[4].setPosition(-32, -96));
	this.appendChild(this.unit[5].setPosition(-32, -32));
	this.appendChild(this.unit[6].setPosition(-32, 32));
	this.appendChild(this.unit[7].setPosition(-32, 96));
	this.appendChild(this.unit[8].setPosition(32, -96));
	this.appendChild(this.unit[9].setPosition(32, -32));
	this.appendChild(this.unit[10].setPosition(32, 32));
	this.appendChild(this.unit[11].setPosition(32, 96));
	this.appendChild(this.unit[12].setPosition(96, -96));
	this.appendChild(this.unit[13].setPosition(96, -32));
	this.appendChild(this.unit[14].setPosition(96, 32));
	this.appendChild(this.unit[15].setPosition(96, 96));

	for (var i = 0; i < 16; i++) {
		(function(i, _this) {
			goog.events.listen(_this.unit[i], ['touchstart', 'mousedown'], function() {_this.combatRun(i);}, false, _this);
		})(i, this);
	}

	this.notice = new numrubik.Notice();
	this.appendChild(this.notice.setOpacity(0));

	this.lbl1 = new lime.Label().setAnchorPoint(1, 0).setFontSize(30).setPosition(160, -215);
	this.appendChild(this.lbl1);

	this.lbl2 = new lime.Label().setAnchorPoint(0, 0).setFontSize(30).setPosition(-160, -215);
	this.appendChild(this.lbl2);

	this.lbl3 = new lime.Label().setText('TIME').setAnchorPoint(1, 0).setFontSize(15).setPosition(160, -230);
	this.appendChild(this.lbl3);

	this.lbl4 = new lime.Label().setText('MOVES').setAnchorPoint(0, 0).setFontSize(15).setPosition(-160, -230);
	this.appendChild(this.lbl4);

	this.n = 0;
	this.s = 0;
	this.m = 0;
	this.h = 0;

	this.timer = new goog.Timer(1000);
	goog.events.listen(this.timer, 'tick', function() {
		this.n += 1;
		this.s = this.n % 60;
		this.m = parseInt(this.n / 60) % 60;
		this.h = parseInt(this.n / 3600);
		this.str = this.h + ':' + this.m + ':' + this.s;
		this.lbl1.setText(this.str);
	}, false, this);

	this.hint = new lime.RoundedRect().setSize(90, 50).setFill(0, 50, 255);
	this.hint.runAction(
		new lime.animation.Loop(
			new lime.animation.Sequence(
				new lime.animation.FadeTo(.5).setDuration(.3),
				new lime.animation.FadeTo(1).setDuration(.3)
			)
		)
	);
	this.appendChild(this.hint.setPosition(-100, 160));

	this.renew();

	this.button1 = new lime.GlossyButton('START').setSize(80, 40);
	goog.events.listen(this.button1, 'click', function() {
		this.renew();
		this.disorganize();
		this.lbl1.runAction(new lime.animation.ScaleTo(1.5).setDuration(.2));
		this.lbl2.runAction(new lime.animation.ScaleTo(1.5).setDuration(.2));
	}, false, this);
	this.appendChild(this.button1.setPosition(-100, 160));

	this.button2 = new lime.GlossyButton('REPLAY').setSize(80, 40);
	goog.events.listen(this.button2, 'click', function() {
		this.renew();
		this.lbl1.runAction(new lime.animation.ScaleTo(1).setDuration(.2));
		this.lbl2.runAction(new lime.animation.ScaleTo(1).setDuration(.2));
	}, false, this);
	this.appendChild(this.button2.setPosition(0, 160));

	this.back = new numrubik.Back();
	this.appendChild(this.back.setPosition(100, 160));
};
goog.inherits(numrubik.Game44, lime.Sprite);

numrubik.Game44.prototype.renew = function() {
	/*
	for (var i = 0; i < 9; i++){
		this.unit[i].lbl.setText(0);
		this.run(i);
	}
	*/
	this.notice.runAction(new lime.animation.FadeTo(0).setDuration(.3));
	this.timer.stop();
	this.lbl1.setText('0:0:0');
	this.n = 0;
	this.lbl2.setText(0);
	this.mixed = false;
	this.chunk(function(val) {
		this.unit[val].lbl.setText(0);
		this.run(val, this.mixed);
	}, this, 16);
	this.hint.setHidden(this.mixed);
};

numrubik.Game44.prototype.run = function(val, boo) {
	if (boo) {
		this.timer.stop();
		this.timer.start();
	}
	var check = function(val) {
		return val > 8 ? (val - 9) : val;
	};
	this.unit[val].runAction(
		new lime.animation.Sequence(
			new lime.animation.Spawn(new lime.animation.ScaleTo(1.1).setDuration(.1), new lime.animation.FadeTo(.7).setDuration(.1)),
			new lime.animation.Spawn(new lime.animation.ScaleTo(1).setDuration(.1), new lime.animation.FadeTo(1).setDuration(.1))
		)
	);
	this.unit[val].lbl.setText(check(parseInt(this.unit[val].lbl.getText())) + 1);
};

numrubik.Game44.prototype.combatRun = function(val) {
	this.lbl2.setText(parseInt(this.lbl2.getText()) + 1);
	switch (val) {
		case 0:
			this.run(1);
			this.run(2);
			this.run(3);
			this.run(4);
			this.run(8);
			this.run(12);
			break;
		case 1:
			this.run(0);
			this.run(2);
			this.run(3);
			this.run(5);
			this.run(9);
			this.run(13);
			break;
		case 2:
			this.run(0);
			this.run(1);
			this.run(3);
			this.run(6);
			this.run(10);
			this.run(14);
			break;
		case 3:
			this.run(0);
			this.run(1);
			this.run(2);
			this.run(7);
			this.run(11);
			this.run(15);
			break;
		case 4:
			this.run(0);
			this.run(5);
			this.run(6);
			this.run(7);
			this.run(8);
			this.run(12);
			break;
		case 5:
			this.run(1);
			this.run(4);
			this.run(6);
			this.run(7);
			this.run(9);
			this.run(13);
			break;
		case 6:
			this.run(2);
			this.run(4);
			this.run(5);
			this.run(7);
			this.run(10);
			this.run(14);
			break;
		case 7:
			this.run(3);
			this.run(4);
			this.run(5);
			this.run(6);
			this.run(11);
			this.run(15);
			break;
		case 8:
			this.run(0);
			this.run(4);
			this.run(9);
			this.run(10);
			this.run(11);
			this.run(12);
			break;
		case 9:
			this.run(1);
			this.run(5);
			this.run(8);
			this.run(10);
			this.run(11);
			this.run(13);
			break;
		case 10:
			this.run(2);
			this.run(6);
			this.run(8);
			this.run(9);
			this.run(11);
			this.run(14);
			break;
		case 11:
			this.run(3);
			this.run(7);
			this.run(8);
			this.run(9);
			this.run(10);
			this.run(15);
			break;
		case 12:
			this.run(0);
			this.run(4);
			this.run(8);
			this.run(13);
			this.run(14);
			this.run(15);
			break;
		case 13:
			this.run(1);
			this.run(5);
			this.run(9);
			this.run(12);
			this.run(14);
			this.run(15);
			break;
		case 14:
			this.run(2);
			this.run(6);
			this.run(10);
			this.run(12);
			this.run(13);
			this.run(15);
			break;
		case 15:
			this.run(3);
			this.run(7);
			this.run(11);
			this.run(12);
			this.run(13);
			this.run(14);
			break;
	}
	if (this.unit[0].lbl.getText() == this.unit[1].lbl.getText() &&
		this.unit[1].lbl.getText() == this.unit[2].lbl.getText() &&
		this.unit[2].lbl.getText() == this.unit[3].lbl.getText() &&
		this.unit[3].lbl.getText() == this.unit[4].lbl.getText() &&
		this.unit[4].lbl.getText() == this.unit[5].lbl.getText() &&
		this.unit[5].lbl.getText() == this.unit[6].lbl.getText() &&
		this.unit[6].lbl.getText() == this.unit[7].lbl.getText() &&
		this.unit[7].lbl.getText() == this.unit[8].lbl.getText() &&
		this.unit[8].lbl.getText() == this.unit[9].lbl.getText() &&
		this.unit[9].lbl.getText() == this.unit[10].lbl.getText() &&
		this.unit[10].lbl.getText() == this.unit[11].lbl.getText() &&
		this.unit[11].lbl.getText() == this.unit[12].lbl.getText() &&
		this.unit[12].lbl.getText() == this.unit[13].lbl.getText() &&
		this.unit[13].lbl.getText() == this.unit[14].lbl.getText() &&
		this.unit[14].lbl.getText() == this.unit[15].lbl.getText() &&
		this.mixed == true) {
		this.notice.runAction(new lime.animation.FadeTo(1));
		this.notice.lbl4.setText(this.lbl2.getText());
		this.notice.lbl5.setText(this.lbl1.getText());
		this.timer.stop();
		this.mixed = false;
		this.hint.setHidden(this.mixed);
		this.lbl1.runAction(new lime.animation.ScaleTo(1).setDuration(.2));
		this.lbl2.runAction(new lime.animation.ScaleTo(1).setDuration(.2));

		var bt44 = parseInt(numrubik.getCookie('bt44'));
		if (bt44 != null && bt44 != '') {
			bt44 = (bt44 < this.n ? bt44 : this.n);
		} else {
			bt44 = this.n;
		}
		numrubik.setCookie('bt44', bt44, 365);

		var bm44 = parseInt(numrubik.getCookie('bm44'));
		if (bm44 != null && bm44 != '') {
			bm44 = (bm44 < parseInt(this.lbl2.getText()) ? bm44 : parseInt(this.lbl2.getText()));
		} else {
			bm44 = parseInt(this.lbl2.getText());
		}
		numrubik.setCookie('bm44', bm44, 365);
	}
};

numrubik.Game44.prototype.chunk = function(process, context, times) {
	var array = [];
	for (var i = 0; i < times; i++) {
		array[i] = i;
	}
	setTimeout(function() {
		var item = array.shift();
		process.call(context, item);
		if (array.length > 0) {
			setTimeout(arguments.callee, 1);
		}
	}, 1);
};

numrubik.Game44.prototype.disorganize = function() {
	/*
	for (var i = 0; i < 9; i++){
		this.unit[i].lbl.setText(parseInt(Math.random() * 9));
		this.run(i);
	}
	*/
	this.lbl2.setText(0);
	this.mixed = true;
	this.chunk(function(val) {
		this.unit[val].lbl.setText(parseInt(Math.random() * 9));
		this.run(val, this.mixed);
	}, this, 16);
	this.hint.setHidden(this.mixed);
	this.timer.start();
};
