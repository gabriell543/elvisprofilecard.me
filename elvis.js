/*--------------------------------------
      Canvas Animation: Red Star with Two Red Spiders
      The animation loops infinitely
    ---------------------------------------*/
const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");
let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

// Star in the center
const star = { x: width / 2, y: height / 2, radius: 6, color: "#ff0000" };

// Red spiders (circles) chasing the star
const spiders = [
  {
    x: Math.random() * width,
    y: Math.random() * height,
    radius: 10,
    speed: 1.5,
    color: "#ff0000",
  },
  {
    x: Math.random() * width,
    y: Math.random() * height,
    radius: 10,
    speed: 1.2,
    color: "#ff4b4b",
  },
];

// Draw the star
function drawStar() {
  ctx.beginPath();
  ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
  ctx.fillStyle = star.color;
  ctx.fill();
}

// Draw the spiders and move them toward the star
function drawSpiders() {
  spiders.forEach((spider) => {
    ctx.beginPath();
    ctx.arc(spider.x, spider.y, spider.radius, 0, Math.PI * 2);
    ctx.fillStyle = spider.color;
    ctx.fill();

    // Move toward star
    const dx = star.x - spider.x;
    const dy = star.y - spider.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    spider.x += (dx / dist) * spider.speed;
    spider.y += (dy / dist) * spider.speed;
  });
}

// Animate the canvas
function animate() {
  ctx.clearRect(0, 0, width, height);
  drawStar();
  drawSpiders();
  requestAnimationFrame(animate);
}

animate();

// Handle window resizing
window.addEventListener("resize", () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  star.x = width / 2;
  star.y = height / 2;
});
