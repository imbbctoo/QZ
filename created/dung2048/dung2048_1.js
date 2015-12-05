goog.provide('dung2048.Game');

goog.require('dung2048.Notice');
goog.require('dung2048.Unit');
goog.require('goog.Timer');
goog.require('lime.Layer');
goog.require('lime.RoundedRect');
goog.require('lime.Sprite');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.MoveTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.Sequence');

dung2048.Game = function(myMode) {
	lime.Sprite.call(this);

	this.w = dung2048.director.getSize().width;
	this.h = dung2048.director.getSize().height;
	this.setSize(this.w, this.h);

	this.position = [];
	this.position[0] = new goog.math.Coordinate(-96, -96);
	this.position[1] = new goog.math.Coordinate(-32, -96);
	this.position[2] = new goog.math.Coordinate(32, -96);
	this.position[3] = new goog.math.Coordinate(96, -96);
	this.position[4] = new goog.math.Coordinate(-96, -32);
	this.position[5] = new goog.math.Coordinate(-32, -32);
	this.position[6] = new goog.math.Coordinate(32, -32);
	this.position[7] = new goog.math.Coordinate(96, -32);
	this.position[8] = new goog.math.Coordinate(-96, 32);
	this.position[9] = new goog.math.Coordinate(-32, 32);
	this.position[10] = new goog.math.Coordinate(32, 32);
	this.position[11] = new goog.math.Coordinate(96, 32);
	this.position[12] = new goog.math.Coordinate(-96, 96);
	this.position[13] = new goog.math.Coordinate(-32, 96);
	this.position[14] = new goog.math.Coordinate(32, 96);
	this.position[15] = new goog.math.Coordinate(96, 96);

	this.top = 30;

	this.back = new lime.RoundedRect().setSize(280, 280).setFill(192, 192, 192);
	this.appendChild(this.back);

	var layer = new lime.Layer();
	this.back.appendChild(layer);

	layer.appendChild(new lime.RoundedRect().setSize(60, 60).setFill(128, 128, 128).setPosition(this.position[0]));
	layer.appendChild(new lime.RoundedRect().setSize(60, 60).setFill(128, 128, 128).setPosition(this.position[1]));
	layer.appendChild(new lime.RoundedRect().setSize(60, 60).setFill(128, 128, 128).setPosition(this.position[2]));
	layer.appendChild(new lime.RoundedRect().setSize(60, 60).setFill(128, 128, 128).setPosition(this.position[3]));
	layer.appendChild(new lime.RoundedRect().setSize(60, 60).setFill(128, 128, 128).setPosition(this.position[4]));
	layer.appendChild(new lime.RoundedRect().setSize(60, 60).setFill(128, 128, 128).setPosition(this.position[5]));
	layer.appendChild(new lime.RoundedRect().setSize(60, 60).setFill(128, 128, 128).setPosition(this.position[6]));
	layer.appendChild(new lime.RoundedRect().setSize(60, 60).setFill(128, 128, 128).setPosition(this.position[7]));
	layer.appendChild(new lime.RoundedRect().setSize(60, 60).setFill(128, 128, 128).setPosition(this.position[8]));
	layer.appendChild(new lime.RoundedRect().setSize(60, 60).setFill(128, 128, 128).setPosition(this.position[9]));
	layer.appendChild(new lime.RoundedRect().setSize(60, 60).setFill(128, 128, 128).setPosition(this.position[10]));
	layer.appendChild(new lime.RoundedRect().setSize(60, 60).setFill(128, 128, 128).setPosition(this.position[11]));
	layer.appendChild(new lime.RoundedRect().setSize(60, 60).setFill(128, 128, 128).setPosition(this.position[12]));
	layer.appendChild(new lime.RoundedRect().setSize(60, 60).setFill(128, 128, 128).setPosition(this.position[13]));
	layer.appendChild(new lime.RoundedRect().setSize(60, 60).setFill(128, 128, 128).setPosition(this.position[14]));
	layer.appendChild(new lime.RoundedRect().setSize(60, 60).setFill(128, 128, 128).setPosition(this.position[15]));

	this.notice = [];

	this.notice[0] = new dung2048.Notice(0);
	this.appendChild(this.notice[0].setOpacity(0));

	this.notice[1] = new dung2048.Notice(1);
	this.appendChild(this.notice[1].setOpacity(0));

	var lbl1 = new lime.Label().setFontSize(20).setText('SCORE:');
	this.appendChild(lbl1.setPosition(100, -200));

	this.lbl2 = new lime.Label().setFontSize(20).setText('0');
	this.appendChild(this.lbl2.setPosition(100, -175));

	var sig = new lime.Sprite().setFill(dung2048.s).setSize(25, 25);
	this.appendChild(sig.setPosition(-25, -190));

	var lbl3 = new lime.Label().setText('*').setFontSize(25);
	this.appendChild(lbl3.setPosition(-2, -185));

	this.lbl4 = new lime.Label().setText(1).setFontSize(20);
	this.appendChild(this.lbl4.setPosition(15, -190));

	this.controller = new lime.Sprite().setSize(this.w * 4, this.h * 4).setFill(255, 255, 255).setOpacity(.1);
	this.appendChild(this.controller);
/*
	var s = new lime.Sprite().setSize(20, 20).setFill(255, 0, 0);
	this.controller.appendChild(s);*/

	this.renew();

	this.timer = [];

	this.timer[0] = new goog.Timer(100);
	goog.events.listen(this.timer[0], 'tick', function() {
		this.flag[2] = true;
		this.timer[0].stop();
	}, false, this);

	this.timer[1] = new goog.Timer(1000);
	goog.events.listen(this.timer[1], 'tick', function() {
		this.stop();
	});

	this.timer[2] = new goog.Timer(100);
	goog.events.listen(this.timer[2], 'tick', function() {
		this.stop();
	});

	goog.events.listen(this.controller, ['mousedown', 'touchstart'], function(e) {
		if (this.flag[2] && !this.timer[2].enabled) {
			if (!this.flag[1]) {
				e.startDrag(false, new goog.math.Box(-this.h / 2, this.w / 2, this.h / 2, -this.w / 2));

				e.swallow(['mouseup', 'touchend'], function() {
					var pos = this.getParent().controller.getPosition();
					this.getParent().controller.setPosition(pos);
					if (pos.x > 10 || pos.x < -10 || pos.y > 10 || pos.y < -10) {
						this.getParent().flag[2] = false;
						this.getParent().step(e);
					}
					this.getParent().controller.setPosition(0, 0);
				});
			} else {
				if (!this.timer[1].enabled) {
					this.renew();
				}
			}
			this.timer[2].start();
		}
	}, false, this);

	goog.events.listen(this, 'keydown', function() {
		if (this.flag[2] && !this.timer[2].enabled) {
			if (!this.flag[1]) {
				this.flag[2] = false;
				this.step(event);
			} else {
				if (!this.timer[1].enabled) {
					this.renew();
				}
			}
			this.timer[2].start();
		}
	});

	var btn = new lime.Sprite().setSize(50, 50).setFill(dung2048.btn);
	this.appendChild(btn.setPosition(-100, -190));

	goog.events.listen(btn, ['mousedown', 'touchstart'], function() {
		if (!this.timer[1].enabled && this.flag[2] && this.controller.getPosition().x == 0 && this.controller.getPosition().y == 0 && !this.timer[2].enabled) {
			this.renew();
			btn.runAction(new lime.animation.Sequence(new lime.animation.ScaleTo(.9).setDuration(.1), new lime.animation.ScaleTo(1).setDuration(.2)));
			this.timer[2].start();
		}
	}, false, this);
};
goog.inherits(dung2048.Game, lime.Sprite);

