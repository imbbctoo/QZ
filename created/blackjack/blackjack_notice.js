goog.provide('blackjack.Notice');

goog.require('lime.Label');
goog.require('lime.Layer');
goog.require('lime.Sprite');

blackjack.Notice = function(val) {
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
	lbl1[7] = new lime.Label().setSize(320, 12).setFontSize(20).setFontColor('#fff').setText('YOU WIN THE GAME!');
	lbl1[8] = new lime.Label().setSize(320, 12).setFontSize(20).setFontColor('#fff').setText('GAME OVER!');
	this.appendChild(lbl1[val].setPosition(0, -50));

	var lbl2 = [];
	for (var i = 0; i <= 8; i++) lbl2[i] = new lime.Label().setSize(320, 12).setFontSize(14).setFontColor('#fff');

	this.refresh = function(n) {
		lbl2[0].setText('YOU WIN ' + n + ' CHIP' + (n > 1 ? 'S' : '') + '!');
		lbl2[1].setText('YOU LOSE ' + n + ' CHIP' + (n > 1 ? 'S' : '') + '!');
		lbl2[2].setText('YOU LOSE ' + n + ' CHIP' + (n > 1 ? 'S' : '') + '!');
		lbl2[3].setText('YOU WIN ' + n + ' CHIP' + (n > 1 ? 'S' : '') + '!');
		lbl2[4].setText('YOU WIN ' + n + ' CHIP' + (n > 1 ? 'S' : '') + '!');
		lbl2[5].setText('YOU LOSE ' + n + ' CHIP' + (n > 1 ? 'S' : '') + '!');
		lbl2[6].setText('YOU GET BACK ' + n + ' CHIP' + (n > 1 ? 'S' : '') + '!');
		lbl2[7].setText('DEALER RUNS OUT OF ALL THE CHIPS!');
		lbl2[8].setText('PLAYER RUNS OUT OF ALL THE CHIPS!');
	};

	this.appendChild(lbl2[val].setPosition(0, 50));
};
goog.inherits(blackjack.Notice, lime.Layer);
