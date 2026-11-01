function Menu() {
    this.elevatorInside = new Image();
    this.elevatorInside.src = "GFX/ElevatorInside.png";
    this.selectedLevel = 0;

    this.isLelevListShown = true;

    this.handleEvents = function() {
        this.selectUp = function() {
            if (this.selectedLevel > 0) {
                this.selectedLevel--;
            }
        }
        this.selectDown = function() {
            if (this.selectedLevel < unlockedLevels - 1) {
                this.selectedLevel++;
            }
        }

        this.selectLeft = function() {
            if (this.selectedLevel >= 10) {
                this.selectedLevel -= 10;
            }
        }

        this.selectRight = function() {
            if (this.selectedLevel < unlockedLevels - 10) {
                this.selectedLevel += 10;
            }
        }

        this.select = function() {
            scene = inGameScene;
            inGameScene.loadLevel(this.selectedLevel);
        }
    }

    this.rendering = function() {
        ctx.drawImage(this.elevatorInside, 0, 0);

        if (this.isLelevListShown) {
            this.renderingLevelList();
        }
    }

    this.renderingLevelList = function() {
        var x = 50;
        var y = 25;
        var width = 500;
        var height = 350;

        ctx.fillStyle = "black";
        ctx.fillRect(x, y, width, height);
        ctx.fillStyle = "white";
        ctx.fillRect(x + 2, y + 2, width - 4, 2);
        ctx.fillRect(x + 2, y + 2, 2, height - 4);
        ctx.fillRect(x + width - 4, y + 2, 2, height - 4);
        ctx.fillRect(x + 2, y + height - 4, width - 4, 2);

        fontWhite.apply("Select level", x + width / 2 - 100, y + 10);

        for (var i = 0; i < LEVELS.length; i++) {
            if (i === this.selectedLevel) {
                fontPurple.apply("L" + (i + 1).toString(), x + 30 + Math.floor(i / 10) * 100, y + 45 + (i % 10) * 30);
                continue;
            } else if (i < unlockedLevels) {
                fontCyan.apply("L" + (i + 1).toString(), x + 30 + Math.floor(i / 10) * 100, y + 45 + (i % 10) * 30);
            } else {
                fontWhite.apply("L" + (i + 1).toString(), x + 30 + Math.floor(i / 10) * 100, y + 45 + (i % 10) * 30);
            }
        }
    }
}