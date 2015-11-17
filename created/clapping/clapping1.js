goog.provide('clapping.Game');

goog.require('clapping.Notice');
goog.require('clapping.Pic');
goog.require('clapping.Unit');
goog.require('goog.Timer');
goog.require('lime.RoundedRect');
goog.require('lime.Sprite');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.Loop');
goog.require('lime.animation.MoveTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.Sequence');
goog.require('lime.animation.Spawn');
goog.require('lime.audio.Audio');
goog.require('lime.fill.LinearGradient');

clapping.Game = function(myMode) {
	lime.Sprite.call(this);

	this.w = 320;
	this.h = 460;
	this.setSize(this.w, this.h).setAnchorPoint(.5, .5);

	var back1 = new lime.fill.LinearGradient().addColorStop(0, '#bbb').addColorStop(1, '#ddd');
	this.setFill(back1);

	var back2 = new lime.RoundedRect().setFill('#fff').setSize(250, 340).setPosition(0, -40);
	this.appendChild(back2);

	var line = new lime.Sprite().setFill('#555').setSize(250, 5).setPosition(0, -40);
	back2.appendChild(line);

	this.unit = [];
	for (var i = 0; i < 6; i++) {
		this.unit[i] = new clapping.Unit(20);
	}

	this.unit[0].lbl.setText('reload');
	this.unit[1].lbl.setText('fire');
	this.unit[2].lbl.setText('defend');
	this.unit[3].lbl.setText('bomb');
	this.unit[4].lbl.setText('disarm');

	this.appendChild(this.unit[0].setPosition(-80, 50));
	this.appendChild(this.unit[1].setPosition(0, 50));
	this.appendChild(this.unit[2].setPosition(80, 50));
	this.appendChild(this.unit[3].setPosition(-80, 100));
	this.appendChild(this.unit[4].setPosition(80, 100));

	this.unit[5].lbl.setText('skill').setFontSize(20);

	this.appendChild(this.unit[5].setPosition(0, 100));

	this.lbl1 = new lime.Label().setAnchorPoint(0, 0).setFontSize(25).setPosition(-125, 30).setText(0);
	line.appendChild(this.lbl1);

	this.lbl2 = new lime.Label().setAnchorPoint(1, 1).setFontSize(25).setPosition(125, -30).setText(0);
	line.appendChild(this.lbl2);

	this.myReloadPic = new clapping.Pic().reloadPic.setOpacity(0);
	this.myFirePic = new clapping.Pic().firePic.setOpacity(0);
	this.myBombPic = new clapping.Pic().bombPic.setOpacity(0);
	this.myDisarmPic = new clapping.Pic().disarmPic.setOpacity(0);
	this.myDefendPic = new clapping.Pic().defendPic.setOpacity(0);

	this.itsReloadPic = new clapping.Pic().reloadPic.setOpacity(0);
	this.itsFirePic = new clapping.Pic().firePic.setOpacity(0);
	this.itsBombPic = new clapping.Pic().bombPic.setOpacity(0);
	this.itsDisarmPic = new clapping.Pic().disarmPic.setOpacity(0);
	this.itsDefendPic = new clapping.Pic().defendPic.setOpacity(0);

	line.appendChild(this.myReloadPic.setPosition(100, 50));
	line.appendChild(this.myFirePic.setPosition(100, 50));
	line.appendChild(this.myBombPic.setPosition(100, 50));
	line.appendChild(this.myDisarmPic.setPosition(100, 50));
	line.appendChild(this.myDefendPic.setPosition(100, 50));

	line.appendChild(this.itsReloadPic.setPosition(-100, -50));
	line.appendChild(this.itsFirePic.setPosition(-100, -50));
	line.appendChild(this.itsBombPic.setPosition(-100, -50));
	line.appendChild(this.itsDisarmPic.setPosition(-100, -50));
	line.appendChild(this.itsDefendPic.setPosition(-100, -50));

	this.mySniperPic = new clapping.Pic().sniperPic.setOpacity(0);
	this.mySurgeonPic = new clapping.Pic().surgeonPic.setOpacity(0);
	this.myGrenadierPic = new clapping.Pic().grenadierPic.setOpacity(0);
	this.myArmerPic = new clapping.Pic().armerPic.setOpacity(0);

	this.itsSniperPic = new clapping.Pic().sniperPic.setOpacity(0);
	this.itsSurgeonPic = new clapping.Pic().surgeonPic.setOpacity(0);
	this.itsGrenadierPic = new clapping.Pic().grenadierPic.setOpacity(0);
	this.itsArmerPic = new clapping.Pic().armerPic.setOpacity(0);

	line.appendChild(this.mySniperPic.setPosition(100, 50));
	line.appendChild(this.mySurgeonPic.setPosition(100, 50));
	line.appendChild(this.myGrenadierPic.setPosition(100, 50));
	line.appendChild(this.myArmerPic.setPosition(100, 50));

	line.appendChild(this.itsSniperPic.setPosition(-100, -50));
	line.appendChild(this.itsSurgeonPic.setPosition(-100, -50));
	line.appendChild(this.itsGrenadierPic.setPosition(-100, -50));
	line.appendChild(this.itsArmerPic.setPosition(-100, -50));

	this.myHeartPic = [];
	this.itsHeartPic = [];

	this.myHeartPic[0] = new clapping.Pic().heartPic;
	this.myHeartPic[1] = new clapping.Pic().heartPic;
	this.myHeartPic[2] = new clapping.Pic().heartPic;
	this.myHeartPic[3] = new clapping.Pic().heartPic;
	this.myHeartPic[4] = new clapping.Pic().heartPic;

	this.itsHeartPic[0] = new clapping.Pic().heartPic;
	this.itsHeartPic[1] = new clapping.Pic().heartPic;
	this.itsHeartPic[2] = new clapping.Pic().heartPic;
	this.itsHeartPic[3] = new clapping.Pic().heartPic;
	this.itsHeartPic[4] = new clapping.Pic().heartPic;

	line.appendChild(this.myHeartPic[0].setPosition(-115, 65));
	line.appendChild(this.myHeartPic[1].setPosition(-95, 65));
	line.appendChild(this.myHeartPic[2].setPosition(-75, 65));
	line.appendChild(this.myHeartPic[3].setPosition(-55, 65));
	line.appendChild(this.myHeartPic[4].setPosition(-35, 65));

	line.appendChild(this.itsHeartPic[0].setPosition(115, -65));
	line.appendChild(this.itsHeartPic[1].setPosition(95, -65));
	line.appendChild(this.itsHeartPic[2].setPosition(75, -65));
	line.appendChild(this.itsHeartPic[3].setPosition(55, -65));
	line.appendChild(this.itsHeartPic[4].setPosition(35, -65));

	this.mySmogPic = [];
	this.itsSmogPic = [];

	this.mySmogPic[0] = new clapping.Pic().grenadierPic.setSize(20, 20).setOpacity(0);
	this.mySmogPic[1] = new clapping.Pic().grenadierPic.setSize(20, 20).setOpacity(0);
	this.mySmogPic[2] = new clapping.Pic().grenadierPic.setSize(20, 20).setOpacity(0);
	this.mySmogPic[3] = new clapping.Pic().grenadierPic.setSize(20, 20).setOpacity(0);
	this.mySmogPic[4] = new clapping.Pic().grenadierPic.setSize(20, 20).setOpacity(0);

	this.itsSmogPic[0] = new clapping.Pic().grenadierPic.setSize(20, 20).setOpacity(0);
	this.itsSmogPic[1] = new clapping.Pic().grenadierPic.setSize(20, 20).setOpacity(0);
	this.itsSmogPic[2] = new clapping.Pic().grenadierPic.setSize(20, 20).setOpacity(0);
	this.itsSmogPic[3] = new clapping.Pic().grenadierPic.setSize(20, 20).setOpacity(0);
	this.itsSmogPic[4] = new clapping.Pic().grenadierPic.setSize(20, 20).setOpacity(0);

	line.appendChild(this.mySmogPic[0].setPosition(-115, 85));
	line.appendChild(this.mySmogPic[1].setPosition(-95, 85));
	line.appendChild(this.mySmogPic[2].setPosition(-75, 85));
	line.appendChild(this.mySmogPic[3].setPosition(-55, 85));
	line.appendChild(this.mySmogPic[4].setPosition(-35, 85));

	line.appendChild(this.itsSmogPic[0].setPosition(115, -85));
	line.appendChild(this.itsSmogPic[1].setPosition(95, -85));
	line.appendChild(this.itsSmogPic[2].setPosition(75, -85));
	line.appendChild(this.itsSmogPic[3].setPosition(55, -85));
	line.appendChild(this.itsSmogPic[4].setPosition(35, -85));

	this.myVestPic = new clapping.Pic().armerPic.setSize(20, 20).setOpacity(0);

	this.itsVestPic = new clapping.Pic().armerPic.setSize(20, 20).setOpacity(0);

	line.appendChild(this.myVestPic.setPosition(-115, 85));

	line.appendChild(this.itsVestPic.setPosition(115, -85));

	this.timer = new goog.Timer(1000);
	goog.events.listen(this.timer, 'tick', function() {
		this.round += 1;
		this.timer.stop();
	}, false, this);

	goog.events.listen(this.unit[0], ['mousedown', 'touchstart'], function() {
		if (this.started && !this.timer.enabled && this.myBullet < 8) {
			this.ai();
			this.reload(this.lbl1);
			this.judge('reload');
			this.timer.start();
		}
	}, false, this);
	goog.events.listen(this.unit[1], ['mousedown', 'touchstart'], function() {
		if (this.started && !this.timer.enabled && this.myBullet > 0) {
			this.ai();
			this.fire(this.lbl1);
			this.judge('fire');
			this.timer.start();
		}
	}, false, this);
	goog.events.listen(this.unit[2], ['mousedown', 'touchstart'], function() {
		if (this.started && !this.timer.enabled) {
			this.ai();
			this.defend(this.lbl1);
			this.judge('defend');
			this.timer.start();
		}
	}, false, this);
	goog.events.listen(this.unit[3], ['mousedown', 'touchstart'], function() {
		if (this.started && !this.timer.enabled && this.myBullet >= 5) {
			this.ai();
			this.bomb(this.lbl1);
			this.judge('bomb');
			this.timer.start();
		}
	}, false, this);
	goog.events.listen(this.unit[4], ['mousedown', 'touchstart'], function() {
		if (this.started && !this.timer.enabled) {
			this.ai();
			this.disarm(this.lbl1);
			this.judge('disarm');
			this.timer.start();
		}
	}, false, this);
	goog.events.listen(this.unit[5], ['mousedown', 'touchstart'], function() {
		if (this.started && !this.timer.enabled && this.myBullet >= 5) {
			this.ai();
			if (myMode == 0) {
				this.sniper(this.lbl1);
				this.judge('sniper');
			} else if (myMode == 1) {
				this.surgeon(this.lbl1);
				this.judge('surgeon');
			} else if (myMode == 2) {
				this.grenadier(this.lbl1);
				this.judge('grenadier');
			} else if (myMode == 3) {
				this.armer(this.lbl1);
				this.judge('armer');
			}
			this.timer.start();
		}
	}, false, this);

	this.reloadSound = clapping.reloadSound;
	this.fireSound = clapping.fireSound;
	this.defendSound = clapping.defendSound;
	this.bombSound = clapping.bombSound;
	this.disarmSound = clapping.disarmSound;

	this.sniperSound = clapping.sniperSound;
	this.surgeonSound = clapping.surgeonSound;
	this.grenadierSound = clapping.grenadierSound;
	this.armerSound = clapping.armerSound;

	this.myWinSound = clapping.myWinSound;
	this.itsWinSound = clapping.itsWinSound;

	this.notice = new clapping.Notice().setOpacity(0);
	this.appendChild(this.notice);

	this.started = true;
	this.hint = new lime.RoundedRect().setSize(90, 50).setFill(0, 50, 255);

	if (myMode == 0) {
		this.myModeName = 'Sniper';
	} else if (myMode == 1) {
		this.myModeName = 'Surgeon';
	} else if (myMode == 2) {
		this.myModeName = 'Grenadier';
	} else if (myMode == 3) {
		this.myModeName = 'Armer';
	}
	this.myLbl = new lime.Label().setAnchorPoint(0, 0).setFontSize(20).setPosition(-125, 8).setText(this.myModeName);

	this.itsMode = parseInt(Math.random() * 4);
	if (this.itsMode == 0) {
		this.itsModeName = 'Sniper';
	} else if (this.itsMode == 1) {
		this.itsModeName = 'Surgeon';
	} else if (this.itsMode == 2) {
		this.itsModeName = 'Grenadier';
	} else if (this.itsMode == 3) {
		this.itsModeName = 'Armer';
	}
	this.itsLbl = new lime.Label().setAnchorPoint(1, 1).setFontSize(20).setPosition(125, -8).setText(this.itsModeName);

	this.renew();

	line.appendChild(this.myLbl);
	line.appendChild(this.itsLbl);

	this.hint.runAction(
		new lime.animation.Loop(
			new lime.animation.Sequence(
				new lime.animation.FadeTo(.5).setDuration(.3),
				new lime.animation.FadeTo(1).setDuration(.3)
			)
		)
	);
	this.appendChild(this.hint.setHidden(this.started).setPosition(-100, 160));

	this.button1 = new lime.GlossyButton('REPLAY').setSize(80, 40);
	goog.events.listen(this.button1, ['mousedown', 'touchstart'], function() {
		this.renew(1);
	}, false, this);
	this.appendChild(this.button1.setPosition(-100, 160));

	this.back = new clapping.Back();
	goog.events.listen(this.back.btn, ['mousedown', 'touchstart'], function() {
		if (!clapping.timer.enabled) {
			this.renew();
		}
	}, false, this);
	this.appendChild(this.back.setPosition(100, 160));
};
goog.inherits(clapping.Game, lime.Sprite);

