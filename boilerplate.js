const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const PI = Math.PI;

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
	x: 0,
	y: 0,
};

function getRandomNum(min, max, truncate) {
	// (5, 10) 1 * 5 + 5 = 10
	// (5, 10) 0.5 * 5 + 5 = 7.5
	// (5, 10) 0 * 5 + 5 = 5
	const random = Math.random() * (max - min) + min;

	if (truncate) return Math.floor(random);
	return random;
}

window.addEventListener("mousemove", ({ clientX, clientY }) => {
	mouse.x = clientX;
	mouse.y = clientY;
});

window.addEventListener("resize", () => {
	canvas.width = innerWidth;
	canvas.height = innerHeight;
});

function animate() {
	requestAnimationFrame(animate);
}

animate();