dung2048.Game.prototype.renew = function() {
	this.postkn = [];
	this.oripos = [];
	this.obsnum = [];
	this.tagpos = [];
	this.posutk = [];
	this.flag = [];
	this.score = 0;
	this.hrt = 1;
	this.mhrt = 1;

	this.lbl2.setText(0);

	this.lbl4.setText(Math.ceil(this.hrt / 9));

	for (var j = 0; j < 16; j++) {
		for (var i = 1; i < this.back.getNumberOfChildren(); i++) {
			this.back.removeChild(this.back.getChildAt(i));
		}
	}
/*
	this.back.appendChild(new dung2048.Unit('d').setPosition(this.position[0]));
	this.back.appendChild(new dung2048.Unit('h').setPosition(this.position[1]));
	this.back.appendChild(new dung2048.Unit('d').setPosition(this.position[2]));
	this.back.appendChild(new dung2048.Unit('d').setPosition(this.position[3]));
	this.back.appendChild(new dung2048.Unit('w').setPosition(this.position[4]));
	this.back.appendChild(new dung2048.Unit('w').setPosition(this.position[5]));
	this.back.appendChild(new dung2048.Unit('w').setPosition(this.position[6]));
	this.back.appendChild(new dung2048.Unit('w').setPosition(this.position[7]));
			this.back.getChildAt(this.back.getNumberOfChildren() - 1).lbl.setText(4);
	this.back.appendChild(new dung2048.Unit('d').setPosition(this.position[8]));
	this.back.appendChild(new dung2048.Unit('d').setPosition(this.position[9]));
	this.back.appendChild(new dung2048.Unit('d').setPosition(this.position[10]));
	this.back.appendChild(new dung2048.Unit('d').setPosition(this.position[11]));
	//this.back.appendChild(new dung2048.Unit('s').setPosition(this.position[12]));
	//this.back.appendChild(new dung2048.Unit('d').setPosition(this.position[13]));
	//this.back.appendChild(new dung2048.Unit('s').setPosition(this.position[14]));
	//this.back.appendChild(new dung2048.Unit('d').setPosition(this.position[15]));*/

	this.back.appendChild(new dung2048.Unit('h').setPosition(this.position[1]));
	this.back.appendChild(new dung2048.Unit('w').setPosition(this.position[3]));
	this.back.appendChild(new dung2048.Unit('s').setPosition(this.position[6]));
	this.back.appendChild(new dung2048.Unit('c').setPosition(this.position[7]));
	this.back.appendChild(new dung2048.Unit('d').setPosition(this.position[8]));
	this.back.appendChild(new dung2048.Unit('w').setPosition(this.position[10]));
	this.back.appendChild(new dung2048.Unit('w').setPosition(this.position[13]));

	this.notice[0].runAction(new lime.animation.FadeTo(0).setDuration(.5));
	this.notice[1].runAction(new lime.animation.FadeTo(0).setDuration(.5));

	this.flag[1] = false;

	this.flag[2] = true;
};