clapping.Game.prototype.renew = function(val) {
	this.unit[0].shelter.setOpacity(.1);
	this.unit[1].shelter.setOpacity(.8);
	this.unit[3].shelter.setOpacity(.8);
	this.unit[5].shelter.setOpacity(.8);

	this.myBullet = 0;
	this.itsBullet = 0;

	this.myHeart = 5;
	this.itsHeart = 5;

	this.mySmog = 0;
	this.itsSmog = 0;

	this.myVest = 0;
	this.itsVest = 0;

	this.myFlag = 0;
	this.itsFlag = 0;

	this.round = 1;

	clapping.myScore = 0;

	this.lbl1.setText(this.myBullet).setFontColor('#000');
	this.lbl2.setText(this.itsBullet).setFontColor('#000');
	this.started = true;
	this.hint.setHidden(this.started);

	if (!val) {
		this.itsMode = parseInt(Math.random() * 4);
	}
	if (this.itsMode == 0) {
		this.itsModeName = 'Sniper';
	} else if (this.itsMode == 1) {
		this.itsModeName = 'Surgeon';
	} else if (this.itsMode == 2) {
		this.itsModeName = 'Grenadier';
	} else if (this.itsMode == 3) {
		this.itsModeName = 'Armer';
	}
	this.itsLbl.setText(this.itsModeName);

	this.timer.stop();
	this.notice.runAction(new lime.animation.FadeTo(0));

	this.myReloadPic.setPosition(100, 50);
	this.myFirePic.setPosition(100, 50);
	this.myBombPic.setPosition(100, 50);
	this.myDisarmPic.setPosition(100, 50);
	this.myDefendPic.setPosition(100, 50);

	this.itsReloadPic.setPosition(-100, -50);
	this.itsFirePic.setPosition(-100, -50);
	this.itsBombPic.setPosition(-100, -50);
	this.itsDisarmPic.setPosition(-100, -50);
	this.itsDefendPic.setPosition(-100, -50);

	this.mySniperPic.setPosition(100, 50);
	this.mySurgeonPic.setPosition(100, 50);
	this.myGrenadierPic.setPosition(100, 50);
	this.myArmerPic.setPosition(100, 50);

	this.itsSniperPic.setPosition(-100, -50);
	this.itsSurgeonPic.setPosition(-100, -50);
	this.itsGrenadierPic.setPosition(-100, -50);
	this.itsArmerPic.setPosition(-100, -50);

	for (var i = 0; i < 5; i++) {
		this.myHeartPic[i].setOpacity(1);
	}

	for (var i = 0; i < 5; i++) {
		this.itsHeartPic[i].setOpacity(1);
	}

	for (var i = 0; i < 5; i++) {
		this.mySmogPic[i].setOpacity(0);
	}

	for (var i = 0; i < 5; i++) {
		this.itsSmogPic[i].setOpacity(0);
	}

	this.myVestPic.setOpacity(0);

	this.itsVestPic.setOpacity(0);
};

clapping.Game.prototype.reload = function(lbl) {
	if (lbl == this.lbl1 && this.myBullet < 8) {
		this.reloadSound.stop();
		this.reloadSound.play();
		this.myBullet += 1;
		this.unit[0].runAction(new lime.animation.Sequence(new lime.animation.ScaleTo(.9).setDuration(.1), new lime.animation.ScaleTo(1).setDuration(.1)));
		lbl.setText(this.myBullet);
		this.myReloadPic.runAction(
			new lime.animation.Sequence(
				new lime.animation.Spawn(
					new lime.animation.MoveTo(80, 50).setEasing(lime.animation.Easing.EASEIN).setDuration(.2),
					new lime.animation.FadeTo(1).setDuration(.2)
				),
				new lime.animation.MoveTo(40, 50).setEasing(lime.animation.Easing.LINEAR).setDuration(.4),
				new lime.animation.Spawn(
					new lime.animation.MoveTo(20, 50).setEasing(lime.animation.Easing.EASEOUT).setDuration(.2),
					new lime.animation.FadeTo(0).setDuration(.2)
				),
				new lime.animation.MoveTo(100, 50).setDuration(.1)
			)
		);
		this.myChosen = 'reload';
	}
	if (lbl == this.lbl2 && this.itsBullet < 8) {
		this.reloadSound.stop();
		this.reloadSound.play();
		this.itsBullet += 1;
		lbl.setText(this.itsBullet);
		this.itsReloadPic.runAction(
			new lime.animation.Sequence(
				new lime.animation.Spawn(
					new lime.animation.MoveTo(-80, -50).setEasing(lime.animation.Easing.EASEIN).setDuration(.2),
					new lime.animation.FadeTo(1).setDuration(.2)
				),
				new lime.animation.MoveTo(-40, -50).setEasing(lime.animation.Easing.LINEAR).setDuration(.4),
				new lime.animation.Spawn(
					new lime.animation.MoveTo(-20, -50).setEasing(lime.animation.Easing.EASEOUT).setDuration(.2),
					new lime.animation.FadeTo(0).setDuration(.2)
				),
				new lime.animation.MoveTo(-100, -50).setDuration(.1)
			)
		);
		this.itsChosen = 'reload';
	}
	this.check(lbl);
};

clapping.Game.prototype.fire = function(lbl) {
	if (lbl == this.lbl1 && this.myBullet > 0) {
		this.fireSound.stop();
		this.fireSound.play();
		this.myBullet -= 1;
		this.unit[1].runAction(new lime.animation.Sequence(new lime.animation.ScaleTo(.9).setDuration(.1), new lime.animation.ScaleTo(1).setDuration(.1)));
		lbl.setText(this.myBullet);
		this.myFirePic.runAction(
			new lime.animation.Sequence(
				new lime.animation.Spawn(
					new lime.animation.MoveTo(80, 50).setEasing(lime.animation.Easing.EASEIN).setDuration(.2),
					new lime.animation.FadeTo(1).setDuration(.2)
				),
				new lime.animation.MoveTo(40, 50).setEasing(lime.animation.Easing.LINEAR).setDuration(.4),
				new lime.animation.Spawn(
					new lime.animation.MoveTo(20, 50).setEasing(lime.animation.Easing.EASEOUT).setDuration(.2),
					new lime.animation.FadeTo(0).setDuration(.2)
				),
				new lime.animation.MoveTo(100, 50).setDuration(.1)
			)
		);
		this.myChosen = 'fire';
	}
	if (lbl == this.lbl2 && this.itsBullet > 0) {
		this.fireSound.stop();
		this.fireSound.play();
		this.itsBullet -= 1;
		lbl.setText(this.itsBullet);
		this.itsFirePic.runAction(
			new lime.animation.Sequence(
				new lime.animation.Spawn(
					new lime.animation.MoveTo(-80, -50).setEasing(lime.animation.Easing.EASEIN).setDuration(.2),
					new lime.animation.FadeTo(1).setDuration(.2)
				),
				new lime.animation.MoveTo(-40, -50).setEasing(lime.animation.Easing.LINEAR).setDuration(.4),
				new lime.animation.Spawn(
					new lime.animation.MoveTo(-20, -50).setEasing(lime.animation.Easing.EASEOUT).setDuration(.2),
					new lime.animation.FadeTo(0).setDuration(.2)
				),
				new lime.animation.MoveTo(-100, -50).setDuration(.1)
			)
		);
		this.itsChosen = 'fire';
	}
	this.check(lbl);
};

