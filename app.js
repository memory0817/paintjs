const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c"; //언제 이런 변수를 만드냐면 반복되는 행위가 생기기 시작할때(라고 니콜라스는 스스로약속했다고함)
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;



function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    //console.log(x,y);
    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    }else {
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}


// function onMouseUp(event) {
//     stopPainting();
// }

// function onMouseLeave(event) {
//     stopPainting();
// }

function handleColorClick(event){
    //console.log(event.target.style);
    const color = event.target.style.backgroundColor;
    //console.log(color);
    ctx.strokeStyle = color;
    ctx.fillStyle = ctx.strokeStyle;
}


function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick() {
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}


function handleCanvasClick() {
    if(filling) {
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }
}

function handleCM(event) {
    event.preventDefault();
}

function handleSaveClick(){
    const image = canvas.toDataURL(); //"image/png" 확장자명을 바꾸면 타입이 바뀐다. 기본은 png
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[🎨]";
    //console.log(link);
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}





Array.from(colors).forEach(color =>
    color.addEventListener("click",handleColorClick)
);



if(range) {
    range.addEventListener("input", handleRangeChange);
};


if(mode){
    mode.addEventListener("click", handleModeClick);
}


if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}


/*
Array.from(colors).forEach(potato =>
    potato.addEventListener("click",handleColorClick)
);
potato로 해도된다. 상관없다. 그냥 그 array 안에 있는 각각의 아이템들을 대표하는 것뿐이다. 각각의 div일 뿐이다.
*/

