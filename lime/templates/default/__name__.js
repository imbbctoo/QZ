goog.provide('{name}');

goog.require('lime.Circle');
goog.require('lime.Director');
goog.require('lime.Label');
goog.require('lime.Layer');
goog.require('lime.Scene');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.MoveTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.Spawn');

{name}.start = function() {

	var director = new lime.Director(document.body, 1024, 768),
		scene = new lime.Scene(),

		target = new lime.Layer().setPosition(512, 384),
		circle = new lime.Circle().setSize(150, 150).setFill(255, 150, 0),
		lbl = new lime.Label().setSize(160, 50).setFontSize(30).setText('TOUCH ME!'),
		title = new lime.Label().setSize(800, 70).setFontSize(60).setText('Now move me around!')
			.setOpacity(0).setPosition(512, 80).setFontColor('#999').setFill(200, 100, 0, .1);


	target.appendChild(circle);
	target.appendChild(lbl);

	scene.appendChild(target);
    scene.appendChild(title);

	director.makeMobileWebAppCapable();

	goog.events.listen(target, ['mousedown', 'touchstart'], function(e) {

		target.runAction(new lime.animation.Spawn(
			new lime.animation.FadeTo(.5).setDuration(.2),
			new lime.animation.ScaleTo(1.5).setDuration(.8)
		));

		title.runAction(new lime.animation.FadeTo(1));

		e.startDrag();

		e.swallow(['mouseup', 'touchend'], function() {
			target.runAction(new lime.animation.Spawn(
				new lime.animation.FadeTo(1),
				new lime.animation.ScaleTo(1),
				new lime.animation.MoveTo(512, 384)
			));

			title.runAction(new lime.animation.FadeTo(0));
		});


	});

	director.replaceScene(scene);

};

goog.exportSymbol('{name}.start', {name}.start);
