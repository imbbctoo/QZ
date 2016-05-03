goog.provide('citybloxx.Cloud');

goog.require('lime.Circle');
goog.require('lime.Layer');
goog.require('lime.Sprite');

citybloxx.Cloud = function() {
	lime.Layer.call(this);

	this.appendChild(new lime.Circle().setSize(20, 20).setFill(255, 255, 255).setPosition(0, -10));
	this.appendChild(new lime.Circle().setSize(20, 20).setFill(255, 255, 255).setPosition(-15, 0));
	this.appendChild(new lime.Circle().setSize(20, 20).setFill(255, 255, 255).setPosition(15, 0));
	this.appendChild(new lime.Sprite().setSize(30, 15).setFill(255, 255, 255).setPosition(0, 2.5));
};
goog.inherits(citybloxx.Cloud, lime.Layer);
