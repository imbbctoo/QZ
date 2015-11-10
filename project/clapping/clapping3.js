goog.provide('clapping.Pic');

goog.require('lime.Sprite');

clapping.Pic = function(r) {
	lime.Sprite.call(this);

	this.reloadPic = new lime.Sprite().setSize(60, 60).setFill('assets/reload.png');
	this.firePic = new lime.Sprite().setSize(80, 60).setFill('assets/fire.png');
	this.bombPic = new lime.Sprite().setSize(90, 60).setFill('assets/bomb.png');
	this.disarmPic = new lime.Sprite().setSize(60, 60).setFill('assets/disarm.png');
	this.defendPic = new lime.Sprite().setSize(45, 60).setFill('assets/defend.png');

	this.sniperPic = new lime.Sprite().setSize(100, 60).setFill('assets/sniper.png');
	this.surgeonPic = new lime.Sprite().setSize(60, 60).setFill('assets/surgeon.png');
	this.grenadierPic = new lime.Sprite().setSize(50, 60).setFill('assets/grenadier.png');
	this.armerPic = new lime.Sprite().setSize(50, 60).setFill('assets/armer.png');

	this.heartPic = new lime.Sprite().setSize(20, 20).setFill('assets/heart.png');
};
goog.inherits(clapping.Pic, lime.Sprite);