dung2048.Game.prototype.step = function(e) {
	var pos = new goog.math.Coordinate(this.controller.getPosition().x, this.controller.getPosition().y);

	this.postkn = [];
	this.oripos = [];
	this.obsnum = [];
	this.tagpos = [];
	this.posutk = [];
	this.score = 0;

	for (var i = 1; i < this.back.getNumberOfChildren(); i++) {
		this.postkn[i] = new goog.math.Coordinate(this.back.getChildAt(i).getPosition().x, this.back.getChildAt(i).getPosition().y);
		this.obsnum[i] = 0;
	}

	if ((pos.y < pos.x && pos.y > -pos.x && pos.x > 10) || e.keyCode == 68 || e.keyCode == 39) {
		this.r_cth();
		for (var i = 1; i < this.back.getNumberOfChildren(); i++) {
			this.r_ctl(i);
		}
	} else if ((pos.y > pos.x && pos.y < -pos.x && pos.x < -10) || e.keyCode == 65 || e.keyCode == 37) {
		this.l_cth();
		for (var i = 1; i < this.back.getNumberOfChildren(); i++) {
			this.l_ctl(i);
		}
	} else if ((pos.y > pos.x && pos.y > -pos.x && pos.y > 10) || e.keyCode == 83 || e.keyCode == 40) {
		this.d_cth();
		for (var i = 1; i < this.back.getNumberOfChildren(); i++) {
			this.d_ctl(i);
		}
	} else if ((pos.y < pos.x && pos.y < -pos.x && pos.y < -10) || e.keyCode == 87 || e.keyCode == 38) {
		this.u_cth();
		for (var i = 1; i < this.back.getNumberOfChildren(); i++) {
			this.u_ctl(i);
		}
	}
	this.lbl2.setText(parseInt(this.lbl2.getText()) + this.score);
};

dung2048.Game.prototype.r_cth = function() {
	for (var n = 0; n <= 12; n += 4) {
		for (var j = n + 3; j >= n; j--) {
			for (var i = 1; i < this.back.getNumberOfChildren(); i++) {
				this.oripos[i] = new goog.math.Coordinate(this.back.getChildAt(i).getPosition().x, this.back.getChildAt(i).getPosition().y);
				if (this.oripos[i].x == this.position[j].x && this.oripos[i].y == this.position[j].y) {
					this.back.setChildIndex(this.back.getChildAt(i), this.back.getNumberOfChildren() - 1);
					break;
				}
			}
		}
	}
};

dung2048.Game.prototype.l_cth = function() {
	for (var n = 0; n <= 12; n += 4) {
		for (var j = n; j <= n + 3; j++) {
			for (var i = 1; i < this.back.getNumberOfChildren(); i++) {
				this.oripos[i] = new goog.math.Coordinate(this.back.getChildAt(i).getPosition().x, this.back.getChildAt(i).getPosition().y);
				if (this.oripos[i].x == this.position[j].x && this.oripos[i].y == this.position[j].y) {
					this.back.setChildIndex(this.back.getChildAt(i), this.back.getNumberOfChildren() - 1);
					break;
				}
			}
		}
	}
};

dung2048.Game.prototype.d_cth = function() {
	for (var n = 0; n <= 3; n++) {
		for (var j = n + 12; j >= n; j -= 4) {
			for (var i = 1; i < this.back.getNumberOfChildren(); i++) {
				this.oripos[i] = new goog.math.Coordinate(this.back.getChildAt(i).getPosition().x, this.back.getChildAt(i).getPosition().y);
				if (this.oripos[i].x == this.position[j].x && this.oripos[i].y == this.position[j].y) {
					this.back.setChildIndex(this.back.getChildAt(i), this.back.getNumberOfChildren() - 1);
					break;
				}
			}
		}
	}
};

dung2048.Game.prototype.u_cth = function() {
	for (var n = 0; n <= 3; n++) {
		for (var j = n; j <= n + 12; j += 4) {
			for (var i = 1; i < this.back.getNumberOfChildren(); i++) {
				this.oripos[i] = new goog.math.Coordinate(this.back.getChildAt(i).getPosition().x, this.back.getChildAt(i).getPosition().y);
				if (this.oripos[i].x == this.position[j].x && this.oripos[i].y == this.position[j].y) {
					this.back.setChildIndex(this.back.getChildAt(i), this.back.getNumberOfChildren() - 1);
					break;
				}
			}
		}
	}
};

