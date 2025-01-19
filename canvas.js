const canvas = document.querySelector("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;

window.onresize = () => {
	canvas.width = innerWidth;
	canvas.height = innerHeight;
};

const c = canvas.getContext("2d");
const mouse = {
	x: undefined,
	y: undefined,
};

const colors = ["0d0630", "18314f", "384e77", "8bbeb2", "e6f9af"];
var isClicking = false;
window.addEventListener("mousemove", ({ x, y }) => {
	mouse.x = x;
	mouse.y = y;
});

window.addEventListener("mousedown", () => {
	isClicking = true;
});
window.addEventListener("mouseup", () => {
	isClicking = false;
});

var mouseBound = 100;
function Circle(x, y, dx, dy, radius) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.minRadius = radius;
	this.color = `#${colors[Math.floor(Math.random() * colors.length)]}`;

	this.draw = function () {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
	};

	this.update = function () {
		if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
			this.dx = -this.dx;
		}
		if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
			this.dy = -this.dy;
		}

		this.x += this.dx;
		this.y += this.dy;

		if (isClicking) {
			if (mouse.x - this.x < mouseBound && mouse.x - this.x > -mouseBound && mouse.y - this.y < mouseBound && mouse.y - this.y > -mouseBound) {
				if (this.x > mouse.x) this.x -= 5;
				if (this.y > mouse.y) this.y -= 5;

				if (this.x < mouse.x) this.x += 5;
				if (this.y < mouse.y) this.y += 5;
			}
		} else {
		}

		this.draw();
	};
}

var circles = [];

for (let i = 0; i < 1000; i++) {
	var radius = Math.random() * 8 + 3;
	var x = Math.random() * (innerWidth - radius * 2) + radius;
	var y = Math.random() * (innerHeight - radius * 2) + radius;
	var dx = (Math.random() - 0.5) * 2;
	var dy = (Math.random() - 0.5) * 2;

	var circle = new Circle(x, y, dx, dy, radius, "blue");
	circles.push(circle);
}

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, innerWidth, innerHeight);
	if (isClicking) {
		c.beginPath();
		c.strokeRect(mouse.x - mouseBound, mouse.y - mouseBound, mouseBound * 2, mouseBound * 2);
		c.strokeStyle = "black";
		c.stroke();
	}
	for (var i = 0; i < circles.length; i++) {
		circles[i].update();
	}
}

animate();
