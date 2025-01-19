const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const PI = Math.PI;

canvas.width = innerWidth;
canvas.height = innerHeight;
canvas.style.backgroundColor = "#ADD9F4";
window.addEventListener("resize", () => {
	canvas.width = innerWidth;
	canvas.height = innerHeight;
});

class Snow {
	constructor(x, y, dx, dy, radius, color) {
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
		this.spawnX = this.x;
		this.radius = radius;
		this.color = color;
	}
	draw() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
	}
	update() {
		this.x += this.dx;
		this.y += this.dy;
		this.draw();

		if (this.y > innerHeight) this.y = 0;
		if ((this.x > innerWidth || this.x < 0) && this.y > innerHeight) this.x = this.spawnX;
	}
}

var snows = [];
function createSnow(count) {
	for (let i = 0; i < count; i++) {
		const x = Math.random() * innerWidth;
		const dx = (Math.random() - 0.5) * 2;
		const dy = Math.random() * 3 + 1;
		const radius = Math.random() * 2 + 1;
		snows.push(new Snow(x, -500, dx, dy, radius, "white"));
	}
}

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, innerWidth, innerHeight);
	for (let i = 0; i < snows.length; i++) {
		snows[i].update();
	}
}

createSnow(1000);
animate();
