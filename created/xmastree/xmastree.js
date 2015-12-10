goog.provide('xmastree');

goog.require('lime.Director');
goog.require('lime.Scene');

xmastree.start = function() {
	console.log('created by imbbctoo');
	//eval(unescape('%63%6f%6e%73%6f%6c%65%2e%6c%6f%67%28%60%63%72%65%61%74%65%64%20%62%79%20%69%6d%62%62%63%74%6f%6f%60%29'));

	var head = document.getElementsByTagName('head')[0];

	var style = document.createElement('style');
	style.type = 'text/css';

	var css = '*{margin:0 auto;padding:0 auto;}body{background:black;overflow:hidden;}h1{text-align:center;color:green;text-transform:uppercase;}';

	style.appendChild(document.createTextNode(css));

	head.appendChild(style);

	var w = 320;
	var h = window.innerHeight / window.innerWidth * w;
	h = h < 460 ? 460 : h;

	var director = new lime.Director(document.body, w, h);
	var scene = new lime.Scene();

	director.makeMobileWebAppCapable();

	var matrix = document.createElement('canvas');
	matrix.height = h;
	matrix.width = w;
	scene.appendChild(matrix);

	var context = matrix.getContext('2d');

	var drop = [];
	var font_size = 11;
	var columns = matrix.width / font_size;

	for (var i = 0; i < columns; i++) {
		drop[i] = 1;
	}

	function drawMatrix() {
		context.fillStyle = 'rgba(0,0,0,.1)';
		context.fillRect(0, 0, matrix.width, matrix.height);
		context.fillStyle = '#0f0';
		context.font = font_size + 'px';
		var move = parseInt(window.innerHeight / 460 * 4);
		for (var i = 0; i < columns; i++) {
			for (var j = 0; j <= 3; j++) {
				if (i == parseInt((columns - 1) / 2 + j) || i == parseInt((columns - 1) / 2 - j)) {
					context.fillText(Math.floor(Math.random() * 2), i * font_size, (drop[i] + j + move) * font_size);
					if (Math.random() > .85) {
						drop[i] = 0;
					}
				}
			}
			for (var j = 0; j <= 5; j++) {
				if (i == parseInt((columns - 1) / 2 + j) || i == parseInt((columns - 1) / 2 - j)) {
					context.fillText(Math.floor(Math.random() * 2), i * font_size, (drop[i] + j + 5 + move) * font_size);
					if (Math.random() > .85) {
						drop[i] = 0;
					}
				}
			}
			for (var j = 0; j <= 9; j++) {
				if (i == parseInt((columns - 1) / 2 + j) || i == parseInt((columns - 1) / 2 - j)) {
					context.fillText(Math.floor(Math.random() * 2), i * font_size, (drop[i] + j + 12 + move) * font_size);
					if (Math.random() > .85) {
						drop[i] = 0;
					}
				}
			}
			for (var j = 0; j <= 1; j++) {
				for (var k = Math.floor(Math.random() * 5) + 2; k <= 36; k += 5) {
					if (i == parseInt((columns - 1) / 2 + j) || i == parseInt((columns - 1) / 2 - j)) {
						context.fillText(Math.floor(Math.random() * 2), i * font_size, (drop[i] + k + move) * font_size);
						if (Math.random() > .85) {
							drop[i] = 0;
						}
					}
				}
			}
			for (var j = 0; j <= 10; j++) {
				if (i == parseInt((columns - 1) / 2 + j) || i == parseInt((columns - 1) / 2 - j)) {
					context.fillText(Math.floor(Math.random() * 2), i * font_size, (drop[i] + 32 + move) * font_size);
					if (Math.random() > .85) {
						drop[i] = 0;
					}
				}
			}
			context.fillText(Math.floor(Math.random() * 2), i * font_size, drop[i] * font_size);
			if (drop[i] * font_size > (matrix.height * 2 / 3) && Math.random() > .85) {
				drop[i] = 0;
			}
			drop[i]++;
		}
	}
	setInterval(drawMatrix, 40);

	director.replaceScene(scene);

};

goog.exportSymbol('xmastree.start', xmastree.start);
