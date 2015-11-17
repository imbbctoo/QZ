goog.provide('dung2048.Unit');

goog.require('lime.Label');
goog.require('lime.RoundedRect');
goog.require('lime.Sprite');

dung2048.Unit = function(who) {
	lime.RoundedRect.call(this);

	var newThis = new lime.RoundedRect().setSize(56, 56).setPosition(0, -5);

	this.who = who;

	this.rm = false;

	if (this.who == 'h') {
		this.setSize(newThis.getSize().width, newThis.getSize().height).setFill(255, 0, 66);
		this.appendChild(new lime.RoundedRect().setSize(newThis.getSize().width, newThis.getSize().height).setFill(0, 0, 0).setOpacity(.5));
		newThis.setFill(this.getFill()).appendChild(new lime.Sprite().setFill(dung2048.h));
		this.appendChild(newThis);
	} else if (this.who == 'w') {
		this.setSize(newThis.getSize().width, newThis.getSize().height).setFill(0, 116, 246);
		this.appendChild(new lime.RoundedRect().setSize(newThis.getSize().width, newThis.getSize().height).setFill(0, 0, 0).setOpacity(.5));
		newThis.setFill(this.getFill()).appendChild(new lime.Sprite().setFill(dung2048.w));
		this.appendChild(newThis);
	} else if (this.who == 's') {
		this.setSize(newThis.getSize().width, newThis.getSize().height).setFill(150, 150, 150);
		this.appendChild(new lime.RoundedRect().setSize(newThis.getSize().width, newThis.getSize().height).setFill(0, 0, 0).setOpacity(.5));
		newThis.setFill(this.getFill()).appendChild(new lime.Sprite().setFill(dung2048.s));
		this.appendChild(newThis);
	} else if (this.who == 'c') {
		this.setSize(newThis.getSize().width, newThis.getSize().height).setFill(255, 167, 28);
		this.appendChild(new lime.RoundedRect().setSize(newThis.getSize().width, newThis.getSize().height).setFill(0, 0, 0).setOpacity(.5));
		newThis.setFill(this.getFill()).appendChild(new lime.Sprite().setFill(dung2048.c));
		this.appendChild(newThis);
	} else if (this.who == 'd') {
		this.setSize(newThis.getSize().width, newThis.getSize().height).setFill(49, 188, 0);
		this.appendChild(new lime.RoundedRect().setSize(newThis.getSize().width, newThis.getSize().height).setFill(0, 0, 0).setOpacity(.5));
		newThis.setFill(this.getFill()).appendChild(new lime.Sprite().setFill(dung2048.d));
		this.appendChild(newThis);
	}

	this.lbl = new lime.Label().setFontSize(20).setFontColor('#fff').setAnchorPoint(1, 1).setText(1);
	newThis.appendChild(this.lbl.setPosition(25, 30));
};
goog.inherits(dung2048.Unit, lime.RoundedRect);