clapping.Game.prototype.defend = function(lbl) {
	if (lbl == this.lbl1) {
		this.defendSound.stop();
		this.defendSound.play();
		this.unit[2].runAction(new lime.animation.Sequence(new lime.animation.ScaleTo(.9).setDuration(.1), new lime.animation.ScaleTo(1).setDuration(.1)));
		this.myDefendPic.runAction(
			new lime.animation.Sequence(
				new lime.animation.Spawn(
					new lime.animation.MoveTo(80, 50).setEasing(lime.animation.Easing.EASEIN).setDuration(.2),
					new lime.animation.FadeTo(1).setDuration(.2)
				),
				new lime.animation.MoveTo(40, 50).setEasing(lime.animation.Easing.LINEAR).setDuration(.4),
				new lime.animation.Spawn(
					new lime.animation.MoveTo(20, 50).setEasing(lime.animation.Easing.EASEOUT).setDuration(.2),
					new lime.animation.FadeTo(0).setDuration(.2)
				),
				new lime.animation.MoveTo(100, 50).setDuration(.1)
			)
		);
		this.myChosen = 'defend';
	}
	if (lbl == this.lbl2) {
		this.defendSound.stop();
		this.defendSound.play();
		this.itsDefendPic.runAction(
			new lime.animation.Sequence(
				new lime.animation.Spawn(
					new lime.animation.MoveTo(-80, -50).setEasing(lime.animation.Easing.EASEIN).setDuration(.2),
					new lime.animation.FadeTo(1).setDuration(.2)
				),
				new lime.animation.MoveTo(-40, -50).setEasing(lime.animation.Easing.LINEAR).setDuration(.4),
				new lime.animation.Spawn(
					new lime.animation.MoveTo(-20, -50).setEasing(lime.animation.Easing.EASEOUT).setDuration(.2),
					new lime.animation.FadeTo(0).setDuration(.2)
				),
				new lime.animation.MoveTo(-100, -50).setDuration(.1)
			)
		);
		this.itsChosen = 'defend';
	}
};

clapping.Game.prototype.bomb = function(lbl) {
	if (lbl == this.lbl1 && this.myBullet >= 5) {
		this.bombSound.stop();
		this.bombSound.play();
		this.myBullet -= 5;
		this.unit[3].runAction(new lime.animation.Sequence(new lime.animation.ScaleTo(.9).setDuration(.1), new lime.animation.ScaleTo(1).setDuration(.1)));
		lbl.setText(this.myBullet);
		this.myBombPic.runAction(
			new lime.animation.Sequence(
				new lime.animation.Spawn(
					new lime.animation.MoveTo(80, 50).setEasing(lime.animation.Easing.EASEIN).setDuration(.2),
					new lime.animation.FadeTo(1).setDuration(.2)
				),
				new lime.animation.MoveTo(40, 50).setEasing(lime.animation.Easing.LINEAR).setDuration(.4),
				new lime.animation.Spawn(
					new lime.animation.MoveTo(20, 50).setEasing(lime.animation.Easing.EASEOUT).setDuration(.2),
					new lime.animation.FadeTo(0).setDuration(.2)
				),
				new lime.animation.MoveTo(100, 50).setDuration(.1)
			)
		);
		this.myChosen = 'bomb';
	}
	if (lbl == this.lbl2 && this.itsBullet >= 5) {
		this.bombSound.stop();
		this.bombSound.play();
		this.itsBullet -= 5;
		lbl.setText(this.itsBullet);
		this.itsBombPic.runAction(
			new lime.animation.Sequence(
				new lime.animation.Spawn(
					new lime.animation.MoveTo(-80, -50).setEasing(lime.animation.Easing.EASEIN).setDuration(.2),
					new lime.animation.FadeTo(1).setDuration(.2)
				),
				new lime.animation.MoveTo(-40, -50).setEasing(lime.animation.Easing.LINEAR).setDuration(.4),
				new lime.animation.Spawn(
					new lime.animation.MoveTo(-20, -50).setEasing(lime.animation.Easing.EASEOUT).setDuration(.2),
					new lime.animation.FadeTo(0).setDuration(.2)
				),
				new lime.animation.MoveTo(-100, -50).setDuration(.1)
			)
		);
		this.itsChosen = 'bomb';
	}
	this.check(lbl);
};

clapping.Game.prototype.disarm = function(lbl) {
	if (lbl == this.lbl1) {
		this.disarmSound.stop();
		this.disarmSound.play();
		this.unit[4].runAction(new lime.animation.Sequence(new lime.animation.ScaleTo(.9).setDuration(.1), new lime.animation.ScaleTo(1).setDuration(.1)));
		this.myDisarmPic.runAction(
			new lime.animation.Sequence(
				new lime.animation.Spawn(
					new lime.animation.MoveTo(80, 50).setEasing(lime.animation.Easing.EASEIN).setDuration(.2),
					new lime.animation.FadeTo(1).setDuration(.2)
				),
				new lime.animation.MoveTo(40, 50).setEasing(lime.animation.Easing.LINEAR).setDuration(.4),
				new lime.animation.Spawn(
					new lime.animation.MoveTo(20, 50).setEasing(lime.animation.Easing.EASEOUT).setDuration(.2),
					new lime.animation.FadeTo(0).setDuration(.2)
				),
				new lime.animation.MoveTo(100, 50).setDuration(.1)
			)
		);
		this.myChosen = 'disarm';
	}
	if (lbl == this.lbl2) {
		this.disarmSound.stop();
		this.disarmSound.play();
		this.itsDisarmPic.runAction(
			new lime.animation.Sequence(
				new lime.animation.Spawn(
					new lime.animation.MoveTo(-80, -50).setEasing(lime.animation.Easing.EASEIN).setDuration(.2),
					new lime.animation.FadeTo(1).setDuration(.2)
				),
				new lime.animation.MoveTo(-40, -50).setEasing(lime.animation.Easing.LINEAR).setDuration(.4),
				new lime.animation.Spawn(
					new lime.animation.MoveTo(-20, -50).setEasing(lime.animation.Easing.EASEOUT).setDuration(.2),
					new lime.animation.FadeTo(0).setDuration(.2)
				),
				new lime.animation.MoveTo(-100, -50).setDuration(.1)
			)
		);
		this.itsChosen = 'disarm';
	}
};

clapping.Game.prototype.sniper = function(lbl) {
	if (lbl == this.lbl1 && this.myBullet >= 5) {
		this.sniperSound.stop();
		this.sniperSound.play();
		this.myBullet -= 5;
		this.unit[5].runAction(new lime.animation.Sequence(new lime.animation.ScaleTo(.9).setDuration(.1), new lime.animation.ScaleTo(1).setDuration(.1)));
		lbl.setText(this.myBullet);
		this.mySniperPic.runAction(
			new lime.animation.Sequence(
				new lime.animation.Spawn(
					new lime.animation.MoveTo(80, 50).setEasing(lime.animation.Easing.EASEIN).setDuration(.2),
					new lime.animation.FadeTo(1).setDuration(.2)
				),
				new lime.animation.MoveTo(40, 50).setEasing(lime.animation.Easing.LINEAR).setDuration(.4),
				new lime.animation.Spawn(
					new lime.animation.MoveTo(20, 50).setEasing(lime.animation.Easing.EASEOUT).setDuration(.2),
					new lime.animation.FadeTo(0).setDuration(.2)
				),
				new lime.animation.MoveTo(100, 50).setDuration(.1)
			)
		);
		this.myChosen = 'sniper';
	}
	if (lbl == this.lbl2 && this.itsBullet >= 5) {
		this.sniperSound.stop();
		this.sniperSound.play();
		this.itsBullet -= 5;
		lbl.setText(this.itsBullet);
		this.itsSniperPic.runAction(
			new lime.animation.Sequence(
				new lime.animation.Spawn(
					new lime.animation.MoveTo(-80, -50).setEasing(lime.animation.Easing.EASEIN).setDuration(.2),
					new lime.animation.FadeTo(1).setDuration(.2)
				),
				new lime.animation.MoveTo(-40, -50).setEasing(lime.animation.Easing.LINEAR).setDuration(.4),
				new lime.animation.Spawn(
					new lime.animation.MoveTo(-20, -50).setEasing(lime.animation.Easing.EASEOUT).setDuration(.2),
					new lime.animation.FadeTo(0).setDuration(.2)
				),
				new lime.animation.MoveTo(-100, -50).setDuration(.1)
			)
		);
		this.itsChosen = 'sniper';
	}
	this.check(lbl);
};

