const c = document.querySelector("#draw");
const ctx = c.getContext("2d");

c.width = window.innerWidth;
c.height = window.innerHeight;

ctx.strokeStyle = "#BADA55";
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 2;

let isDrawing = false,
  lastX = 0,
  lastY = 0,
  hue = 0,
  direction = true;

function draw(e) {
  if (!isDrawing) return;
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  lastX = e.offsetX;
  lastY = e.offsetY;
  hue++;
  if (hue >= 360) {
    hue = 0;
  }

  if (ctx.lineWidth >= 32 || ctx.lineWidth <= 1) {
    direction = !direction;
  }

  if (direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }
}

c.addEventListener("mousemove", draw);
c.addEventListener("mousedown", (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});
c.addEventListener("mouseup", () => (isDrawing = false));
c.addEventListener("mousedown", () => (isDrawing = true));
c.addEventListener("mouseOUT", () => (isDrawing = false));