dung2048.Game.prototype.r_ctl = function(i) {
	this.oripos[i] = new goog.math.Coordinate(this.back.getChildAt(i).getPosition().x, this.back.getChildAt(i).getPosition().y);
	this.flag[0] = true;
	for (var n = 0; n <= 12; n += 4) {
		for (var j = n + 3; j >= n; j--) {
			if (this.oripos[i].x == this.position[j].x && this.oripos[i].y == this.position[j].y) {
				for (var k = j + 1; k < n + 4; k++) {
					for (var l = 1; l < this.back.getNumberOfChildren(); l++) {
						if (this.position[k].x == this.postkn[l].x && this.position[k].y == this.postkn[l].y) {
							this.obsnum[i] += 1;
							if (this.flag[0]) {
								for (var m = 1; m < this.back.getNumberOfChildren(); m++) {
									if (this.back.getChildAt(m).getPosition().x == this.position[k].x && this.back.getChildAt(m).getPosition().y == this.position[k].y) {
										if (this.back.getChildAt(i).who == this.back.getChildAt(m).who) {
											this.score += 1;
											this.obsnum[i] -= 1;
											if (!this.back.getChildAt(m).rm) {
												this.back.getChildAt(i).lbl.setText(parseInt(this.back.getChildAt(i).lbl.getText()) + parseInt(this.back.getChildAt(m).lbl.getText()));
												if (parseInt(this.back.getChildAt(i).lbl.getText()) >= this.top) {
													this.back.getChildAt(i).lbl.setText(this.top);
												}
											}
											this.back.getChildAt(m).rm = true;
										} else {
											this.flag[0] = false;
										}
										break;
									}
								}
							}
							break;
						}
					}
				}
				for (var k = 0; k < 16; k++) {
					if (this.back.getChildAt(i).getPosition().x == this.position[k].x && this.back.getChildAt(i).getPosition().y == this.position[k].y) {
						for (var l = 3; l >= 0; l--) {
							if (this.oripos[i].x == this.position[n + l].x && this.oripos[i].y == this.position[n + l].y) {
								for (var m = 0; m <= 3 - l; m++) {
									if (this.obsnum[i] == m) {
										this.tagpos[i] = new goog.math.Coordinate(this.position[n + 3 - m].x, this.position[n + 3 - m].y);
										var moveTo = new lime.animation.MoveTo(this.tagpos[i]).setDuration(.2);
										moveTo.addTarget(this.back.getChildAt(i));
										moveTo.enableOptimizations(false);
										if (this.back.getChildAt(i).getPosition().x != this.tagpos[i].x || this.back.getChildAt(i).getPosition().y != this.tagpos[i].y) {
											moveTo.enableOptimizations(true);
										}
										moveTo.play();
										goog.events.listen(moveTo, 'stop', function() {
											this.getParent().getChildAt(0).back.getChildAt(i).setPosition(this.getParent().getChildAt(0).tagpos[i]);
											if (i == 1) {
												this.getParent().getChildAt(0).remove();
												this.getParent().getChildAt(0).r_eat();
												this.getParent().getChildAt(0).add();
												this.getParent().getChildAt(0).remove();
												this.getParent().getChildAt(0).check();
											}
										}, false, this);
										break;
									}
								}
								break;
							}
						}
						break;
					}
				}
				break;
			}
		}
	}
};

dung2048.Game.prototype.l_ctl = function(i) {
	this.oripos[i] = new goog.math.Coordinate(this.back.getChildAt(i).getPosition().x, this.back.getChildAt(i).getPosition().y);
	this.flag[0] = true;
	for (var n = 0; n <= 12; n += 4) {
		for (var j = n; j <= n + 3; j++) {
			if (this.oripos[i].x == this.position[j].x && this.oripos[i].y == this.position[j].y) {
				for (var k = j - 1; k >= n; k--) {
					for (var l = 1; l < this.back.getNumberOfChildren(); l++) {
						if (this.position[k].x == this.postkn[l].x && this.position[k].y == this.postkn[l].y) {
							this.obsnum[i] += 1;
							if (this.flag[0]) {
								for (var m = 1; m < this.back.getNumberOfChildren(); m++) {
									if (this.back.getChildAt(m).getPosition().x == this.position[k].x && this.back.getChildAt(m).getPosition().y == this.position[k].y) {
										if (this.back.getChildAt(i).who == this.back.getChildAt(m).who) {
											this.score += 1;
											this.obsnum[i] -= 1;
											if (!this.back.getChildAt(m).rm) {
												this.back.getChildAt(i).lbl.setText(parseInt(this.back.getChildAt(i).lbl.getText()) + parseInt(this.back.getChildAt(m).lbl.getText()));
												if (parseInt(this.back.getChildAt(i).lbl.getText()) >= this.top) {
													this.back.getChildAt(i).lbl.setText(this.top);
												}
											}
											this.back.getChildAt(m).rm = true;
										} else {
											this.flag[0] = false;
										}
										break;
									}
								}
							}
							break;
						}
					}
				}
				for (var k = 0; k < 16; k++) {
					if (this.back.getChildAt(i).getPosition().x == this.position[k].x && this.back.getChildAt(i).getPosition().y == this.position[k].y) {
						for (var l = 0; l <= 3; l++) {
							if (this.oripos[i].x == this.position[n + l].x && this.oripos[i].y == this.position[n + l].y) {
								for (var m = 0; m <= l; m++) {
									if (this.obsnum[i] == m) {
										this.tagpos[i] = new goog.math.Coordinate(this.position[n + m].x, this.position[n + m].y);
										var moveTo = new lime.animation.MoveTo(this.tagpos[i]).setDuration(.2);
										moveTo.addTarget(this.back.getChildAt(i));
										moveTo.enableOptimizations(false);
										if (this.back.getChildAt(i).getPosition().x != this.tagpos[i].x || this.back.getChildAt(i).getPosition().y != this.tagpos[i].y) {
											moveTo.enableOptimizations(true);
										}
										moveTo.play();
										goog.events.listen(moveTo, 'stop', function() {
											this.getParent().getChildAt(0).back.getChildAt(i).setPosition(this.getParent().getChildAt(0).tagpos[i]);
											if (i == 1) {
												this.getParent().getChildAt(0).remove();
												this.getParent().getChildAt(0).l_eat();
												this.getParent().getChildAt(0).add();
												this.getParent().getChildAt(0).remove();
												this.getParent().getChildAt(0).check();
											}
										}, false, this);
										break;
									}
								}
								break;
							}
						}
						break;
					}
				}
				break;
			}
		}
	}
};

