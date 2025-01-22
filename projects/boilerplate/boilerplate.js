// CANVAS BOILERPLATE - ARCHITECTURE
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const PI = Math.PI;

canvas.width = innerWidth;
canvas.height = innerHeight;

// MAIN PROGRAM
// -- Global Variables here --
const mouse = {
	x: undefined,
	y: undefined,
};

const screen = {
	xCenter: innerWidth * 0.5,
	yCenter: innerHeight * 0.5,
};

let circles = [];

// MAIN FUNCTIONS HERE
// -- This is where you can make objects --
function init() {
	// object/preparation logic

	// EXAMPLE, replace with your own
	for (let i = 0; i < 10; i++) {
		circles.unshift(new Circle(screen.xCenter, screen.yCenter, 0, 0, i * 5, `hsl(${getRandomNum(0, 360, true)}, ${i * 10}%, ${i * 10}%)`));
	}
}

// This function executes every frame as fast as possible
function animate() {
	requestAnimationFrame(animate);
	// animation logic

	// EXAMPLE, replace with your own
	circles.forEach((circle) => circle.update());
}

// Classes/Objects

// EXAMPLE, replace with your own
class Circle {
	// EXAMPLE, replace with your own
	constructor(x, y, dx, dy, radius, color) {
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
		this.i = 1;
		this.trueRadius = radius;
		this.radius = radius;
		this.color = color;
	}
	// Draw on screen
	draw() {
		// EXAMPLE, replace with your own
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
		c.closePath();
	}
	// Updates the data of this object
	update() {
		// EXAMPLE, replace with your own
		this.x += this.dx;
		this.y += this.dy;
		this.radius += this.i;
		if (this.radius < 0 || this.radius >= this.trueRadius * 5) this.i = -this.i;
		this.draw();
	}
}

// UTILITIES

// usage: getRandomNum(0, 10, false)
function getRandomNum(min, max, noDecimal) {
	const random = Math.random() * (max - min) + min;

	if (noDecimal) return Math.floor(random);
	return random;
}

// EVENT LISTENERS
(() => {
	window.addEventListener("resize", () => {
		canvas.width = innerWidth;
		canvas.height = innerHeight;

		// Initialize objects when resized()
		init();
	});

	window.addEventListener("mousemove", ({ clientX, clientY }) => {
		mouse.x = clientX;
		mouse.y = clientY;
		screen.xCenter = innerWidth * 0.5; // Multiplication is faster than division
		screen.yCenter = innerHeight * 0.5;
	});
})();

// INVOKE
init();
animate();
