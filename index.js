const canvas = document.querySelector("#stars");
const ctx = canvas.getContext("2d");
console.log(ctx);

let width = 0
let height = 0

function resize() {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    width = rect.width;
    height = rect.height;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function createStars(count) {
    const stars = [];

    for (let i = 0; i < count; i++) {
        stars.push({
            x: Math.random(),
            y: Math.random(),
            size: 0.4 + Math.random() * 1.1,
            speed: 0.2 + Math.random() * 0.8
        });
    }
    return stars;
}

const stars = createStars(100);


function draw() {
    ctx.clearRect(0, 0, width, height);

    for(const star of stars) {
        ctx.globalAlpha = 0.3 + star.speed * 0.7;
        ctx.fillStyle = "#eeeae0";

        ctx.beginPath();
        ctx.arc(star.x * width, star.y * height, star.size, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.globalAlpha = 1;
}

let last = null;

function update(dt) {
  for (const star of stars) {
    star.y -= star.speed * 0.05 * dt;
    if (star.y < 0) star.y += 1;
  }
}

function frame(now) {
  if (last === null) last = now;
  const dt = (now - last) / 1000;
  last = now;

  update(dt);
  draw();
  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);

const resizeObserver = new ResizeObserver(() => resize());
resizeObserver.observe(canvas);