dung2048.Game.prototype.d_ctl = function(i) {
	this.oripos[i] = new goog.math.Coordinate(this.back.getChildAt(i).getPosition().x, this.back.getChildAt(i).getPosition().y);
	this.flag[0] = true;
	for (var n = 0; n <= 3; n++) {
		for (var j = n + 12; j >= n; j -= 4) {
			if (this.oripos[i].x == this.position[j].x && this.oripos[i].y == this.position[j].y) {
				for (var k = j + 4; k <= n + 12; k += 4) {
					for (var l = 1; l < this.back.getNumberOfChildren(); l++) {
						if (this.position[k].x == this.postkn[l].x && this.position[k].y == this.postkn[l].y) {
							this.obsnum[i] += 1;
							if (this.flag[0]) {
								for (var m = 1; m < this.back.getNumberOfChildren(); m++) {
									if (this.back.getChildAt(m).getPosition().x == this.position[k].x && this.back.getChildAt(m).getPosition().y == this.position[k].y) {
										if (this.back.getChildAt(i).who == this.back.getChildAt(m).who) {
											this.score += 1;
											this.obsnum[i] -= 1;
											if (!this.back.getChildAt(m).rm) {
												this.back.getChildAt(i).lbl.setText(parseInt(this.back.getChildAt(i).lbl.getText()) + parseInt(this.back.getChildAt(m).lbl.getText()));
												if (parseInt(this.back.getChildAt(i).lbl.getText()) >= this.top) {
													this.back.getChildAt(i).lbl.setText(this.top);
												}
											}
											this.back.getChildAt(m).rm = true;
										} else {
											this.flag[0] = false;
										}
										break;
									}
								}
							}
							break;
						}
					}
				}
				for (var k = 0; k < 16; k++) {
					if (this.back.getChildAt(i).getPosition().x == this.position[k].x && this.back.getChildAt(i).getPosition().y == this.position[k].y) {
						for (var l = 12; l >= 0; l -= 4) {
							if (this.oripos[i].x == this.position[n + l].x && this.oripos[i].y == this.position[n + l].y) {
								for (var m = 0; m <= 3 - l / 4; m++) {
									if (this.obsnum[i] == m) {
										this.tagpos[i] = new goog.math.Coordinate(this.position[n + 12 - m * 4].x, this.position[n + 12 - m * 4].y);
										var moveTo = new lime.animation.MoveTo(this.tagpos[i]).setDuration(.2);
										moveTo.addTarget(this.back.getChildAt(i));
										moveTo.enableOptimizations(false);
										if (this.back.getChildAt(i).getPosition().x != this.tagpos[i].x || this.back.getChildAt(i).getPosition().y != this.tagpos[i].y) {
											moveTo.enableOptimizations(true);
										}
										moveTo.play();
										goog.events.listen(moveTo, 'stop', function() {
											this.getParent().getChildAt(0).back.getChildAt(i).setPosition(this.getParent().getChildAt(0).tagpos[i]);
											if (i == 1) {
												this.getParent().getChildAt(0).remove();
												this.getParent().getChildAt(0).d_eat();
												this.getParent().getChildAt(0).add();
												this.getParent().getChildAt(0).remove();
												this.getParent().getChildAt(0).check();
											}
										}, false, this);
										break;
									}
								}
								break;
							}
						}
						break;
					}
				}
				break;
			}
		}
	}
};

