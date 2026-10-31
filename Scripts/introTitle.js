function IntroTitle() {
    this.title = new Image();
    this.title.src = "GFX/TitleScreen.png";

    this.titleAnimation = new Animation("GFX/TitleAnimation.png", 5, 2, 60, 56, 10, null);
    this.titleAnimator = new Animator(this.titleAnimation, null);
    this.handleEvents = function() {
    }

    this.rendering = function() {
        ctx.drawImage(this.title, 0, 0);
        this.titleAnimator.applyAnim(314, 70);
    }

    this.select = function() {
        scene = menuScene;
    }
}