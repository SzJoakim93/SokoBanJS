var keystates = [];

document.addEventListener("keydown", keyDownHandler, true);
document.addEventListener("keyup", keyUpHandler, true);

function keyDownHandler(e) {
  var keyCode = e.keyCode || e.which;
  if (scene.IsInputActive && scene.IsInputActive()) {
    if (keyCode === KEY_BACKSPACE) {
      e.preventDefault();
      scene.InputChar("Backspace");
      return;
    } else if (keyCode === KEY_SPACE) {
      e.preventDefault();
      scene.InputChar(" ");
      return;
    } else if (e.key && e.key.length === 1 && /^[a-z]$/i.test(e.key)) {
      e.preventDefault();
      scene.InputChar(e.key.toUpperCase());
      return;
    } else if (keyCode === KEY_RETURN) {
      e.preventDefault();
      scene.FinishInput();
      return;
    }
  }

  e.preventDefault();
  e.stopPropagation();
  processKeyDown(keyCode);
}

function processKeyDown(keyCode) {
  keystates[keyCode] = true;

  if ((keyCode === KEY_RETURN || keyCode === KEY_SPACE || keyCode === KEY_LSHIFT) && scene.select) {
    scene.select();
  } else if (keyCode === KEY_UP || keyCode === KEY_W && scene.selectUp) {
    scene.selectUp();
  } else if (keyCode === KEY_DOWN || keyCode === KEY_S && scene.selectDown) {
    scene.selectDown();
  } else if (keyCode === KEY_LEFT || keyCode === KEY_A && scene.selectLeft) {
    scene.selectLeft();
  } else if (keyCode === KEY_RIGHT || keyCode === KEY_D && scene.selectRight) {
    scene.selectRight();
  } else if (keyCode === KEY_ESCAPE || keyCode === KEY_P && scene.pause) {
    scene.pause();
  }
}

function keyUpHandler(e) {
  var keyCode = e.keyCode || e.which;
  keystates[keyCode] = false;
}