dung2048.Game.prototype.u_ctl = function(i) {
	this.oripos[i] = new goog.math.Coordinate(this.back.getChildAt(i).getPosition().x, this.back.getChildAt(i).getPosition().y);
	this.flag[0] = true;
	for (var n = 0; n <= 3; n++) {
		for (var j = n; j <= n + 12; j += 4) {
			if (this.oripos[i].x == this.position[j].x && this.oripos[i].y == this.position[j].y) {
				for (var k = j - 4; k >= n; k -= 4) {
					for (var l = 1; l < this.back.getNumberOfChildren(); l++) {
						if (this.position[k].x == this.postkn[l].x && this.position[k].y == this.postkn[l].y) {
							this.obsnum[i] += 1;
							if (this.flag[0]) {
								for (var m = 1; m < this.back.getNumberOfChildren(); m++) {
									if (this.back.getChildAt(m).getPosition().x == this.position[k].x && this.back.getChildAt(m).getPosition().y == this.position[k].y) {
										if (this.back.getChildAt(i).who == this.back.getChildAt(m).who) {
											this.score += 1;
											this.obsnum[i] -= 1;
											if (!this.back.getChildAt(m).rm) {
												this.back.getChildAt(i).lbl.setText(parseInt(this.back.getChildAt(i).lbl.getText()) + parseInt(this.back.getChildAt(m).lbl.getText()));
												if (parseInt(this.back.getChildAt(i).lbl.getText()) >= this.top) {
													this.back.getChildAt(i).lbl.setText(this.top);
												}
											}
											this.back.getChildAt(m).rm = true;
										} else {
											this.flag[0] = false;
										}
										break;
									}
								}
							}
							break;
						}
					}
				}
				for (var k = 0; k < 16; k++) {
					if (this.back.getChildAt(i).getPosition().x == this.position[k].x && this.back.getChildAt(i).getPosition().y == this.position[k].y) {
						for (var l = 0; l <= 12; l += 4) {
							if (this.oripos[i].x == this.position[n + l].x && this.oripos[i].y == this.position[n + l].y) {
								for (var m = 0; m <= l / 4; m++) {
									if (this.obsnum[i] == m) {
										this.tagpos[i] = new goog.math.Coordinate(this.position[n + m * 4].x, this.position[n + m * 4].y);
										var moveTo = new lime.animation.MoveTo(this.tagpos[i]).setDuration(.2);
										moveTo.addTarget(this.back.getChildAt(i));
										moveTo.enableOptimizations(false);
										if (this.back.getChildAt(i).getPosition().x != this.tagpos[i].x || this.back.getChildAt(i).getPosition().y != this.tagpos[i].y) {
											moveTo.enableOptimizations(true);
										}
										moveTo.play();
										goog.events.listen(moveTo, 'stop', function() {
											this.getParent().getChildAt(0).back.getChildAt(i).setPosition(this.getParent().getChildAt(0).tagpos[i]);
											if (i == 1) {
												this.getParent().getChildAt(0).remove();
												this.getParent().getChildAt(0).u_eat();
												this.getParent().getChildAt(0).add();
												this.getParent().getChildAt(0).remove();
												this.getParent().getChildAt(0).check();
											}
										}, false, this);
										break;
									}
								}
								break;
							}
						}
						break;
					}
				}
				break;
			}
		}
	}
};

dung2048.Game.prototype.add = function() {
	var pos = [];
	var n = 0;
	for (var i = 1; i <= 16; i++) {
		this.posutk[i] = new goog.math.Coordinate(this.position[i - 1].x, this.position[i - 1].y);
		for (var j = 1; j < this.back.getNumberOfChildren(); j++) {
			if (this.posutk[i].x == this.back.getChildAt(j).getPosition().x && this.posutk[i].y == this.back.getChildAt(j).getPosition().y) {
				this.posutk[i].x = 0;
				break;
			}
		}
		if (this.posutk[i].x != 0) {
			pos[n++] = new goog.math.Coordinate(this.posutk[i].x, this.posutk[i].y);
		}
	}
	var addnum = parseInt(Math.random() * pos.length);
	var typnum = parseInt(Math.random() * 11);
	var scaleTo = new lime.animation.ScaleTo(1).setDuration(.1);
	if (pos[addnum]) {
		if (typnum >= 0 && typnum <= 2) {
			this.back.appendChild(new dung2048.Unit('w').setPosition(pos[addnum]));
			this.back.getChildAt(this.back.getNumberOfChildren() - 1).setScale(.7);
			scaleTo.addTarget(this.back.getChildAt(this.back.getNumberOfChildren() - 1));
		} else if (typnum >= 3 && typnum <= 5) {
			this.back.appendChild(new dung2048.Unit('s').setPosition(pos[addnum]));
			this.back.getChildAt(this.back.getNumberOfChildren() - 1).setScale(.7);
			scaleTo.addTarget(this.back.getChildAt(this.back.getNumberOfChildren() - 1));
			this.back.getChildAt(this.back.getNumberOfChildren() - 1).lbl.setText(Math.ceil(this.hrt / 9));
		} else if (typnum >= 6 && typnum <= 8) {
			this.back.appendChild(new dung2048.Unit('c').setPosition(pos[addnum]));
			this.back.getChildAt(this.back.getNumberOfChildren() - 1).setScale(.7);
			scaleTo.addTarget(this.back.getChildAt(this.back.getNumberOfChildren() - 1));
		} else if (typnum >= 9 && typnum <= 10) {
			this.back.appendChild(new dung2048.Unit('d').setPosition(pos[addnum]));
			this.back.getChildAt(this.back.getNumberOfChildren() - 1).setScale(.7);
			scaleTo.addTarget(this.back.getChildAt(this.back.getNumberOfChildren() - 1));
		}
	}
	scaleTo.play();
	goog.events.listen(scaleTo, 'stop', function() {
		if (!this.timer[0].enabled) {
			this.timer[0].start();
		}
	}, false, this);
};

