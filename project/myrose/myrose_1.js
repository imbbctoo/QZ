goog.provide('myrose.Function');

goog.require('lime.Layer');

myrose.Function = function() {
	lime.Sprite.call(this);

	this.x = [];
	this.y = [];

	this.x[0] = Math.random() * 86 - 100;//-14
	this.x[1] = Math.random() * 40 - 10;//30
	this.x[2] = Math.random() * 7 - 22;//-15
	this.x[3] = Math.random() * 62 - 22;//40
	this.x[4] = Math.random() * 16 - 40;//-24
	this.x[5] = Math.random() * 37 - 61;//-24
	this.x[6] = Math.random() * 41 - 61;//-20
	this.x[7] = Math.random() * 36 - 46;//-10
	this.x[8] = Math.random() * 1 - 46;//-45
	this.x[9] = Math.random() * 5 - 25;//-20
	this.x[10] = Math.random() * 40 - 25;//15
	this.x[11] = Math.random() * 7 - 7;//0
	this.x[12] = Math.random() * 7 - 7;//0
	this.x[13] = Math.random() * 62 - 8;//54
	this.x[14] = Math.random() * 21 + 33;//54
	this.x[15] = Math.random() * 24 + 33;//57
	this.x[16] = Math.random() * 36 - 10;//26
	this.x[17] = Math.random() * 21 + 10;//31
	this.x[18] = Math.random() * 18 + 13;//31
	this.x[19] = Math.random() * 10 + 40;//50
	this.x[20] = Math.random() * 47 + 3;//50

	this.y[0] = -0.0127 * Math.pow(this.x[0], 2) - 1.4717 * this.x[0] - 50.805;
	this.y[1] = -0.0336 * Math.pow(this.x[1], 2) + 2.2414 * this.x[1] - 20.943;
	this.y[2] = -1.2503 * Math.pow(this.x[2], 2) - 38.76 * this.x[2] - 235.09;
	this.y[3] = -0.0006 * Math.pow(this.x[3], 3) + 0.0494 * Math.pow(this.x[3], 2) - 2.5777 * this.x[3] - 74.512;
	this.y[4] = 0.0938 * Math.pow(this.x[4], 2) + 7.5625 * this.x[4] + 202.5;
	this.y[5] = -0.0018 * Math.pow(this.x[5], 3) - 0.1981 * Math.pow(this.x[5], 2) - 7.3768 * this.x[5] - 12.821;
	this.y[6] = -0.0429 * Math.pow(this.x[6], 2) - 3.7571 * this.x[6] + 42.496;
	this.y[7] = -0.0456 * Math.pow(this.x[7], 2) - 2.1359 * this.x[7] + 148.27;
	this.y[8] = 18 * Math.pow(this.x[8], 2) + 1613 * this.x[8] + 36260;
	this.y[9] = -2.8 * Math.pow(this.x[9], 2) - 133.8 * this.x[9] - 1455;
	this.y[10] = -0.0414 * Math.pow(this.x[10], 2) - 0.7559 * this.x[10] + + 147.72;
	this.y[11] = 0.4286 * Math.pow(this.x[11], 2) + 1.1429 * this.x[11] + 45;
	this.y[12] = -0.2714 * Math.pow(this.x[12], 2) + 0.2429 * this.x[12] + 73;
	this.y[13] = 0.0198 * Math.pow(this.x[13], 2) - 0.7163 * this.x[13] + 73.101;
	this.y[14] = -0.0656 * Math.pow(this.x[14], 2) + 5.3822 * this.x[14] - 6.1818;
	this.y[15] = 0.0043 * Math.pow(this.x[15], 3) - 0.5179 * Math.pow(this.x[15], 2) + 21.25 * this.x[15] - 190.81;
	this.y[16] = -0.0328 * Math.pow(this.x[16], 2) + 0.7164 * this.x[16] + 104.58;
	this.y[17] = 0.0714 * Math.pow(this.x[17], 2) - 2.0113 * this.x[17] + 121.12;
	this.y[18] = -0.0721 * Math.pow(this.x[18], 2) + 2.5668 * this.x[18] + 123.46;
	this.y[19] = 0.06 * Math.pow(this.x[19], 2) - 3.9 * this.x[19] + 190;
	this.y[20] = -0.016 * Math.pow(this.x[20], 2) + 0.5209 * this.x[20] + 159.9;
};
goog.inherits(myrose.Function, lime.Layer);
