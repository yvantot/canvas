const canvas = document.querySelector("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;
window.onresize = () => {
	canvas.width = innerWidth;
	canvas.height = innerHeight;
};

const c = canvas.getContext("2d");

// c.fillStyle = "rgba(255, 0,0, 0.5)";
// c.fillRect(100, 100, 50, 50);

// c.fillStyle = "rgba(0, 255, 0, 0.5)";
// c.fillRect(140, 100, 50, 50);

// c.fillStyle = "rgba(0, 0, 255, 0.5)";
// c.fillRect(180, 100, 50, 50);

// c.beginPath();
// c.moveTo(50, 50);
// c.lineTo(60, 100);
// c.lineTo(100, 50);
// c.lineTo(50, 50);
// c.strokeStyle = "blue";
// c.stroke();

function Circle(x, y, dx, dy, radius, color) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.color = color;

	this.draw = function () {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.strokeStyle = color;
		c.stroke();
	};

	this.update = function () {
		this.x += this.dx;
		this.y += this.dy;

		if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
			this.dx = -this.dx;
		}
		if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
			this.dy = -this.dy;
		}
		this.draw();
	};
}

var circles = [];

for (let i = 0; i < 10; i++) {
	var radius = 50;
	var x = Math.random() * (innerWidth - radius * 2) + radius;
	var y = Math.random() * (innerHeight - radius * 2) + radius;
	var dx = (Math.random() - 0.5) * 5;
	var dy = (Math.random() - 0.5) * 5;

	var circle = new Circle(x, y, dx, dy, radius, "blue");
	circles.push(circle);
}

function animate() {
	requestAnimationFrame(animate);
	// c.clearRect(0, 0, innerWidth, innerHeight);

	for (var i = 0; i < circles.length; i++) {
		circles[i].update();
	}
}

animate();
