const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colorPallete = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

let painting = false;
let filling = false;

let x = 0;
let y = 0;
let memX = 0;
let memY = 0;

canvas.width = 640;
canvas.height = 640;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, 640, 640);

ctx.strokeStyle = "black";
ctx.fillStyle = "black";
ctx.lineWidth = 4;

function memOffset(x, y) {
  memX = x;
  memY = y;
}

function handleMouseClick() {
  if (x == memX && y == memY && !filling) {
    ctx.arc(x, y, ctx.lineWidth / 2, 0, Math.PI * 2, false);
    ctx.fill();
  }
}

function startPaint() {
  painting = true;

  if (filling) {
    ctx.fillRect(0, 0, 640, 640);
  } else {
    memOffset(x, y);
  }
}

function stopPaint() {
  painting = false;
}

function onMouseMove(event) {
  x = event.offsetX;
  y = event.offsetY;

  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const width = event.target.value;
  ctx.lineWidth = width;
}

function handleModeClick() {
  if (!filling) {
    filling = true;
    mode.innerText = "Paint";
  } else {
    filling = false;
    mode.innerText = "Fill";
  }
}

function handleContext(event) {
  event.preventDefault();
}

function handleSaveClick(event) {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "myCanvas.png";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPaint);
  canvas.addEventListener("mouseup", stopPaint);
  canvas.addEventListener("mouseleave", stopPaint);
  canvas.addEventListener("click", handleMouseClick);
  canvas.addEventListener("contextmenu", handleContext);
}

Array.from(colorPallete).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (save) {
  save.addEventListener("click", handleSaveClick);
}
