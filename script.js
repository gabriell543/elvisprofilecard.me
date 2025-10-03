/*--------------------------------------
      Canvas Animation: Red Star with Two Red Spiders
      The animation loops infinitely
    ---------------------------------------*/
const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");
let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

// Star in the center (drawn as a 5-pointed star)
const star = {
  x: width / 2,
  y: height / 2,
  radius: 12,
  color: "#ff0000",
  points: 5,
};

function drawStarShape(cx, cy, spikes, outerRadius, innerRadius, color) {
  let rot = Math.PI / 2 * 3;
  let x = cx;
  let y = cy;
  const step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }
  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

// Red spiders orbiting the star
const spiders = [
  {
    orbitRadius: 80,
    angle: Math.random() * Math.PI * 2,
    speed: 0.02,
    color: "#ff0000",
    size: 10,
    legLength: 6,
  },
  {
    orbitRadius: 120,
    angle: Math.random() * Math.PI * 2,
    speed: 0.015,
    color: "#ff4b4b",
    size: 10,
    legLength: 6,
  },
];

// Draw a spider-like shape
function drawSpider(cx, cy, size, color, legLength) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;

  // Body (circle)
  ctx.arc(cx, cy, size / 2, 0, Math.PI * 2);
  ctx.fill();

  // Legs (simple lines)
  const legAngles = [-Math.PI / 4, -Math.PI / 8, Math.PI / 8, Math.PI / 4];
  legAngles.forEach((angle) => {
    const x1 = cx + Math.cos(angle) * (size / 2);
    const y1 = cy + Math.sin(angle) * (size / 2);
    const x2 = cx + Math.cos(angle) * (size / 2 + legLength);
    const y2 = cy + Math.sin(angle) * (size / 2 + legLength);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  });
}

// Animate the canvas
function animate() {
  ctx.clearRect(0, 0, width, height);

  // Draw star
  drawStarShape(star.x, star.y, star.points, star.radius, star.radius / 2, star.color);

  // Draw spiders and update their positions
  spiders.forEach((spider) => {
    spider.angle += spider.speed;
    const x = star.x + Math.cos(spider.angle) * spider.orbitRadius;
    const y = star.y + Math.sin(spider.angle) * spider.orbitRadius;
    drawSpider(x, y, spider.size, spider.color, spider.legLength);
  });

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
