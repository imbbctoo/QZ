goog.provide('citybloxx.Game');

goog.require('citybloxx.Cloud');
goog.require('citybloxx.Flat');
goog.require('goog.Timer');
goog.require('lime.Circle');
goog.require('lime.Layer');
goog.require('lime.Sprite');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.MoveTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.Sequence');
goog.require('lime.fill.LinearGradient');

citybloxx.Game = function() {
	lime.Sprite.call(this);

	this.w = citybloxx.director.getSize().width;
	this.h = citybloxx.director.getSize().height;

	this.setSize(this.w, this.h).setFill(150, 170, 255);

	this.layer = [];

	this.layer[0] = new lime.Layer();
	this.layer[1] = new lime.Layer();
	this.layer[2] = new lime.Layer();
	this.layer[3] = new lime.Layer();
	this.layer[4] = new lime.Layer();

	this.ground = new citybloxx.Flat(this.w * 2, 120, '#555');
	this.appendChild(this.ground.setPosition(0, 200));

	this.appendChild(new citybloxx.Cloud());
	this.appendChild(new citybloxx.Cloud().setScale(2).setPosition(0, -40));

	this.appendChild(new lime.Sprite().setSize(this.w, this.h).setFill(255, 255, 255).setOpacity(.1));
};
goog.inherits(citybloxx.Game, lime.Sprite);
