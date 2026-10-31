function IntroTitle() {
    this.title = new Image();
    this.title.src = "GFX/title-screen.png";

    this.handleEvents = function() {
    }

    this.rendering = function() {
        ctx.drawImage(this.title, 0, 0);
    }

    this.select = function() {
        scene = menuScene;
    }
}