clapping.Game.prototype.surgeon = function(lbl) {
	if (lbl == this.lbl1 && this.myBullet >= 5) {
		this.surgeonSound.stop();
		this.surgeonSound.play();
		this.myBullet -= 5;
		this.unit[5].runAction(new lime.animation.Sequence(new lime.animation.ScaleTo(.9).setDuration(.1), new lime.animation.ScaleTo(1).setDuration(.1)));
		lbl.setText(this.myBullet);
		this.mySurgeonPic.runAction(
			new lime.animation.Sequence(
				new lime.animation.Spawn(
					new lime.animation.MoveTo(80, 50).setEasing(lime.animation.Easing.EASEIN).setDuration(.2),
					new lime.animation.FadeTo(1).setDuration(.2)
				),
				new lime.animation.MoveTo(40, 50).setEasing(lime.animation.Easing.LINEAR).setDuration(.4),
				new lime.animation.Spawn(
					new lime.animation.MoveTo(20, 50).setEasing(lime.animation.Easing.EASEOUT).setDuration(.2),
					new lime.animation.FadeTo(0).setDuration(.2)
				),
				new lime.animation.MoveTo(100, 50).setDuration(.1)
			)
		);
		this.myChosen = 'surgeon';
	}
	if (lbl == this.lbl2 && this.itsBullet >= 5) {
		this.surgeonSound.stop();
		this.surgeonSound.play();
		this.itsBullet -= 5;
		lbl.setText(this.itsBullet);
		this.itsSurgeonPic.runAction(
			new lime.animation.Sequence(
				new lime.animation.Spawn(
					new lime.animation.MoveTo(-80, -50).setEasing(lime.animation.Easing.EASEIN).setDuration(.2),
					new lime.animation.FadeTo(1).setDuration(.2)
				),
				new lime.animation.MoveTo(-40, -50).setEasing(lime.animation.Easing.LINEAR).setDuration(.4),
				new lime.animation.Spawn(
					new lime.animation.MoveTo(-20, -50).setEasing(lime.animation.Easing.EASEOUT).setDuration(.2),
					new lime.animation.FadeTo(0).setDuration(.2)
				),
				new lime.animation.MoveTo(-100, -50).setDuration(.1)
			)
		);
		this.itsChosen = 'surgeon';
	}
	this.check(lbl);
};

clapping.Game.prototype.grenadier = function(lbl) {
	if (lbl == this.lbl1 && this.myBullet >= 5) {
		this.grenadierSound.stop();
		this.grenadierSound.play();
		this.myBullet -= 5;
		this.unit[5].runAction(new lime.animation.Sequence(new lime.animation.ScaleTo(.9).setDuration(.1), new lime.animation.ScaleTo(1).setDuration(.1)));
		lbl.setText(this.myBullet);
		this.myGrenadierPic.runAction(
			new lime.animation.Sequence(
				new lime.animation.Spawn(
					new lime.animation.MoveTo(80, 50).setEasing(lime.animation.Easing.EASEIN).setDuration(.2),
					new lime.animation.FadeTo(1).setDuration(.2)
				),
				new lime.animation.MoveTo(40, 50).setEasing(lime.animation.Easing.LINEAR).setDuration(.4),
				new lime.animation.Spawn(
					new lime.animation.MoveTo(20, 50).setEasing(lime.animation.Easing.EASEOUT).setDuration(.2),
					new lime.animation.FadeTo(0).setDuration(.2)
				),
				new lime.animation.MoveTo(100, 50).setDuration(.1)
			)
		);
		this.mySmog = parseInt(Math.random() * 2 + 4);
		this.myFlag = 1;
		this.myChosen = 'grenadier';
	}
	if (lbl == this.lbl2 && this.itsBullet >= 5) {
		this.grenadierSound.stop();
		this.grenadierSound.play();
		this.itsBullet -= 5;
		lbl.setText(this.itsBullet);
		this.itsGrenadierPic.runAction(
			new lime.animation.Sequence(
				new lime.animation.Spawn(
					new lime.animation.MoveTo(-80, -50).setEasing(lime.animation.Easing.EASEIN).setDuration(.2),
					new lime.animation.FadeTo(1).setDuration(.2)
				),
				new lime.animation.MoveTo(-40, -50).setEasing(lime.animation.Easing.LINEAR).setDuration(.4),
				new lime.animation.Spawn(
					new lime.animation.MoveTo(-20, -50).setEasing(lime.animation.Easing.EASEOUT).setDuration(.2),
					new lime.animation.FadeTo(0).setDuration(.2)
				),
				new lime.animation.MoveTo(-100, -50).setDuration(.1)
			)
		);
		this.itsSmog = parseInt(Math.random() * 2 + 4);
		this.itsFlag = 1;
		this.itsChosen = 'grenadier';
	}
	this.check(lbl);
};

clapping.Game.prototype.armer = function(lbl) {
	if (lbl == this.lbl1 && this.myBullet >= 5) {
		this.armerSound.stop();
		this.armerSound.play();
		this.myBullet -= 5;
		this.unit[5].runAction(new lime.animation.Sequence(new lime.animation.ScaleTo(.9).setDuration(.1), new lime.animation.ScaleTo(1).setDuration(.1)));
		lbl.setText(this.myBullet);
		this.myArmerPic.runAction(
			new lime.animation.Sequence(
				new lime.animation.Spawn(
					new lime.animation.MoveTo(80, 50).setEasing(lime.animation.Easing.EASEIN).setDuration(.2),
					new lime.animation.FadeTo(1).setDuration(.2)
				),
				new lime.animation.MoveTo(40, 50).setEasing(lime.animation.Easing.LINEAR).setDuration(.4),
				new lime.animation.Spawn(
					new lime.animation.MoveTo(20, 50).setEasing(lime.animation.Easing.EASEOUT).setDuration(.2),
					new lime.animation.FadeTo(0).setDuration(.2)
				),
				new lime.animation.MoveTo(100, 50).setDuration(.1)
			)
		);
		this.myVest = 1;
		this.myFlag = 1;
		this.myChosen = 'armer';
	}
	if (lbl == this.lbl2 && this.itsBullet >= 5) {
		this.armerSound.stop();
		this.armerSound.play();
		this.itsBullet -= 5;
		lbl.setText(this.itsBullet);
		this.itsArmerPic.runAction(
			new lime.animation.Sequence(
				new lime.animation.Spawn(
					new lime.animation.MoveTo(-80, -50).setEasing(lime.animation.Easing.EASEIN).setDuration(.2),
					new lime.animation.FadeTo(1).setDuration(.2)
				),
				new lime.animation.MoveTo(-40, -50).setEasing(lime.animation.Easing.LINEAR).setDuration(.4),
				new lime.animation.Spawn(
					new lime.animation.MoveTo(-20, -50).setEasing(lime.animation.Easing.EASEOUT).setDuration(.2),
					new lime.animation.FadeTo(0).setDuration(.2)
				),
				new lime.animation.MoveTo(-100, -50).setDuration(.1)
			)
		);
		this.itsVest = 1;
		this.itsFlag = 1;
		this.itsChosen = 'armer';
	}
	this.check(lbl);
};

clapping.Game.prototype.check = function(lbl) {
	if (lbl.getText() >= 5) {
		lbl.setFontColor('#d00');
	} else {
		lbl.setFontColor('#000');
	}

	if (this.myBullet > 0) {
		this.unit[1].shelter.setOpacity(.1);
	} else {
		this.unit[1].shelter.setOpacity(.8);
	}

	if (this.myBullet >= 5) {
		this.unit[3].shelter.setOpacity(.1);
		this.unit[5].shelter.setOpacity(.1);
	} else {
		this.unit[3].shelter.setOpacity(.8);
		this.unit[5].shelter.setOpacity(.8);
	}

	if (this.myBullet < 8) {
		this.unit[0].shelter.setOpacity(.1);
	} else {
		this.unit[0].shelter.setOpacity(.8);
	}
};

clapping.Game.prototype.ai = function() {
	var r = Math.random();

	var reloadVal = Math.pow(1 / 2, this.myBullet * 3 / 7);
	var disarmVal = this.myBullet > 4 ? (2 / 5 + Math.pow(1 / 2, 1 + this.myBullet / 5)) : 1;
	var defendVal = Math.pow(1 / 2, this.myBullet * 2 / 15);
	var fireVal = Math.pow(1 / 2, this.myBullet * 2 / 7);
	var bombVal = .45;

	if (this.itsBullet == 0) {
		if (r < reloadVal) {
			this.reload(this.lbl2);
		} else if (r > disarmVal) {
			//this.disarm(this.lbl2);
			if (!this.itsSmog) {
				this.disarm(this.lbl2);
			} else {
				if (this.itsBullet < 4) {
					this.reload(this.lbl2);
				} else {
					this.fire(this.lbl2);
				}
			}
		} else {
			//this.defend(this.lbl2);
			if (!this.itsSmog) {
				this.defend(this.lbl2);
			} else {
				if (this.itsBullet < 4) {
					this.reload(this.lbl2);
				} else {
					this.fire(this.lbl2);
				}
			}
		}
	} else if (this.itsBullet > 0 && this.itsBullet < 5) {
		if (r < reloadVal) {
			this.reload(this.lbl2);
		} else if (r > disarmVal) {
			//this.disarm(this.lbl2);
			if (!this.itsSmog) {
				this.disarm(this.lbl2);
			} else {
				if (this.itsBullet < 4) {
					this.reload(this.lbl2);
				} else {
					this.fire(this.lbl2);
				}
			}
		} else if (r <= disarmVal && r >= defendVal) {
			//this.defend(this.lbl2);
			if (!this.itsSmog) {
				this.defend(this.lbl2);
			} else {
				if (this.itsBullet < 4) {
					this.reload(this.lbl2);
				} else {
					this.fire(this.lbl2);
				}
			}
		} else {
			if (!this.mySmog) {
				this.fire(this.lbl2);
			} else {
				//this.defend(this.lbl2);
				if (!this.itsSmog) {
					this.defend(this.lbl2);
				} else {
					if (this.itsBullet < 4) {
						this.reload(this.lbl2);
					} else {
						this.fire(this.lbl2);
					}
				}
			}
		}
	} else if (this.itsBullet >= 5 && this.itsBullet < 8) {
		if (r < reloadVal) {
			this.reload(this.lbl2);
		} else if (r > disarmVal) {
			//this.disarm(this.lbl2);
			if (!this.itsSmog) {
				this.disarm(this.lbl2);
			} else {
				if (this.itsBullet < 4) {
					this.reload(this.lbl2);
				} else {
					this.fire(this.lbl2);
				}
			}
		} else if (r <= disarmVal && r >= defendVal) {
			//this.defend(this.lbl2);
			if (!this.itsSmog) {
				this.defend(this.lbl2);
			} else {
				if (this.itsBullet < 4) {
					this.reload(this.lbl2);
				} else {
					this.fire(this.lbl2);
				}
			}
		} else if (r <= fireVal && r >= reloadVal && !this.mySmog) {
			this.fire(this.lbl2);
		} else if (r > fireVal && r <= bombVal && !this.mySmog) {
			this.bomb(this.lbl2);
		} else {
			if (this.itsMode == 0) {
				if (!this.mySmog) {
					this.sniper(this.lbl2);
				} else {
					this.defend(this.lbl2);
				}
			} else if (this.itsMode == 1) {
				if (this.itsHeart < 5) {
					this.surgeon(this.lbl2);
				} else {
					this.defend(this.lbl2);
				}
			} else if (this.itsMode == 2) {
				this.grenadier(this.lbl2);
			} else if (this.itsMode == 3) {
				this.armer(this.lbl2);
			}
		}
	} else if (this.itsBullet == 8) {
		if (r > disarmVal) {
			//this.disarm(this.lbl2);
			if (!this.itsSmog) {
				this.disarm(this.lbl2);
			} else {
				if (this.itsBullet < 4) {
					this.reload(this.lbl2);
				} else {
					this.fire(this.lbl2);
				}
			}
		} else if (r <= disarmVal && r >= defendVal) {
			//this.defend(this.lbl2);
			if (!this.itsSmog) {
				this.defend(this.lbl2);
			} else {
				if (this.itsBullet < 4) {
					this.reload(this.lbl2);
				} else {
					this.fire(this.lbl2);
				}
			}
		} else if (r <= fireVal && !this.mySmog) {
			this.fire(this.lbl2);
		} else if (r > fireVal && r <= bombVal && !this.mySmog) {
			this.bomb(this.lbl2);
		} else {
			if (this.itsMode == 0) {
				if (!this.mySmog) {
					this.sniper(this.lbl2);
				} else {
					this.defend(this.lbl2);
				}
			} else if (this.itsMode == 1) {
				if (this.itsHeart < 5) {
					this.surgeon(this.lbl2);
				} else {
					this.defend(this.lbl2);
				}
			} else if (this.itsMode == 2) {
				this.grenadier(this.lbl2);
			} else if (this.itsMode == 3) {
				this.armer(this.lbl2);
			}
		}
	}
};

