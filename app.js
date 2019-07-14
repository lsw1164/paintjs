const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");

canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let isPress = false;
let painting = false;

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(isPress && painting) {
        ctx.lineTo(x,y);
        ctx.stroke();
    } else {
        ctx.beginPath();
        ctx.moveTo(x, y);
    }

}

function runPainting() {
    painting = true;
}

function stopPainting() {
    ctx.closePath();
    painting = false;
}

function onMouseDown(event) {
    isPress = true;
    runPainting();
}

function onMouseUp(event) {
    isPress = false;
    stopPainting();
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("mouseenter", function(event) {
        if(isPress) {
            ctx.beginPath();
            ctx.moveTo(event.offsetX, event.offsetY);
            runPainting();
        }
    });
}

Array.from(colors).forEach(color =>
    color.addEventListener("click", handleColorClick)
);
