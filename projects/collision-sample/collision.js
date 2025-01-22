const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const PI = Math.PI;

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
	x: 0,
	y: 0,
	isDown: false,
};

window.addEventListener("mousedown", () => (mouse.isDown = true));
window.addEventListener("mouseup", () => (mouse.isDown = false));

function getRandomNum(min, max, truncate = false) {
	// (5, 10) 1 * 5 + 5 = 10
	// (5, 10) 0.5 * 5 + 5 = 7.5
	// (5, 10) 0 * 5 + 5 = 5
	const random = Math.random() * (max - min) + min;

	if (truncate) return Math.floor(random);
	return random;
}

// Create a new Class for Player and extend Circle
// Add properties such as health, scores and event emitters
class Circle {
	constructor(x, y, dx, dy, radius, color) {
		this.x = x;
		this.y = y;
		this.velocity = {
			x: dx,
			y: dy,
		};
		this.radius = radius;
		this.color = color;
	}
	draw() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
		c.closePath();
	}
	update(circles) {
		this.draw();
		if (this.x - this.radius <= 0 || this.x + this.radius > innerWidth) this.velocity.x = -this.velocity.x;
		if (this.y - this.radius < 0 || this.y + this.radius > innerHeight) this.velocity.y = -this.velocity.y;
		this.x += this.velocity.x;
		this.y += this.velocity.y;
		for (let j = 0; j < circles.length; j++) {
			if (this === circles[j]) continue;
			if (distance(this.x, this.y, circles[j].x, circles[j].y) - (this.radius + circles[j].radius) < 0) {
				if (this.radius > circles[j].radius) {
					this.radius += circles[j].radius * 0.1;
					circles.splice(j, 1);
				}
			}
		}
	}
}

// Get distance of p1 from p2
function distance(x1, y1, x2, y2) {
	// We flip it so the sign makes sense in 2d coordinate
	const xDist = x2 - x1;
	const yDist = y2 - y1;
	return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

window.addEventListener("mousemove", ({ clientX, clientY }) => {
	mouse.x = clientX;
	mouse.y = clientY;
});

window.addEventListener("resize", () => {
	canvas.width = innerWidth;
	canvas.height = innerHeight;
});

const circles = [];

const player = new Circle(innerWidth / 2, innerHeight / 2, 0, 0, 5);
player.color = "orange";
circles.push(player);

for (let i = 0; i < 500; i++) {
	let radius = getRandomNum(3, 8);
	let x = getRandomNum(radius, innerWidth - radius);
	let y = getRandomNum(radius, innerHeight - radius);
	let vx = (Math.random() - 0.5) * 1;
	let vy = (Math.random() - 0.5) * 1;
	if (i !== 0) {
		for (let j = 0; j < circles.length; j++) {
			if (distance(x, y, circles[j].x, circles[j].y) - (radius + circles[j].radius) < 0) {
				x = getRandomNum(radius, innerWidth - radius);
				y = getRandomNum(radius, innerHeight - radius);
				j = -1;
			}
		}
		circles.push(new Circle(x, y, vx, vy, radius, `hsl(${i % 360}, 50%, 50%)`));
	}
}

const keypress = {
	a: false,
	w: false,
	d: false,
	s: false,
};

window.addEventListener("keydown", (event) => {
	if (event.key === "a" || event.key === "A") keypress.a = true;
	if (event.key === "w" || event.key === "W") keypress.w = true;
	if (event.key === "d" || event.key === "D") keypress.d = true;
	if (event.key === "s" || event.key === "S") keypress.s = true;
});

window.addEventListener("keyup", (event) => {
	if (event.key === "a" || event.key === "A") keypress.a = false;
	if (event.key === "w" || event.key === "W") keypress.w = false;
	if (event.key === "d" || event.key === "D") keypress.d = false;
	if (event.key === "s" || event.key === "S") keypress.s = false;
});

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, innerWidth, innerHeight);
	const { w, a, s, d } = keypress;
	c.font = "15px Montserrat";
	c.fillText("Player", player.x, player.y - player.radius);
	if (a) player.x -= 1;
	if (d) player.x += 1;
	if (w) player.y -= 1;
	if (s) player.y += 1;

	circles.forEach((circle) => circle.update(circles));
}

animate();
