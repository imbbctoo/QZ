goog.provide('clapping.Menu');

goog.require('lime.GlossyButton');
goog.require('lime.Layer');
goog.require('lime.Scene');

clapping.Menu = function() {
	lime.Layer.call(this);

	this.appendChild(new lime.Sprite().setSize(clapping.director.getSize().width, clapping.director.getSize().height).setFill(255, 255, 255));

	this.sniper = new lime.GlossyButton('Sniper').setSize(100, 40).setPosition(0, -90);
	this.surgeon = new lime.GlossyButton('Surgeon').setSize(100, 40).setPosition(0, -30);
	this.grenadier = new lime.GlossyButton('Grenadier').setSize(100, 40).setPosition(0, 30);
	this.armer = new lime.GlossyButton('Armer').setSize(100, 40).setPosition(0, 90);

	goog.events.listen(this.sniper, ['mousedown', 'touchstart'], function() {
		clapping.startSound.stop();
		clapping.startSound.play();

		var scene = new lime.Scene();
		var layer = new lime.Layer().setPosition(clapping.director.getSize().width / 2, clapping.director.getSize().height / 2);

		scene.appendChild(layer);

		clapping.myMode = 0;

		clapping.itsMode = parseInt(Math.random() * 4);

		layer.appendChild(clapping.game0.setPosition(0, 0));

		clapping.lime.builtWithLime(scene);

		clapping.director.replaceScene(scene, lime.transitions.SlideIn);

		clapping.timer.start();
	}, false, this);

	goog.events.listen(this.surgeon, ['mousedown', 'touchstart'], function() {
		clapping.startSound.stop();
		clapping.startSound.play();

		var scene = new lime.Scene();
		var layer = new lime.Layer().setPosition(clapping.director.getSize().width / 2, clapping.director.getSize().height / 2);

		scene.appendChild(layer);

		clapping.myMode = 1;

		clapping.itsMode = parseInt(Math.random() * 4);

		layer.appendChild(clapping.game1.setPosition(0, 0));

		clapping.lime.builtWithLime(scene);

		clapping.director.replaceScene(scene, lime.transitions.SlideIn);

		clapping.timer.start();
	}, false, this);

	goog.events.listen(this.grenadier, ['mousedown', 'touchstart'], function() {
		clapping.startSound.stop();
		clapping.startSound.play();

		var scene = new lime.Scene();
		var layer = new lime.Layer().setPosition(clapping.director.getSize().width / 2, clapping.director.getSize().height / 2);

		scene.appendChild(layer);

		clapping.myMode = 2;

		clapping.itsMode = parseInt(Math.random() * 4);

		layer.appendChild(clapping.game2.setPosition(0, 0));

		clapping.lime.builtWithLime(scene);

		clapping.director.replaceScene(scene, lime.transitions.SlideIn);

		clapping.timer.start();
	}, false, this);

	goog.events.listen(this.armer, ['mousedown', 'touchstart'], function() {
		clapping.startSound.stop();
		clapping.startSound.play();

		var scene = new lime.Scene();
		var layer = new lime.Layer().setPosition(clapping.director.getSize().width / 2, clapping.director.getSize().height / 2);

		scene.appendChild(layer);

		clapping.myMode = 3;

		clapping.itsMode = parseInt(Math.random() * 4);

		layer.appendChild(clapping.game3.setPosition(0, 0));

		clapping.lime.builtWithLime(scene);

		clapping.director.replaceScene(scene, lime.transitions.SlideIn);

		clapping.timer.start();
	}, false, this);

	this.appendChild(this.sniper);
	this.appendChild(this.surgeon);
	this.appendChild(this.grenadier);
	this.appendChild(this.armer);

	this.appendChild(new lime.Label().setSize(320, 12).setFontSize(25).setText('Choose your disteny').setPosition(0, -160));

	this.appendChild(new lime.Label().setSize(320, 12).setText('BEST SCORE').setPosition(0, 140));

	this.appendChild(clapping.lbl.setPosition(0, 160));
};
goog.inherits(clapping.Menu, lime.Layer);
