function Menu() {
    this.selectedLevel = 0;

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
            if (this.selectedLevel >= 14) {
                this.selectedLevel -= 14;
            }
        }

        this.selectRight = function() {
            if (this.selectedLevel < unlockedLevels - 14) {
                this.selectedLevel += 14;
            }
        }

        this.select = function() {
            scene = inGameScene;
            inGameScene.loadLevel(this.selectedLevel);
        }
    }

    this.rendering = function() {
        for (var i = 0; i < LEVELS.length; i++) {
            if (i === this.selectedLevel) {
                fontPurple.apply("L" + (i + 1).toString(), 50 + Math.floor(i / 14) * 150, 25 + (i % 14) * 30);
                continue;
            } else if (i < unlockedLevels) {
                fontCyan.apply("L" + (i + 1).toString(), 50 + Math.floor(i / 14) * 150, 25 + (i % 14) * 30);
            } else {
                fontWhite.apply("L" + (i + 1).toString(), 50 + Math.floor(i / 14) * 150, 25 + (i % 14) * 30);
            }
        }
    }
}