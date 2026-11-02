document.addEventListener("click", clickHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
    if (e.target && e.target.closest && e.target.closest(".touch-button")) {
        return;
    }

    var rect = canvas.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
        var x = (e.clientX - rect.left) * canvas.width / rect.width;
        var y = (e.clientY - rect.top) * canvas.height / rect.height;

        if (scene.mouseMove) {
            scene.mouseMove(x, y);
        }
    }
}

function clickHandler(e) {
    canvas.requestPointerLock();
    if (e.target && e.target.closest && e.target.closest(".touch-button")) {
        return;
    }
    var rect = canvas.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
        var x = (e.clientX - rect.left) * canvas.width / rect.width;
        var y = (e.clientY - rect.top) * canvas.height / rect.height;
        if (scene.mouseClick) {
            scene.mouseClick(x, y);
        }
    }
}