clapping.Game.prototype.judge = function(val) {
	var myJudge1 = this.mySmog && !this.myFlag;
	var myJudge2 = this.myVest && !this.myFlag;

	var itsJudge1 = this.itsSmog && !this.itsFlag;
	var itsJudge2 = this.itsVest && !this.itsFlag;

	if (val == 'reload') {
		if (this.itsChosen == 'reload') {
			if (myJudge1) {
				if (itsJudge1) {
					this.manage(1, 1, 0, 0, 0, 0, 10);
				} else if (itsJudge2) {
					this.manage(1, 0, 0, 0, 0, 0, 10);
				} else {
					this.manage(1, 0, 0, 0, 0, 0, 10);
				}
			} else if (myJudge2) {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 10);
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 0, 0, 0, 10);
				} else {
					this.manage(0, 0, 0, 0, 0, 0, 10);
				}
			} else {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 10);
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 0, 0, 0, 10);
				} else {
					this.manage(0, 0, 0, 0, 0, 0, 10);
				}
			}
		} else if (this.itsChosen == 'fire') {
			if (myJudge1) {
				if (itsJudge1) {
					this.manage(1, 1, 0, 0, 0, 0, 10);
				} else if (itsJudge2) {
					this.manage(1, 0, 0, 0, 0, 0, 10);
				} else {
					this.manage(1, 0, 0, 0, 0, 0, 10);
				}
			} else if (myJudge2) {
				if (itsJudge1) {
					this.manage(0, 1, 1, 0, 0, 0, 10);
				} else if (itsJudge2) {
					this.manage(0, 0, 1, 0, 0, 0, 10);
				} else {
					this.manage(0, 0, 1, 0, 0, 0, 10);
				}
			} else {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 1, 0, 10);
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 0, 1, 0, 10);
				} else {
					this.manage(0, 0, 0, 0, 1, 0, 10);
				}
			}
		} else if (this.itsChosen == 'defend') {
			if (myJudge1) {
				if (itsJudge1) {
					this.manage(1, 1, 0, 0, 0, 0, 10);
				} else if (itsJudge2) {
					this.manage(1, 0, 0, 0, 0, 0, 10);
				} else {
					this.manage(1, 0, 0, 0, 0, 0, 10);
				}
			} else if (myJudge2) {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 10);
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 0, 0, 0, 10);
				} else {
					this.manage(0, 0, 0, 0, 0, 0, 10);
				}
			} else {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 10);
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 0, 0, 0, 10);
				} else {
					this.manage(0, 0, 0, 0, 0, 0, 10);
				}
			}
		} else if (this.itsChosen == 'bomb') {
			if (myJudge1) {
				if (itsJudge1) {
					this.manage(1, 1, 0, 0, 0, 0, 10);
				} else if (itsJudge2) {
					this.manage(1, 0, 0, 0, 0, 0, 10);
				} else {
					this.manage(1, 0, 0, 0, 0, 0, 10);
				}
			} else if (myJudge2) {
				if (itsJudge1) {
					this.manage(0, 1, 1, 0, 2, 0, 10);
				} else if (itsJudge2) {
					this.manage(0, 0, 1, 0, 2, 0, 10);
				} else {
					this.manage(0, 0, 1, 0, 2, 0, 10);
				}
			} else {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 3, 0, 10);
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 0, 3, 0, 10);
				} else {
					this.manage(0, 0, 0, 0, 3, 0, 10);
				}
			}
		} else if (this.itsChosen == 'disarm') {
			if (myJudge1) {
				if (itsJudge1) {
					this.manage(1, 1, 0, 0, 0, 0, 10);
				} else if (itsJudge2) {
					this.manage(1, 0, 0, 0, 0, 0, 10);
				} else {
					this.manage(1, 0, 0, 0, 0, 0, 10);
				}
			} else if (myJudge2) {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 10);
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 0, 0, 0, 10);
				} else {
					this.manage(0, 0, 0, 0, 0, 0, 10);
				}
			} else {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 10);
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 0, 0, 0, 10);
				} else {
					this.manage(0, 0, 0, 0, 0, 0, 10);
				}
			}
		} else if (this.itsChosen == 'sniper') {
			if (myJudge1) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
					this.manage(1, 0, 0, 0, 0, 0, 10);
				}
			} else if (myJudge2) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
					this.manage(0, 0, 0, 0, 1, 0, 10);
				}
			} else {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
					this.manage(0, 0, 0, 0, 1, 0, 10);
				}
			}
		} else if (this.itsChosen == 'surgeon') {
			if (myJudge1) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
					this.manage(1, 0, 0, 0, 0, -1, 10);
				}
			} else if (myJudge2) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
					this.manage(0, 0, 0, 0, 0, -1, 10);
				}
			} else {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
					this.manage(0, 0, 0, 0, 0, -1, 10);
				}
			}
		} else if (this.itsChosen == 'grenadier') {
			if (myJudge1) {
				if (itsJudge1) {
					this.manage(1, 1, 0, 0, 0, 0, 10);
				} else if (itsJudge2) {
				} else {
					this.manage(1, 0, 0, 0, 0, 0, 10);
				}
			} else if (myJudge2) {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 10);
				} else if (itsJudge2) {
				} else {
					this.manage(0, 0, 0, 0, 0, 0, 10);
				}
			} else {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 10);
				} else if (itsJudge2) {
				} else {
					this.manage(0, 0, 0, 0, 0, 0, 10);
				}
			}
		} else if (this.itsChosen == 'armer') {
			if (myJudge1) {
				if (itsJudge1) {
				} else if (itsJudge2) {
					this.manage(1, 0, 0, 0, 0, 0, 10);
				} else {
					this.manage(1, 0, 0, 0, 0, 0, 10);
				}
			} else if (myJudge2) {
				if (itsJudge1) {
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 0, 0, 0, 10);
				} else {
					this.manage(0, 0, 0, 0, 0, 0, 10);
				}
			} else {
				if (itsJudge1) {
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 0, 0, 0, 10);
				} else {
					this.manage(0, 0, 0, 0, 0, 0, 10);
				}
			}
		}
	} else if (val == 'fire') {
		if (this.itsChosen == 'reload') {
			if (myJudge1) {
				if (itsJudge1) {
					this.manage(1, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
					this.manage(1, 0, 0, 1, 0, 0, 0);
				} else {
					this.manage(1, 0, 0, 0, 0, 1, 100);
				}
			} else if (myJudge2) {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 1, 0, 0, 0);
				} else {
					this.manage(0, 0, 0, 0, 0, 1, 100);
				}
			} else {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 1, 0, 0, 0);
				} else {
					this.manage(0, 0, 0, 0, 0, 1, 100);
				}
			}
		} else if (this.itsChosen == 'fire') {
			if (myJudge1) {
				if (itsJudge1) {
					this.manage(1, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
					this.manage(1, 0, 0, 1, 0, 0, 0);
				} else {
					this.manage(1, 0, 0, 0, 0, 1, 100);
				}
			} else if (myJudge2) {
				if (itsJudge1) {
					this.manage(0, 1, 1, 0, 0, 0, 0);
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 0, 0, 0, 50);
				} else {
					this.manage(0, 0, 0, 0, 0, 0, 50);
				}
			} else {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 1, 0, 0);
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 0, 0, 0, 50);
				} else {
					this.manage(0, 0, 0, 0, 0, 0, 50);
				}
			}
		} else if (this.itsChosen == 'defend') {
			if (myJudge1) {
				if (itsJudge1) {
					this.manage(1, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
					this.manage(1, 0, 0, 0, 0, 0, 0);
				} else {
					this.manage(1, 0, 0, 0, 0, 0, 0);
				}
			} else if (myJudge2) {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
				} else {
				}
			} else {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
				} else {
				}
			}
		} else if (this.itsChosen == 'bomb') {
			if (myJudge1) {
				if (itsJudge1) {
					this.manage(1, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
					this.manage(1, 0, 0, 1, 0, 0, 0);
				} else {
					this.manage(1, 0, 0, 0, 0, 1, 100);
				}
			} else if (myJudge2) {
				if (itsJudge1) {
					this.manage(0, 1, 1, 0, 2, 0, 0);
				} else if (itsJudge2) {
					this.manage(0, 0, 1, 0, 2, 0, 0);
				} else {
					this.manage(0, 0, 1, 0, 2, 0, 0);
				}
			} else {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 3, 0, 0);
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 0, 3, 0, 0);
				} else {
					this.manage(0, 0, 0, 0, 3, 0, 0);
				}
			}
		} else if (this.itsChosen == 'disarm') {
			if (myJudge1) {
				if (itsJudge1) {
					this.manage(1, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
					this.manage(1, 0, 0, 1, 0, 0, 0);
				} else {
					this.manage(1, 0, 0, 0, 0, 1, 100);
				}
			} else if (myJudge2) {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 1, 0, 0, 0);
				} else {
					this.manage(0, 0, 0, 0, 0, 1, 100);
				}
			} else {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 1, 0, 0, 0);
				} else {
					this.manage(0, 0, 0, 0, 0, 1, 100);
				}
			}
		} else if (this.itsChosen == 'sniper') {
			if (myJudge1) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
					this.manage(1, 0, 0, 0, 0, 1, 100);
				}
			} else if (myJudge2) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
					this.manage(0, 0, 0, 0, 1, 0, 0);
				}
			} else {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
					this.manage(0, 0, 0, 0, 1, 0, 0);
				}
			}
		} else if (this.itsChosen == 'surgeon') {
			if (myJudge1) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
					this.manage(1, 0, 0, 0, 0, 0, 0);
				}
			} else if (myJudge2) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			}
		} else if (this.itsChosen == 'grenadier') {
			if (myJudge1) {
				if (itsJudge1) {
					this.manage(1, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
				} else {
					this.manage(1, 0, 0, 0, 0, 1, 100);
				}
			} else if (myJudge2) {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
				} else {
					this.manage(0, 0, 0, 0, 0, 1, 100);
				}
			} else {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
				} else {
					this.manage(0, 0, 0, 0, 0, 1, 100);
				}
			}
		} else if (this.itsChosen == 'armer') {
			if (myJudge1) {
				if (itsJudge1) {
				} else if (itsJudge2) {
					this.manage(1, 0, 0, 1, 0, 0, 0);
				} else {
					this.manage(1, 0, 0, 0, 0, 1, 100);
				}
			} else if (myJudge2) {
				if (itsJudge1) {
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 1, 0, 0, 0);
				} else {
					this.manage(0, 0, 0, 0, 0, 1, 100);
				}
			} else {
				if (itsJudge1) {
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 1, 0, 0, 0);
				} else {
					this.manage(0, 0, 0, 0, 0, 1, 100);
				}
			}
		}
	} else if (val == 'defend') {
		if (this.itsChosen == 'reload') {
			if (myJudge1) {
				if (itsJudge1) {
					this.manage(1, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
					this.manage(1, 0, 0, 0, 0, 0, 0);
				} else {
					this.manage(1, 0, 0, 0, 0, 0, 0);
				}
			} else if (myJudge2) {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
				} else {
				}
			} else {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
				} else {
				}
			}
		} else if (this.itsChosen == 'fire') {
			if (myJudge1) {
				if (itsJudge1) {
					this.manage(1, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
					this.manage(1, 0, 0, 0, 0, 0, 0);
				} else {
					this.manage(1, 0, 0, 0, 0, 0, 0);
				}
			} else if (myJudge2) {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 90);
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 0, 0, 0, 90);
				} else {
					this.manage(0, 0, 0, 0, 0, 0, 90);
				}
			} else {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 90);
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 0, 0, 0, 90);
				} else {
					this.manage(0, 0, 0, 0, 0, 0, 90);
				}
			}
		} else if (this.itsChosen == 'defend') {
			if (myJudge1) {
				if (itsJudge1) {
					this.manage(1, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
					this.manage(1, 0, 0, 0, 0, 0, 0);
				} else {
					this.manage(1, 0, 0, 0, 0, 0, 0);
				}
			} else if (myJudge2) {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
				} else {
				}
			} else {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
				} else {
				}
			}
		} else if (this.itsChosen == 'bomb') {
			if (myJudge1) {
				if (itsJudge1) {
					this.manage(1, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
					this.manage(1, 0, 0, 0, 0, 0, 0);
				} else {
					this.manage(1, 0, 0, 0, 0, 0, 0);
				}
			} else if (myJudge2) {
				if (itsJudge1) {
					this.manage(0, 1, 1, 0, 2, 0, 0);
				} else if (itsJudge2) {
					this.manage(0, 0, 1, 0, 2, 0, 0);
				} else {
					this.manage(0, 0, 1, 0, 2, 0, 0);
				}
			} else {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 3, 0, 0);
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 0, 3, 0, 0);
				} else {
					this.manage(0, 0, 0, 0, 3, 0, 0);
				}
			}
		} else if (this.itsChosen == 'disarm') {
			if (myJudge1) {
				if (itsJudge1) {
					this.manage(1, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
					this.manage(1, 0, 0, 0, 0, 0, 0);
				} else {
					this.manage(1, 0, 0, 0, 0, 0, 0);
				}
			} else if (myJudge2) {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
				} else {
				}
			} else {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
				} else {
				}
			}
		} else if (this.itsChosen == 'sniper') {
			if (myJudge1) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
					this.manage(1, 0, 0, 0, 0, 0, 0);
				}
			} else if (myJudge2) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
					this.manage(0, 0, 0, 0, 1, 0, 0);
				}
			} else {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
					this.manage(0, 0, 0, 0, 1, 0, 0);
				}
			}
		} else if (this.itsChosen == 'surgeon') {
			if (myJudge1) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
					this.manage(1, 0, 0, 0, 0, -1, 0);
				}
			} else if (myJudge2) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
					this.manage(0, 0, 0, 0, 0, -1, 0);
				}
			} else {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
					this.manage(0, 0, 0, 0, 0, -1, 0);
				}
			}
		} else if (this.itsChosen == 'grenadier') {
			if (myJudge1) {
				if (itsJudge1) {
					this.manage(1, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
				} else {
					this.manage(1, 0, 0, 0, 0, 0, 0);
				}
			} else if (myJudge2) {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
				} else {
				}
			} else {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
				} else {
				}
			}
		} else if (this.itsChosen == 'armer') {
			if (myJudge1) {
				if (itsJudge1) {
				} else if (itsJudge2) {
					this.manage(1, 0, 0, 0, 0, 0, 0);
				} else {
					this.manage(1, 0, 0, 0, 0, 0, 0);
				}
			} else if (myJudge2) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			}
		}
	} else if (val == 'bomb') {
		if (this.itsChosen == 'reload') {
			if (myJudge1) {
				if (itsJudge1) {
					this.manage(1, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
					this.manage(1, 0, 0, 1, 0, 2, 500);
				} else {
					this.manage(1, 0, 0, 0, 0, 3, 1000);
				}
			} else if (myJudge2) {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 1, 0, 2, 500);
				} else {
					this.manage(0, 0, 0, 0, 0, 3, 1000);
				}
			} else {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 1, 0, 2, 500);
				} else {
					this.manage(0, 0, 0, 0, 0, 3, 1000);
				}
			}
		} else if (this.itsChosen == 'fire') {
			if (myJudge1) {
				if (itsJudge1) {
					this.manage(1, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
					this.manage(1, 0, 0, 1, 0, 2, 500);
				} else {
					this.manage(1, 0, 0, 0, 0, 3, 1000);
				}
			} else if (myJudge2) {
				if (itsJudge1) {
					this.manage(0, 1, 1, 0, 0, 0, 0);
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 1, 0, 2, 500);
				} else {
					this.manage(0, 0, 0, 0, 0, 3, 1000);
				}
			} else {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 1, 0, 0);
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 1, 0, 2, 500);
				} else {
					this.manage(0, 0, 0, 0, 0, 3, 1000);
				}
			}
		} else if (this.itsChosen == 'defend') {
			if (myJudge1) {
				if (itsJudge1) {
					this.manage(1, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
					this.manage(1, 0, 0, 1, 0, 2, 500);
				} else {
					this.manage(1, 0, 0, 0, 0, 3, 1000);
				}
			} else if (myJudge2) {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 1, 0, 2, 500);
				} else {
					this.manage(0, 0, 0, 0, 0, 3, 1000);
				}
			} else {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 1, 0, 2, 500);
				} else {
					this.manage(0, 0, 0, 0, 0, 3, 1000);
				}
			}
		} else if (this.itsChosen == 'bomb') {
			if (myJudge1) {
				if (itsJudge1) {
					this.manage(1, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
					this.manage(1, 0, 0, 1, 0, 2, 500);
				} else {
					this.manage(1, 0, 0, 0, 0, 3, 1000);
				}
			} else if (myJudge2) {
				if (itsJudge1) {
					this.manage(0, 1, 1, 0, 2, 0, 0);
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 0, 0, 0, 500);
				} else {
					this.manage(0, 0, 0, 0, 0, 0, 500);
				}
			} else {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 3, 0, 0);
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 0, 0, 0, 500);
				} else {
					this.manage(0, 0, 0, 0, 0, 0, 500);
				}
			}
		} else if (this.itsChosen == 'disarm') {
			if (myJudge1) {
				if (itsJudge1) {
					this.manage(1, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
					this.manage(1, 0, 0, 0, 0, 0, 0);
				} else {
					this.manage(1, 0, 0, 0, 0, 0, 0);
				}
			} else if (myJudge2) {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
				} else {
				}
			} else {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
				} else {
				}
			}
		} else if (this.itsChosen == 'sniper') {
			if (myJudge1) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
					this.manage(1, 0, 0, 0, 0, 3, 1000);
				}
			} else if (myJudge2) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			}
		} else if (this.itsChosen == 'surgeon') {
			if (myJudge1) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
					this.manage(1, 0, 0, 0, 0, 2, 0);
				}
			} else if (myJudge2) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
					this.manage(0, 0, 0, 0, 0, 2, 0);
				}
			} else {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
					this.manage(0, 0, 0, 0, 0, 2, 0);
				}
			}
		} else if (this.itsChosen == 'grenadier') {
			if (myJudge1) {
				if (itsJudge1) {
					this.manage(1, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
				} else {
					this.manage(1, 0, 0, 0, 0, 3, 1000);
				}
			} else if (myJudge2) {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
				} else {
					this.manage(0, 0, 0, 0, 0, 3, 1000);
				}
			} else {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
				} else {
					this.manage(0, 0, 0, 0, 0, 1, 1000);
				}
			}
		} else if (this.itsChosen == 'armer') {
			if (myJudge1) {
				if (itsJudge1) {
				} else if (itsJudge2) {
					this.manage(1, 0, 0, 1, 0, 2, 500);
				} else {
					this.manage(1, 0, 0, 0, 0, 3, 1000);
				}
			} else if (myJudge2) {
				if (itsJudge1) {
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 1, 0, 2, 500);
				} else {
					this.manage(0, 0, 0, 0, 0, 3, 1000);
				}
			} else {
				if (itsJudge1) {
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 1, 0, 2, 500);
				} else {
					this.manage(0, 0, 0, 0, 0, 3, 1000);
				}
			}
		}
	} else if (val == 'disarm') {
		if (this.itsChosen == 'reload') {
			if (myJudge1) {
				if (itsJudge1) {
					this.manage(1, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
					this.manage(1, 0, 0, 0, 0, 0, 0);
				} else {
					this.manage(1, 0, 0, 0, 0, 0, 0);
				}
			} else if (myJudge2) {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
				} else {
				}
			} else {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
				} else {
				}
			}
		} else if (this.itsChosen == 'fire') {
			if (myJudge1) {
				if (itsJudge1) {
					this.manage(1, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
					this.manage(1, 0, 0, 0, 0, 0, 0);
				} else {
					this.manage(1, 0, 0, 0, 0, 0, 0);
				}
			} else if (myJudge2) {
				if (itsJudge1) {
					this.manage(0, 1, 1, 0, 0, 0, 0);
				} else if (itsJudge2) {
					this.manage(0, 0, 1, 0, 0, 0, 0);
				} else {
					this.manage(0, 0, 1, 0, 0, 0, 0);
				}
			} else {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 1, 0, 0);
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 0, 1, 0, 0);
				} else {
					this.manage(0, 0, 0, 0, 1, 0, 0);
				}
			}
		} else if (this.itsChosen == 'defend') {
			if (myJudge1) {
				if (itsJudge1) {
					this.manage(1, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
					this.manage(1, 0, 0, 0, 0, 0, 0);
				} else {
					this.manage(1, 0, 0, 0, 0, 0, 0);
				}
			} else if (myJudge2) {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
				} else {
				}
			} else {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
				} else {
				}
			}
		} else if (this.itsChosen == 'bomb') {
			if (myJudge1) {
				if (itsJudge1) {
					this.manage(1, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
					this.manage(1, 0, 0, 0, 0, 0, 0);
				} else {
					this.manage(1, 0, 0, 0, 0, 0, 0);
				}
			} else if (myJudge2) {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 900);
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 0, 0, 0, 900);
				} else {
					this.manage(0, 0, 0, 0, 0, 0, 900);
				}
			} else {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 900);
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 0, 0, 0, 900);
				} else {
					this.manage(0, 0, 0, 0, 0, 0, 900);
				}
			}
		} else if (this.itsChosen == 'disarm') {
			if (myJudge1) {
				if (itsJudge1) {
					this.manage(1, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
					this.manage(1, 0, 0, 0, 0, 0, 0);
				} else {
					this.manage(1, 0, 0, 0, 0, 0, 0);
				}
			} else if (myJudge2) {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
				} else {
				}
			} else {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
				} else {
				}
			}
		} else if (this.itsChosen == 'sniper') {
			if (myJudge1) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
					this.manage(1, 0, 0, 0, 0, 0, 0);
				}
			} else if (myJudge2) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
					this.manage(0, 0, 0, 0, 1, 0, 0);
				}
			} else {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
					this.manage(0, 0, 0, 0, 1, 0, 0);
				}
			}
		} else if (this.itsChosen == 'surgeon') {
			if (myJudge1) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
					this.manage(1, 0, 0, 0, 0, -1, 0);
				}
			} else if (myJudge2) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
					this.manage(0, 0, 0, 0, 0, -1, 0);
				}
			} else {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
					this.manage(0, 0, 0, 0, 0, -1, 0);
				}
			}
		} else if (this.itsChosen == 'grenadier') {
			if (myJudge1) {
				if (itsJudge1) {
					this.manage(1, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
				} else {
					this.manage(1, 0, 0, 0, 0, 0, 0);
				}
			} else if (myJudge2) {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
				} else {
				}
			} else {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
				} else {
				}
			}
		} else if (this.itsChosen == 'armer') {
			if (myJudge1) {
				if (itsJudge1) {
				} else if (itsJudge2) {
					this.manage(1, 0, 0, 0, 0, 0, 0);
				} else {
					this.manage(1, 0, 0, 0, 0, 0, 0);
				}
			} else if (myJudge2) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			}
		}
	} else if (val == 'sniper') {
		if (this.itsChosen == 'reload') {
			if (myJudge1) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else if (myJudge2) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 0, 0, 1, 500);
				} else {
					this.manage(0, 0, 0, 0, 0, 1, 500);
				}
			}
		} else if (this.itsChosen == 'fire') {
			if (myJudge1) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else if (myJudge2) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 1, 0, 0);
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 0, 0, 1, 500);
				} else {
					this.manage(0, 0, 0, 0, 0, 1, 500);
				}
			}
		} else if (this.itsChosen == 'defend') {
			if (myJudge1) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else if (myJudge2) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 0, 0, 1, 500);
				} else {
					this.manage(0, 0, 0, 0, 0, 1, 500);
				}
			}
		} else if (this.itsChosen == 'bomb') {
			if (myJudge1) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else if (myJudge2) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 3, 0, 0);
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 0, 0, 0, 500);
				} else {
					this.manage(0, 0, 0, 0, 0, 0, 500);
				}
			}
		} else if (this.itsChosen == 'disarm') {
			if (myJudge1) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else if (myJudge2) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 0, 0, 1, 500);
				} else {
					this.manage(0, 0, 0, 0, 0, 1, 500);
				}
			}
		} else if (this.itsChosen == 'sniper') {
			if (myJudge1) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else if (myJudge2) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
					this.manage(0, 0, 0, 0, 0, 0, 250);
				}
			}
		} else if (this.itsChosen == 'surgeon') {
			if (myJudge1) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else if (myJudge2) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
					this.manage(0, 0, 0, 0, 0, 0, 500);
				}
			}
		} else if (this.itsChosen == 'grenadier') {
			if (myJudge1) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else if (myJudge2) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 0);
				} else if (itsJudge2) {
				} else {
					this.manage(0, 0, 0, 0, 0, 1, 500);
				}
			}
		} else if (this.itsChosen == 'armer') {
			if (myJudge1) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else if (myJudge2) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else {
				if (itsJudge1) {
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 0, 0, 1, 500);
				} else {
					this.manage(0, 0, 0, 0, 0, 1, 500);
				}
			}
		}
	} else if (val == 'surgeon') {
		if (this.itsChosen == 'reload') {
			if (myJudge1) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else if (myJudge2) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, -1, 0, 400);
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 0, -1, 0, 400);
				} else {
					this.manage(0, 0, 0, 0, -1, 0, 400);
				}
			}
		} else if (this.itsChosen == 'fire') {
			if (myJudge1) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else if (myJudge2) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 400);
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 0, 0, 0, 400);
				} else {
					this.manage(0, 0, 0, 0, 0, 0, 400);
				}
			}
		} else if (this.itsChosen == 'defend') {
			if (myJudge1) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else if (myJudge2) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, -1, 0, 400);
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 0, -1, 0, 400);
				} else {
					this.manage(0, 0, 0, 0, -1, 0, 400);
				}
			}
		} else if (this.itsChosen == 'bomb') {
			if (myJudge1) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else if (myJudge2) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 2, 0, 400);
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 0, 2, 0, 400);
				} else {
					this.manage(0, 0, 0, 0, 2, 0, 400);
				}
			}
		} else if (this.itsChosen == 'disarm') {
			if (myJudge1) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else if (myJudge2) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, -1, 0, 400);
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 0, -1, 0, 400);
				} else {
					this.manage(0, 0, 0, 0, -1, 0, 400);
				}
			}
		} else if (this.itsChosen == 'sniper') {
			if (myJudge1) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else if (myJudge2) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
					this.manage(0, 0, 0, 0, 0, 0, 400);
				}
			}
		} else if (this.itsChosen == 'surgeon') {
			if (myJudge1) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else if (myJudge2) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
					this.manage(0, 0, 0, 0, -1, -1, 400);
				}
			}
		} else if (this.itsChosen == 'grenadier') {
			if (myJudge1) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else if (myJudge2) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, -1, 0, 400);
				} else if (itsJudge2) {
				} else {
					this.manage(0, 0, 0, 0, -1, 0, 400);
				}
			}
		} else if (this.itsChosen == 'armer') {
			if (myJudge1) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else if (myJudge2) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else {
				if (itsJudge1) {
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 0, -1, 0, 400);
				} else {
					this.manage(0, 0, 0, 0, -1, 0, 400);
				}
			}
		}
	} else if (val == 'grenadier') {
		if (this.itsChosen == 'reload') {
			if (myJudge1) {
				if (itsJudge1) {
					this.manage(1, 1, 0, 0, 0, 0, 400);
				} else if (itsJudge2) {
					this.manage(1, 0, 0, 0, 0, 0, 400);
				} else {
					this.manage(1, 0, 0, 0, 0, 0, 400);
				}
			} else if (myJudge2) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 400);
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 0, 0, 0, 400);
				} else {
					this.manage(0, 0, 0, 0, 0, 0, 400);
				}
			}
		} else if (this.itsChosen == 'fire') {
			if (myJudge1) {
				if (itsJudge1) {
					this.manage(1, 1, 0, 0, 0, 0, 400);
				} else if (itsJudge2) {
					this.manage(1, 0, 0, 0, 0, 0, 400);
				} else {
					this.manage(1, 0, 0, 0, 0, 0, 400);
				}
			} else if (myJudge2) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 1, 0, 400);
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 0, 1, 0, 400);
				} else {
					this.manage(0, 0, 0, 0, 1, 0, 400);
				}
			}
		} else if (this.itsChosen == 'defend') {
			if (myJudge1) {
				if (itsJudge1) {
					this.manage(1, 1, 0, 0, 0, 0, 400);
				} else if (itsJudge2) {
					this.manage(1, 0, 0, 0, 0, 0, 400);
				} else {
					this.manage(1, 0, 0, 0, 0, 0, 400);
				}
			} else if (myJudge2) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 400);
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 0, 0, 0, 400);
				} else {
					this.manage(0, 0, 0, 0, 0, 0, 400);
				}
			}
		} else if (this.itsChosen == 'bomb') {
			if (myJudge1) {
				if (itsJudge1) {
					this.manage(1, 1, 0, 0, 0, 0, 400);
				} else if (itsJudge2) {
					this.manage(1, 0, 0, 0, 0, 0, 400);
				} else {
					this.manage(1, 0, 0, 0, 0, 0, 400);
				}
			} else if (myJudge2) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 3, 0, 400);
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 0, 3, 0, 400);
				} else {
					this.manage(0, 0, 0, 0, 3, 0, 400);
				}
			}
		} else if (this.itsChosen == 'disarm') {
			if (myJudge1) {
				if (itsJudge1) {
					this.manage(1, 1, 0, 0, 0, 0, 400);
				} else if (itsJudge2) {
					this.manage(1, 0, 0, 0, 0, 0, 400);
				} else {
					this.manage(1, 0, 0, 0, 0, 0, 400);
				}
			} else if (myJudge2) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 400);
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 0, 0, 0, 400);
				} else {
					this.manage(0, 0, 0, 0, 0, 0, 400);
				}
			}
		} else if (this.itsChosen == 'sniper') {
			if (myJudge1) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
					this.manage(1, 0, 0, 0, 0, 0, 400);
				}
			} else if (myJudge2) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
					this.manage(0, 0, 0, 0, 1, 0, 400);
				}
			}
		} else if (this.itsChosen == 'surgeon') {
			if (myJudge1) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
					this.manage(1, 0, 0, 0, 0, -1, 400);
				}
			} else if (myJudge2) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
					this.manage(0, 0, 0, 0, 0, -1, 400);
				}
			}
		} else if (this.itsChosen == 'grenadier') {
			if (myJudge1) {
				if (itsJudge1) {
					this.manage(1, 1, 0, 0, 0, 0, 400);
				} else if (itsJudge2) {
				} else {
					this.manage(1, 0, 0, 0, 0, 0, 400);
				}
			} else if (myJudge2) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 400);
				} else if (itsJudge2) {
				} else {
					this.manage(0, 0, 0, 0, 0, 0, 400);
				}
			}
		} else if (this.itsChosen == 'armer') {
			if (myJudge1) {
				if (itsJudge1) {
				} else if (itsJudge2) {
					this.manage(1, 0, 0, 0, 0, 0, 400);
				} else {
					this.manage(1, 0, 0, 0, 0, 0, 400);
				}
			} else if (myJudge2) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else {
				if (itsJudge1) {
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 0, 0, 0, 400);
				} else {
					this.manage(0, 0, 0, 0, 0, 0, 400);
				}
			}
		}
	} else if (val == 'armer') {
		if (this.itsChosen == 'reload') {
			if (myJudge1) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else if (myJudge2) {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 400);
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 0, 0, 0, 400);
				} else {
					this.manage(0, 0, 0, 0, 0, 0, 400);
				}
			} else {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 400);
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 0, 0, 0, 400);
				} else {
					this.manage(0, 0, 0, 0, 0, 0, 400);
				}
			}
		} else if (this.itsChosen == 'fire') {
			if (myJudge1) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else if (myJudge2) {
				if (itsJudge1) {
					this.manage(0, 1, 1, 0, 0, 0, 400);
				} else if (itsJudge2) {
					this.manage(0, 0, 1, 0, 0, 0, 400);
				} else {
					this.manage(0, 0, 1, 0, 0, 0, 400);
				}
			} else {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 1, 0, 400);
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 0, 1, 0, 400);
				} else {
					this.manage(0, 0, 0, 0, 1, 0, 400);
				}
			}
		} else if (this.itsChosen == 'defend') {
			if (myJudge1) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else if (myJudge2) {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 400);
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 0, 0, 0, 400);
				} else {
					this.manage(0, 0, 0, 0, 0, 0, 400);
				}
			} else {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 400);
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 0, 0, 0, 400);
				} else {
					this.manage(0, 0, 0, 0, 0, 0, 400);
				}
			}
		} else if (this.itsChosen == 'bomb') {
			if (myJudge1) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else if (myJudge2) {
				if (itsJudge1) {
					this.manage(0, 1, 1, 0, 2, 0, 400);
				} else if (itsJudge2) {
					this.manage(0, 0, 1, 0, 2, 0, 400);
				} else {
					this.manage(0, 0, 1, 0, 2, 0, 400);
				}
			} else {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 3, 0, 400);
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 0, 3, 0, 400);
				} else {
					this.manage(0, 0, 0, 0, 3, 0, 400);
				}
			}
		} else if (this.itsChosen == 'disarm') {
			if (myJudge1) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else if (myJudge2) {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 400);
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 0, 0, 0, 400);
				} else {
					this.manage(0, 0, 0, 0, 0, 0, 400);
				}
			} else {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 400);
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 0, 0, 0, 400);
				} else {
					this.manage(0, 0, 0, 0, 0, 0, 400);
				}
			}
		} else if (this.itsChosen == 'sniper') {
			if (myJudge1) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else if (myJudge2) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
					this.manage(0, 0, 0, 0, 1, 0, 400);
				}
			} else {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
					this.manage(0, 0, 0, 0, 1, 0, 400);
				}
			}
		} else if (this.itsChosen == 'surgeon') {
			if (myJudge1) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else if (myJudge2) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
					this.manage(0, 0, 0, 0, 0, -1, 400);
				}
			} else {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
					this.manage(0, 0, 0, 0, 0, -1, 400);
				}
			}
		} else if (this.itsChosen == 'grenadier') {
			if (myJudge1) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else if (myJudge2) {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 400);
				} else if (itsJudge2) {
				} else {
					this.manage(0, 0, 0, 0, 0, 0, 400);
				}
			} else {
				if (itsJudge1) {
					this.manage(0, 1, 0, 0, 0, 0, 400);
				} else if (itsJudge2) {
				} else {
					this.manage(0, 0, 0, 0, 0, 0, 400);
				}
			}
		} else if (this.itsChosen == 'armer') {
			if (myJudge1) {
				if (itsJudge1) {
				} else if (itsJudge2) {
				} else {
				}
			} else if (myJudge2) {
				if (itsJudge1) {
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 0, 0, 0, 400);
				} else {
					this.manage(0, 0, 0, 0, 0, 0, 400);
				}
			} else {
				if (itsJudge1) {
				} else if (itsJudge2) {
					this.manage(0, 0, 0, 0, 0, 0, 400);
				} else {
					this.manage(0, 0, 0, 0, 0, 0, 400);
				}
			}
		}
	}
	this.endRound();
};

