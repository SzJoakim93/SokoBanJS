var playerAnimation = new MultipleAnimation("GFX/Player.png", 5, 4, 40, 28, 50);
playerAnimation.animations = [
    { from: 0, to: 0, nextAnim: null, direction: 1, delay: 0 }, //0: standing right
    { from: 1, to: 2, nextAnim: null, direction: 1, delay: 0 }, //1: moving right
    { from: 3, to: 4, nextAnim: null, direction: 1, delay: 0 }, //2: pushing right
    { from: 5, to: 5, nextAnim: null, direction: 1, delay: 0 }, //3: standing left
    { from: 6, to: 7, nextAnim: null, direction: 1, delay: 0 }, //4: moving left
    { from: 8, to: 9, nextAnim: null, direction: 1, delay: 0 }, //5: pushing left
    { from: 10, to: 10, nextAnim: null, direction: 1, delay: 0 }, //6: standing up
    { from: 11, to: 12, nextAnim: null, direction: 1, delay: 0 }, //7: moving up
    { from: 13, to: 14, nextAnim: null, direction: 1, delay: 0 }, //8: pushing up
    { from: 15, to: 15, nextAnim: null, direction: 1, delay: 0 }, //9: standing down
    { from: 16, to: 17, nextAnim: null, direction: 1, delay: 0 }, //10: moving down
    { from: 18, to: 19, nextAnim: null, direction: 1, delay: 0 }  //11: pushing down
];

function Player() {
    this.moveX = 0;
    this.moveY = 0;
    this.animator = new MultipleAnimator(playerAnimation, null);

    this.handleEvents = function() {
        if (this.moveX > 0) {
            this.moveX -= 4;
        } else if (this.moveX < 0) {
            this.moveX += 4;
        }
        if (this.moveY > 0) {
            this.moveY -= 4;
        } else if (this.moveY < 0) {
            this.moveY += 4;
        }

        if (this.moveX === 0 && this.moveY === 0) {
            if (this.animator.currAnim === 1 || this.animator.currAnim === 2) {
                this.animator.switchAnim(0); //0: standing right
            } else if (this.animator.currAnim === 4 || this.animator.currAnim === 5) {
                this.animator.switchAnim(3); //3: standing left
            } else if (this.animator.currAnim === 7 || this.animator.currAnim === 8) {
                this.animator.switchAnim(6); //6: standing up
            } else if (this.animator.currAnim === 10 || this.animator.currAnim === 11) {
                this.animator.switchAnim(9); //9: standing down
            }
        }
    }

    this.rendering = function(x, y) {
        this.animator.applyAnim(x - this.moveX, y - this.moveY);
    }

    this.move = function(x, y, isPushingBox) {
        if (x > 0) {
            if (isPushingBox) {
                this.animator.switchAnim(2); //2: pushing right
            } else {
                this.animator.switchAnim(1); //1: moving right
            }
        } else if (x < 0) {
            if (isPushingBox) {
                this.animator.switchAnim(5); //5: pushing left
            } else {
                this.animator.switchAnim(4); //4: moving left
            }
        } else if (y > 0) {
            if (isPushingBox) {
                this.animator.switchAnim(11); //11: pushing down
            } else {
                this.animator.switchAnim(10); //10: moving down
            }
        } else if (y < 0) {
            if (isPushingBox) {
                this.animator.switchAnim(8); //8: pushing up
            } else {
                this.animator.switchAnim(7); //7: moving up
            }
        }
        this.moveX = x * TILE_SIZE_X;
        this.moveY = y * TILE_SIZE_Y;
    }

    this.isMoving = function() {
        return this.moveX !== 0 || this.moveY !== 0;
    }
}