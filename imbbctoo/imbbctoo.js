goog.provide('imbbctoo');

goog.require('imbbctoo.Lime');
goog.require('lime.Director');
goog.require('lime.Label');
goog.require('lime.Layer');
goog.require('lime.Scene');
goog.require('lime.Sprite');
goog.require('lime.fill.LinearGradient');

imbbctoo.start = function() {
	console.log('created by imbbctoo');

	var head = document.getElementsByTagName('head')[0];

	var style = document.createElement('style');
	style.type = 'text/css';

	var css = 'body{background:black;overflow:hidden;}';

	style.appendChild(document.createTextNode(css));

	head.appendChild(style);

	var w = 320;
	var h = window.innerHeight / window.innerWidth * w;
	h = h < 460 ? 460 : h;

	var director = new lime.Director(document.body, w, h);

	var scene = [];
	var layer = [];

	for (var i = 0; i < 4; i++) {
		scene[i] = new lime.Scene();
		layer[i] = new lime.Layer();
		scene[i].appendChild(new lime.Sprite().setSize(director.getSize().width, director.getSize().height).setFill(new lime.fill.LinearGradient().addColorStop(0, '#34c').addColorStop(1, '#0ae')).setPosition(director.getSize().width / 2, director.getSize().height / 2));
		scene[i].appendChild(layer[i].setPosition(17.5, 60));
		scene[i].appendChild(new lime.Label().setText('WELCOME TO MY WORLD!').setFontColor('#fff').setFontSize(20).setPosition(director.getSize().width / 2, 35).setSize(320, 12));
	}

	director.makeMobileWebAppCapable();

	imbbctoo.lime = new imbbctoo.Lime(director.getSize().width / 2, director.getSize().height - 40);

	var name = [];
	name[0] = ['coloroids', 'numrubik', 'blackbox', 'clapping', 'dung2048', 'blackjack'];

	imbbctoo.manage(name[0], layer[0]);
	imbbctoo.lime.builtWithLime(scene[0]);
	director.replaceScene(scene[0]);

	/*var l_p = new lime.Label().setText('<<<').setFontSize(25).setFontColor('#fff');
	layer[0].appendChild(l_p.setPosition(142.5 - 120, 330));

	var l_n = new lime.Label().setText('>>>').setFontSize(25).setFontColor('#fff');
	layer[0].appendChild(l_n.setPosition(142.5 + 120, 330));*/
};

imbbctoo.manage = function(name, layer) {
	var a = [];
	for (var i = 0; i < parseInt(name.length / 4) + 1; i++) {
		for (var j = 0; j < 4; j++) {
			var n = i * 4 + j;
			if (name[n]) {
				a[n] = document.createElement('a');
				a[n].href = 'compiled/' + name[n] + '_c/' + name[n] + '_c.html';
				var img = document.createElement('img');
				var d = 60;
				img.src = 'compiled/' + name[n] + '_c/assets/icon.png';
				img.width = d;
				img.height = d;
				img.hspace = j * (d + 15);
				img.vspace = i * (d + 30);
				a[n].appendChild(img);
				layer.appendChild(a[n]);
				layer.appendChild(new lime.Label().setText(name[n]).setFontColor('#fff').setPosition(img.hspace + d / 2, img.vspace + d + 10));
				goog.events.listen(a[n], 'touchstart', function() {this.click();});
			}
		}
	}
};

goog.exportSymbol('imbbctoo.start', imbbctoo.start);