clapping.Game.prototype.manage = function(ms, is, mv, iv, mh, ih, s) {
	this.mySmog -= ms;
	this.itsSmog -= is;
	this.myVest -= mv;
	this.itsVest -= iv;
	this.myHeart -= mh;
	this.itsHeart -= ih;
	clapping.myScore += s;
};

clapping.Game.prototype.endRound = function() {
	this.myHeart = this.myHeart > 5 ? 5 : this.myHeart;
	this.itsHeart = this.itsHeart > 5 ? 5 : this.itsHeart;

	for (var i = (this.myHeart < 0 ? 0 : this.myHeart); i < 5; i++) {
		this.myHeartPic[i].setOpacity(.1);
	}
	for (var i = 0; i < (this.myHeart > 5 ? 5 : this.myHeart); i++) {
		this.myHeartPic[i].setOpacity(1);
	}

	for (var i = (this.itsHeart < 0 ? 0 : this.itsHeart); i < 5; i++) {
		this.itsHeartPic[i].setOpacity(.1);
	}
	for (var i = 0; i < (this.itsHeart > 5 ? 5 : this.itsHeart); i++) {
		this.itsHeartPic[i].setOpacity(1);
	}

	for (var i = (this.mySmog < 0 ? 0 : this.mySmog); i < 5; i++) {
		this.mySmogPic[i].setOpacity(0);
	}
	for (var i = 0; i < (this.mySmog > 5 ? 5 : this.mySmog); i++) {
		this.mySmogPic[i].setOpacity(1);
	}

	for (var i = (this.itsSmog < 0 ? 0 : this.itsSmog); i < 5; i++) {
		this.itsSmogPic[i].setOpacity(0);
	}
	for (var i = 0; i < (this.itsSmog > 5 ? 5 : this.itsSmog); i++) {
		this.itsSmogPic[i].setOpacity(1);
	}

	this.myVestPic.setOpacity(this.myVest);

	this.itsVestPic.setOpacity(this.itsVest);

	this.myFlag = 0;
	this.itsFlag = 0;

	if (this.itsHeart <= 0) {
		this.endGame('my');
	}

	if (this.myHeart <= 0) {
		this.endGame('its');
	}
};

clapping.Game.prototype.endGame = function(val) {
	if (val == 'my') {
		this.myWinSound.stop();
		this.myWinSound.play();
		this.notice.lbl1.setText('You win!');
		clapping.myScore += 2000 - this.round;
	} else if (val == 'its') {
		this.itsWinSound.stop();
		this.itsWinSound.play();
		clapping.myScore -= this.round;
		this.notice.lbl1.setText('You lose!');
	}
	clapping.myScore = parseInt(clapping.myScore < 0 ? 0 : clapping.myScore);
	var bScore = parseInt(clapping.getCookie('myScore'));
	if (bScore != null && bScore != '') {
		bScore = (bScore > clapping.myScore ? bScore : clapping.myScore);
	} else {
		bScore = clapping.myScore;
	}
	clapping.setCookie('myScore', bScore, 365);
	this.notice.lbl2.setText('ROUNDS: ' + this.round);
	this.notice.lbl3.setText('SCORE: ' + clapping.myScore);
	this.notice.lbl4.setText('BEST SCORE: ' + clapping.getCookie('myScore'));
	this.notice.runAction(new lime.animation.FadeTo(1));
	this.started = false;
	this.hint.setHidden(this.started);
};
