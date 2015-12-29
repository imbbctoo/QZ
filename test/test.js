goog.provide('test');

goog.require('box2d.BodyDef');
goog.require('box2d.CircleDef');
goog.require('box2d.DistanceJointDef');
goog.require('box2d.JointDef');
goog.require('box2d.MouseJointDef');
goog.require('box2d.PolyDef');
goog.require('box2d.PrismaticJointDef');
goog.require('box2d.PulleyJointDef');
goog.require('box2d.RevoluteJointDef');
goog.require('box2d.Vec2');
goog.require('box2d.World');
goog.require('lime.Circle');
goog.require('lime.Director');
goog.require('lime.Layer');
goog.require('lime.Scene');
goog.require('lime.fill.LinearGradient');

test.WIDTH = 600;
test.HEIGHT = 400;

test.start = function() {
	test.director = new lime.Director(document.body, test.WIDTH, test.HEIGHT);

	var gamescene = new lime.Scene();

	var layer = new lime.Layer();
	layer.setPosition(100, 0);
	gamescene.appendChild(layer);

	test.director.replaceScene(gamescene);

	var gravity = new box2d.Vec2(0, 0);
	var bounds = new box2d.AABB();
	bounds.minVertex.Set(-test.WIDTH, -test.HEIGHT);//?
	bounds.maxVertex.Set(2 * test.WIDTH, 2 * test.HEIGHT);//?
	var world = new box2d.World(bounds, gravity, false);

	var length = 5;
	var circleDef = [];
	var cbodyDef = [];
	var circle_body = [];
	var circle = [];
	var x = 250;
	var y = 100;

	for (var i = 0; i < length; i++) {
		circleDef[i] = new box2d.CircleDef();
		circleDef[i].radius = 15;
		circleDef[i].density = 1;
		circleDef[i].restitution = .8;
		circleDef[i].friction = 1;

		cbodyDef[i] = new box2d.BodyDef();
		cbodyDef[i].position.Set(x, y + i * 20);
		cbodyDef[i].angularDamping = .001;//?
		cbodyDef[i].AddShape(circleDef[i]);
		circle_body[i] = world.CreateBody(cbodyDef[i]);

		circle[i] = new lime.Circle().setFill(new lime.fill.LinearGradient().addColorStop(0.49, 200, 0, 0).addColorStop(.5, 0, 0, 250)).setSize(40, 40);
		layer.appendChild(circle[i]);

		circle[i]._body = circle_body[i];
	}

	var ground = new box2d.PolyDef();
	ground.restitution = .9;
	ground.density = 0;
	ground.friction = 1;
//	ground.extents.Set(30, 10);//box version
	ground.SetVertices([[-30, -5], [30, -10], [30, 10], [-30, 10]]); // actually not a box

	var gbodyDef = new box2d.BodyDef();
	gbodyDef.position.Set(220, 310);
	gbodyDef.AddShape(ground);
	var ground_body = world.CreateBody(gbodyDef);

	var box = new lime.Sprite().setFill(0, 100, 0).setSize(60, 20);
	layer.appendChild(box);

	box._body = ground_body;

	var jointDef = [];

	for (var i = 0; i < length; i++) {
		jointDef[i] = new box2d.RevoluteJointDef();

		jointDef[i].lowerAngle = 0.0;
		jointDef[i].upperAngle = 0.0;
		jointDef[i].motorTorque = 0.0;
		jointDef[i].motorSpeed = 0.0;
		jointDef[i].enableLimit = false;
		jointDef[i].enableMotor = false;

		jointDef[i].anchorPoint.Set(x, y);
		jointDef[i].body1 = world.GetGroundBody();
		if (i > 0) {
			jointDef[i].anchorPoint.Set(0, 0);
			jointDef[i].body1 = circle_body[i - 1];
		}
		jointDef[i].body2 = circle_body[i];
		world.CreateJoint(jointDef[i]);
	}

	lime.scheduleManager.schedule(function(dt) {
        //if (dt > 100) dt = 100; // long delays(after pause) cause false collisions
		world.Step(dt / 1000, 3);
		for (var i = 0; i < 5; i++) test.updateFromBody(circle[i]);
		test.updateFromBody(box);
	}, this);

    for (var i = 0; i < length; i++) test.makeDraggable(circle[i], world);
};

test.makeDraggable = function(shape, world) {
	goog.events.listen(shape, ['mousedown', 'touchstart'], function(e) {
		var pos = this.localToParent(e.position); //need parent coordinate system

		var mouseJointDef = new box2d.MouseJointDef();
		mouseJointDef.body1 = world.GetGroundBody();
		mouseJointDef.body2 = shape._body; // using ref created above
		mouseJointDef.target.Set(pos.x, pos.y);
		mouseJointDef.maxForce = 5000 * shape._body.m_mass;
		//mouseJointDef.collideConnected = true;
		//mouseJointDef.dampingRatio = 0;

		var mouseJoint = world.CreateJoint(mouseJointDef);

		e.swallow(['mouseup', 'touchend'], function(e) {
			world.DestroyJoint(mouseJoint);
		});
		e.swallow(['mousemove', 'touchmove'], function(e) {
			var pos = this.localToParent(e.position);
			mouseJoint.SetTarget(new box2d.Vec2(pos.x, pos.y));
		});

	});
};

test.updateFromBody = function(shape) {
	var pos = shape._body.GetCenterPosition();
	var rot = shape._body.GetRotation();
	shape.setRotation(-rot / Math.PI * 180);
	shape.setPosition(pos);
};

goog.exportSymbol('test.start', test.start);