dung2048.Game.prototype.remove = function() {
	for (var i = this.back.getNumberOfChildren() - 1; i > 0; i--) {
		if (this.back.getChildAt(i).rm) {
			this.back.removeChild(this.back.getChildAt(i));
		}
	}
};

dung2048.Game.prototype.check = function() {
	if (this.back.getNumberOfChildren() >= 17) {
		var chd = [];
		for (var i = 0; i < 16; i++) {
			for (var j = 1; j <= 16; j++) {
				if (this.position[i].x == this.back.getChildAt(j).getPosition().x && this.position[i].y == this.back.getChildAt(j).getPosition().y) {
					chd[i] = this.back.getChildAt(j).who;
					break;
				}
			}
		}
		if ((chd[0] != chd[1] && chd[1] != chd[2] && chd[2] != chd[3]) &&
		(chd[4] != chd[5] && chd[5] != chd[6] && chd[6] != chd[7]) &&
		(chd[8] != chd[9] && chd[9] != chd[10] && chd[10] != chd[11]) &&
		(chd[12] != chd[13] && chd[13] != chd[14] && chd[14] != chd[15]) &&
		(chd[0] != chd[4] && chd[4] != chd[8] && chd[8] != chd[12]) &&
		(chd[1] != chd[5] && chd[5] != chd[9] && chd[9] != chd[13]) &&
		(chd[2] != chd[6] && chd[6] != chd[10] && chd[10] != chd[14]) &&
		(chd[3] != chd[7] && chd[7] != chd[11] && chd[11] != chd[15])) {
			if (this.hrt >= this.top) {
				this.endGame(0);
			} else {
				this.endGame(1);
			}
		}
	} else {
		if (this.hrt >= this.top) {
			this.endGame(0);
		} else if (this.hrt <= 0) {
			this.endGame(1);
		}
	}
};

dung2048.Game.prototype.r_eat = function() {
	for (var n = 0; n <= 12; n += 4) {
		for (var j = n + 2; j >= n; j--) {
			for (var i = 1; i < this.back.getNumberOfChildren(); i++) {
				if (this.back.getChildAt(i).getPosition().x == this.position[j].x && this.back.getChildAt(i).getPosition().y == this.position[j].y) {
					for (var k = 1; k < this.back.getNumberOfChildren() - 1; k++) {
						if (this.position[j + 1].x == this.back.getChildAt(k).getPosition().x && this.position[j + 1].y == this.back.getChildAt(k).getPosition().y) {
							this.judge(i, k);
							break;
						}
					}
					break;
				}
			}
		}
	}
};

dung2048.Game.prototype.l_eat = function() {
	for (var n = 0; n <= 12; n += 4) {
		for (var j = n + 1; j <= n + 3; j++) {
			for (var i = 1; i < this.back.getNumberOfChildren(); i++) {
				if (this.back.getChildAt(i).getPosition().x == this.position[j].x && this.back.getChildAt(i).getPosition().y == this.position[j].y) {
					for (var k = 1; k < this.back.getNumberOfChildren() - 1; k++) {
						if (this.position[j - 1].x == this.back.getChildAt(k).getPosition().x && this.position[j - 1].y == this.back.getChildAt(k).getPosition().y) {
							this.judge(i, k);
							break;
						}
					}
					break;
				}
			}
		}
	}
};

dung2048.Game.prototype.d_eat = function() {
	for (var n = 0; n <= 3; n++) {
		for (var j = n + 8; j >= n; j -= 4) {
			for (var i = 1; i < this.back.getNumberOfChildren(); i++) {
				if (this.back.getChildAt(i).getPosition().x == this.position[j].x && this.back.getChildAt(i).getPosition().y == this.position[j].y) {
					for (var k = 1; k < this.back.getNumberOfChildren() - 1; k++) {
						if (this.position[j + 4].x == this.back.getChildAt(k).getPosition().x && this.position[j + 4].y == this.back.getChildAt(k).getPosition().y) {
							this.judge(i, k);
							break;
						}
					}
					break;
				}
			}
		}
	}
};

dung2048.Game.prototype.u_eat = function() {
	for (var n = 0; n <= 3; n++) {
		for (var j = n + 4; j <= n + 12; j += 4) {
			for (var i = 1; i < this.back.getNumberOfChildren(); i++) {
				if (this.back.getChildAt(i).getPosition().x == this.position[j].x && this.back.getChildAt(i).getPosition().y == this.position[j].y) {
					for (var k = 1; k < this.back.getNumberOfChildren() - 1; k++) {
						if (this.position[j - 4].x == this.back.getChildAt(k).getPosition().x && this.position[j - 4].y == this.back.getChildAt(k).getPosition().y) {
							this.judge(i, k);
							break;
						}
					}
					break;
				}
			}
		}
	}
};

