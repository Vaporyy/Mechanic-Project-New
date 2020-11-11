var canvasContainer = document.getElementById('play_area');
var offsetLeft, offsetTop;
var stageWidth, stageHeight;
var canvas = document.getElementById('element_area');
var ctx = canvas.getContext('2d');
var gravity = 1;
window.addEventListener('resize', resizeCanvas);
canvas.addEventListener('mousedown', onMouseDown);
canvas.addEventListener('mouseup', onMouseUp);
canvas.addEventListener('mouseleave', onMouseUp);
resizeCanvas();
var disks = [];
var disksNum = 1;
var isMouseDown = false;
var mouseX = 0, mouseY = 0;
var draggedDisk = null;


function onMouseDown(event){
    mouseX = event.clientX - offsetLeft;
    mouseY = event.clientY - offsetTop;

    isMouseDown = true;
    var disk = new Water(mouseX, mouseY, 48);
    disks.push(disk);
}

function onMouseUp(){
    isMouseDown = false;
    canvas.removeEventListener('mousemove', onDragDisk);
    draggedDisk = null;
}

function onDragDisk(event){
    mouseX = event.clientX - offsetLeft;
    mouseY = event.clientY - offsetTop;
}

loop = function(){
    //draws the disk
    ctx.clearRect(0,0,2000,2000);
    for(var i = 0; i < disks.length; i++){
        //console.log(disks[i]);
        disks[i].checkAllCollisions();
        disks[i].update();
        disks[i].manageInput();
        disks[i].draw();
    }
    window.requestAnimationFrame(loop);
};


function resizeCanvas() {
    var cs = window.getComputedStyle(canvasContainer);
    stageWidth = canvas.width = parseInt(cs.getPropertyValue('width'), 10);
    stageHeight = canvas.height = parseInt(cs.getPropertyValue('height'), 10);
    offsetLeft = canvasContainer.offsetLeft;
    offsetTop = canvasContainer.offsetTop;
}

window.requestAnimationFrame(loop);