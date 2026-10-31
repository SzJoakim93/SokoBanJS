function Level() {
    this.boxImage = new Image();
    this.boxImage.src = "GFX/Box.png";
    this.boxGoalImage = new Image();
    this.boxGoalImage.src = "GFX/BoxOnGoal.png";
    this.boxCompleteEffectImage = new Image();
    this.boxCompleteEffectImage.src = "GFX/BoxCompleteEffect.png";
    this.wallImage = new Image();
    this.wallImage.src = "GFX/Wall.png";
    this.goalImage = new Image();
    this.goalImage.src = "GFX/Goal.png";

    this.walkingSnd = new Sound("SFX/Walking.mp3");
    this.levelCompleteSnd = new Sound("SFX/LevelComplete.mp3");

    this.player = new Player();
    this.playerCoords = { x: 0, y: 0 };
    this.pushingBoxCoords = { x: -1, y: -1 };
    this.goalCount = 0;

    this.offsetX = 0;
    this.offsetY = 0;

    this.completeTimeOut = new TimeoutEvent(100, function() {
        inGameScene.currentPopupMenu = inGameScene.completeMenu;
    }, this);
    
    this.load = function(levelIndex) {
        this.level = [];
        for (var i = 0; i < LEVELS[levelIndex].length; i++) {
            for (var j = 0; j < LEVELS[levelIndex][i].length; j++) {
                if (!this.level[i]) this.level[i] = [];
                this.level[i][j] = LEVELS[levelIndex][i][j];

                if (this.level[i][j] === '@') {
                    this.playerCoords.x = j;
                    this.playerCoords.y = i;
                }
                if (this.level[i][j] === '.') {
                    this.goalCount++;
                }
            }
        }

        this.offsetX = (canvas.width - this.getMaxWidth() * TILE_SIZE_X) / 2;
        this.offsetY = (canvas.height - this.level.length * TILE_SIZE_Y) / 2;
    }

    this.move = function(moveX, moveY) {
        if (this.player.isMoving()) return;

        var nextX = this.playerCoords.x + moveX;
        var nextY = this.playerCoords.y + moveY;
        var boxNextX = nextX + moveX;
        var boxNextY = nextY + moveY; 

        if (this.isEmpty(nextX, nextY) || (this.isBox(nextX, nextY) && this.isEmpty(boxNextX, boxNextY))) {
            var pushingBox = this.isBox(nextX, nextY);

            this.setEmpty(this.playerCoords.x, this.playerCoords.y);

            if (pushingBox) {
                this.pushingBoxCoords.x = boxNextX;
                this.pushingBoxCoords.y = boxNextY;
                this.moveBox(nextX, nextY, boxNextX, boxNextY);
            }

            this.playerCoords.x = nextX;
            this.playerCoords.y = nextY;
            this.setPlayer(nextX, nextY);
            this.player.move(moveX, moveY, pushingBox);

            if(this.isLevelCompleted()) {
                this.completeTimeOut.launch();
                this.levelCompleteSnd.play();
            }

            this.walkingSnd.play();
        }
    }

    this.moveBox = function(currentX, currentY, boxNextX, boxNextY) {
        this.setBox(boxNextX, boxNextY);
        this.setEmpty(currentX, currentY);
    }

    this.handleEvents = function() {
        this.player.handleEvents();
        if (!this.player.isMoving() && this.pushingBoxCoords.x !== -1 && this.pushingBoxCoords.y !== -1) {
            this.pushingBoxCoords.x = -1;
            this.pushingBoxCoords.y = -1;
        }

        this.completeTimeOut.handleEvent();
    }

    this.rendering = function() {
        ctx.fillStyle = "#54fcfc";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < this.level.length; i++) {
            for (var j = 0; j < this.level[i].length; j++) {
                switch (this.level[i][j]) {
                    case '$':
                        if (this.pushingBoxCoords.x === j && this.pushingBoxCoords.y === i) {
                            ctx.drawImage(this.boxImage, j * TILE_SIZE_X + 6 - this.player.moveX + this.offsetX, i * TILE_SIZE_Y + 4 - this.player.moveY + this.offsetY);
                        } else {
                            ctx.drawImage(this.boxImage, j * TILE_SIZE_X + 6 + this.offsetX, i * TILE_SIZE_Y + 4 + this.offsetY);
                        }
                        break;
                    case '@':
                        this.player.rendering(j * TILE_SIZE_X + this.offsetX, i * TILE_SIZE_Y + this.offsetY);
                        break;
                    case '+':
                        ctx.drawImage(this.goalImage, j * TILE_SIZE_X + 6 + this.offsetX, i * TILE_SIZE_Y + 4 + this.offsetY);
                        this.player.rendering(j * TILE_SIZE_X + this.offsetX, i * TILE_SIZE_Y + this.offsetY);
                        break;
                    case '#':
                        ctx.drawImage(this.wallImage, j * TILE_SIZE_X + this.offsetX, i * TILE_SIZE_Y + this.offsetY);
                        break;
                    case '.':
                        ctx.drawImage(this.goalImage, j * TILE_SIZE_X + 6 + this.offsetX, i * TILE_SIZE_Y + 4 + this.offsetY);
                        break;
                    case '*':
                        if (this.pushingBoxCoords.x === j && this.pushingBoxCoords.y === i) {
                            ctx.drawImage(this.goalImage, j * TILE_SIZE_X + 6 + this.offsetX, i * TILE_SIZE_Y + 4 + this.offsetY);
                            ctx.drawImage(this.boxGoalImage, j * TILE_SIZE_X + 6 - this.player.moveX + this.offsetX, i * TILE_SIZE_Y + 4 - this.player.moveY + this.offsetY);
                        } else if (this.completeTimeOut.isLaunched()) {
                            ctx.drawImage(this.completeTimeOut.currentTime % 4 < 2 ? this.boxCompleteEffectImage : this.boxGoalImage, j * TILE_SIZE_X + 6 + this.offsetX, i * TILE_SIZE_Y + 4 + this.offsetY);
                        } else {    
                            ctx.drawImage(this.boxGoalImage, j * TILE_SIZE_X + 6 + this.offsetX, i * TILE_SIZE_Y + 4 + this.offsetY);
                        }
                        break;
                }
            }
        }
    }

    this.isLevelCompleted = function() {
        var boxCount = 0;
        for (var i = 0; i < this.level.length; i++) {
            for (var j = 0; j < this.level[i].length; j++) {
                if (this.level[i][j] === '*') {
                    boxCount++;
                }
            }
        }
        return boxCount === this.goalCount;
    }

    this.isEmpty = function(x, y) {
        return this.level[y][x] === ' ' || this.level[y][x] === '.';
    }

    this.isPlayer = function(x, y) {
        return this.level[y][x] === '@' || this.level[y][x] === '+';
    }

    this.isBox = function(x, y) {
        return this.level[y][x] === '$' || this.level[y][x] === '*';
    }
    
    this.isWall = function(x, y) {
        return this.level[y][x] === '#';
    }

    this.setEmpty = function(x, y) {
        this.level[y][x] = this.level[y][x] === '*' || this.level[y][x] === '+' ? '.' : ' ';
    }

    this.setPlayer = function(x, y) {
        this.level[y][x] = this.level[y][x] === '.' ? '+' : '@';
    }

    this.setBox = function(x, y) {
        this.level[y][x] = this.level[y][x] === '.' ? '*' : '$';
    }

    this.getMaxWidth = function() {
        var maxWidth = 0;
        for (var i = 0; i < this.level.length; i++) {
            if (this.level[i].length > maxWidth) {
                maxWidth = this.level[i].length;
            }
        }
        return maxWidth;
    }
}