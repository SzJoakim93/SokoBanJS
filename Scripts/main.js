var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var fontWhite = new Font("GFX/Fonts.png", 10, 9, 16, 16);
var fontCyan = new Font("GFX/FontsCyan.png", 10, 9, 16, 16);
var fontPurple = new Font("GFX/FontsPurple.png", 10, 9, 16, 16);

var introTitleScene = new IntroTitle();
var menuScene = new Menu();
var inGameScene = new InGame();

var scene = introTitleScene;

var TILE_SIZE_X = 32;
var TILE_SIZE_Y = 24;

canvas.width = 640;
canvas.height = 400;

function sizeCanvas() {
    var scaleToFit = Math.min(innerWidth / canvas.width, innerHeight / canvas.height);

    canvas.style.position = "fixed";
    canvas.style.left = "50%";
    canvas.style.top = "50%";
    canvas.style.width = (canvas.width * scaleToFit).toString() + "px";
    canvas.style.height = (canvas.height * scaleToFit).toString() + "px";
    canvas.style.transform = "translate(-50%, -50%)";
}

function getCanvasCoordinates(e) {
    var canvasBounds = canvas.getBoundingClientRect();

    return {
        x: (e.clientX - canvasBounds.left) * canvas.width / canvasBounds.width,
        y: (e.clientY - canvasBounds.top) * canvas.height / canvasBounds.height
    };
}

sizeCanvas();
addEventListener("resize", sizeCanvas);

window.requestAnimationFrame = function() {
    return window.requestAnimationFrame ||
       	window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		function(f) {
			window.setTimeout(f,1e3/60);
		}
}();

var quit = false;

function main() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    scene.handleEvents();
    gamepadButtonDownHandler();
    scene.rendering();
}

limitLoop(main, 30);