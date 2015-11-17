goog.provide('blackjack.Notice');

goog.require('lime.Label');
goog.require('lime.Layer');
goog.require('lime.Sprite');

blackjack.Notice = function(val, n) {
    lime.Layer.call(this);

	this.appendChild(new lime.Sprite().setSize(350, 140).setFill(0, 0, 0).setOpacity(.6));

	var lbl1 = [];

	lbl1[0] = new lime.Label().setSize(320, 12).setFontSize(20).setFontColor('#fff').setText('PLAYER WINS!');
	lbl1[1] = new lime.Label().setSize(320, 12).setFontSize(20).setFontColor('#fff').setText('DEALER WINS!');
	lbl1[2] = new lime.Label().setSize(320, 12).setFontSize(20).setFontColor('#fff').setText('PLAYER BUSTS!');
	lbl1[3] = new lime.Label().setSize(320, 12).setFontSize(20).setFontColor('#fff').setText('DEALER BUSTS!');
	lbl1[4] = new lime.Label().setSize(320, 12).setFontSize(20).setFontColor('#fff').setText('PLAYER GETS TWENTY ONE!');
	lbl1[5] = new lime.Label().setSize(320, 12).setFontSize(20).setFontColor('#fff').setText('DEALER GETS TWENTY ONE!');
	lbl1[6] = new lime.Label().setSize(320, 12).setFontSize(20).setFontColor('#fff').setText('PUSH!');
	lbl1[7] = new lime.Label().setSize(320, 12).setFontSize(20).setFontColor('#fff').setText('GAME OVER!');
	lbl1[8] = new lime.Label().setSize(320, 12).setFontSize(20).setFontColor('#fff').setText('YOU WIN THE GAME!');
	this.appendChild(lbl1[val].setPosition(0, -50));

	var lbl2 = [];

	lbl2[0] = new lime.Label().setSize(320, 12).setFontSize(14).setFontColor('#fff').setText('YOU WIN ' + n + ' CHIP' + (n > 1 ? 'S' : '') + '!');//30
	lbl2[1] = new lime.Label().setSize(320, 12).setFontSize(14).setFontColor('#fff').setText('YOU LOSE ' + n + ' CHIP' + (n > 1 ? 'S' : '') + '!');
	lbl2[2] = new lime.Label().setSize(320, 12).setFontSize(14).setFontColor('#fff').setText('YOU LOSE ' + n + ' CHIP' + (n > 1 ? 'S' : '') + '!');
	lbl2[3] = new lime.Label().setSize(320, 12).setFontSize(14).setFontColor('#fff').setText('YOU WIN ' + n + ' CHIP' + (n > 1 ? 'S' : '') + '!');//30
	lbl2[4] = new lime.Label().setSize(320, 12).setFontSize(14).setFontColor('#fff').setText('YOU WIN ' + n + ' CHIP' + (n > 1 ? 'S' : '') + '!');//80
	lbl2[5] = new lime.Label().setSize(320, 12).setFontSize(14).setFontColor('#fff').setText('YOU LOSE ' + n + ' CHIP' + (n > 1 ? 'S' : '') + '!');//80
	lbl2[6] = new lime.Label().setSize(320, 12).setFontSize(14).setFontColor('#fff').setText('YOU GET BACK ' + n + ' CHIP' + (n > 1 ? 'S' : '') + '!');//15
	lbl2[7] = new lime.Label().setSize(320, 12).setFontSize(20).setFontColor('#fff').setText('PLAYER HAS NO CHIPS!');
	lbl2[8] = new lime.Label().setSize(320, 12).setFontSize(20).setFontColor('#fff').setText('DEALER HAS NO CHIPS!');
	this.appendChild(lbl2[val].setPosition(0, 50));
};
goog.inherits(blackjack.Notice, lime.Layer);