dung2048.Game.prototype.judge = function(i, k) {
	this.score = 0;
	if (this.back.getChildAt(i).who == 's' && this.back.getChildAt(k).who == 'h') {
		if (parseInt(this.back.getChildAt(k).lbl.getText()) > parseInt(this.back.getChildAt(i).lbl.getText())) {
			this.score -= parseInt(this.back.getChildAt(i).lbl.getText());
			this.back.getChildAt(k).lbl.setText(parseInt(this.back.getChildAt(k).lbl.getText()) - parseInt(this.back.getChildAt(i).lbl.getText()));
			this.back.getChildAt(i).lbl.setText(0);
			this.back.getChildAt(i).rm = true;
		} else if (parseInt(this.back.getChildAt(k).lbl.getText()) < parseInt(this.back.getChildAt(i).lbl.getText())) {
			this.score -= parseInt(this.back.getChildAt(k).lbl.getText());
			this.back.getChildAt(i).lbl.setText(parseInt(this.back.getChildAt(i).lbl.getText()) - parseInt(this.back.getChildAt(k).lbl.getText()));
			this.back.getChildAt(k).lbl.setText(0);
			this.back.getChildAt(k).rm = true;
		} else {
			this.score -= parseInt(this.back.getChildAt(i).lbl.getText());
			this.back.getChildAt(i).lbl.setText(0);
			this.back.getChildAt(k).lbl.setText(0);
			this.back.getChildAt(i).rm = true;
			this.back.getChildAt(k).rm = true;
		}
	} else if (this.back.getChildAt(i).who == 'w' && this.back.getChildAt(k).who == 's') {
		if (parseInt(this.back.getChildAt(k).lbl.getText()) > parseInt(this.back.getChildAt(i).lbl.getText())) {
			this.score += parseInt(this.back.getChildAt(i).lbl.getText());
			this.back.getChildAt(k).lbl.setText(parseInt(this.back.getChildAt(k).lbl.getText()) - parseInt(this.back.getChildAt(i).lbl.getText()));
			this.back.getChildAt(i).lbl.setText(0);
			this.back.getChildAt(i).rm = true;
		} else if (parseInt(this.back.getChildAt(k).lbl.getText()) < parseInt(this.back.getChildAt(i).lbl.getText())) {
			this.score += parseInt(this.back.getChildAt(k).lbl.getText());
			this.back.getChildAt(i).lbl.setText(parseInt(this.back.getChildAt(i).lbl.getText()) - parseInt(this.back.getChildAt(k).lbl.getText()));
			this.back.getChildAt(k).lbl.setText(0);
			this.back.getChildAt(k).rm = true;
		} else {
			this.score += parseInt(this.back.getChildAt(i).lbl.getText());
			this.back.getChildAt(i).lbl.setText(0);
			this.back.getChildAt(k).lbl.setText(0);
			this.back.getChildAt(i).rm = true;
			this.back.getChildAt(k).rm = true;
		}
	} else if (this.back.getChildAt(i).who == 'w' && this.back.getChildAt(k).who == 'c') {
		this.score += parseInt(this.back.getChildAt(k).lbl.getText());
		this.back.getChildAt(k).rm = true;
	} else if (this.back.getChildAt(i).who == 'h' && this.back.getChildAt(k).who == 'd') {
		this.score += parseInt(this.back.getChildAt(k).lbl.getText());
		this.back.getChildAt(i).lbl.setText(parseInt(this.back.getChildAt(i).lbl.getText()) + parseInt(this.back.getChildAt(k).lbl.getText()));
		this.back.getChildAt(k).lbl.setText(0);
		if (parseInt(this.back.getChildAt(i).lbl.getText()) >= this.top) {
			this.back.getChildAt(i).lbl.setText(this.top);
		}
		this.back.getChildAt(k).rm = true;
	}
	for (var j = 1; j <= 16; j++) {
		if (this.back.getChildAt(j).who == 'h') {
			this.hrt = parseInt(this.back.getChildAt(j).lbl.getText());
			this.mhrt = (this.hrt > this.mhrt ? this.hrt : this.mhrt);
			break;
		}
	}
	this.lbl2.setText(parseInt(this.lbl2.getText()) + this.score);
	this.lbl4.setText(Math.ceil(this.hrt / 9));
};

dung2048.Game.prototype.endGame = function(val) {
	this.notice[val].runAction(new lime.animation.FadeTo(1));
	this.flag[1] = true;
	if (!this.timer[1].enabled) {
		this.timer[1].start();
	}
	var bonus = 0;
	if (this.mhrt >= 30) {
		bonus = 300;
	} else if (this.mhrt >= 20) {
		bonus = 200;
	} else if (this.mhrt >= 10) {
		bonus = 100;
	}
	this.notice[val].lbl_s.setText(parseInt(this.lbl2.getText()) + ' + ' + bonus);
	dung2048.myScore = parseInt(this.lbl2.getText()) + bonus;
	var bScore = parseInt(dung2048.getCookie('myScore'));
	if (bScore != null && bScore != '') {
		bScore = (bScore > dung2048.myScore ? bScore : dung2048.myScore);
	} else {
		bScore = dung2048.myScore;
	}
	dung2048.setCookie('myScore', bScore, 365);
};
