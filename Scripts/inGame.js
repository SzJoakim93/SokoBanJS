function InGame() {
    this.levelIndex = 0;
    this.currentLevel = null;
    this.currentLevel = new Level();

    
    this.pauseMenu = new PopUpMenu(canvas.width / 2 - 100, canvas.height / 2 - 100, 200, 200, "Pause");
    this.pauseMenu.menuPoints = [
        { text: "Resume", action: function() { inGameScene.resume(); } },
        { text: "Restart", action: function() { inGameScene.restartLevel(); } },
        { text: "Main Menu", action: function() { inGameScene.goToMainMenu(); } }
    ];

    this.completeMenu = new PopUpMenu(canvas.width / 2 - 100, canvas.height / 2 - 125, 250, 200, "Level Complete");
    this.completeMenu.menuPoints = [
        { text: "Next Level", action: function() { inGameScene.nextLevel(); } },
        { text: "Restart", action: function() { inGameScene.restartLevel(); } },
        { text: "Main Menu", action: function() { inGameScene.goToMainMenu(); } }
    ];

    this.currentPopupMenu = null;

    this.loadLevel = function(levelIndex) {
        this.currentLevelIndex = levelIndex;
        this.currentLevel.load(levelIndex);
        this.currentPopupMenu = null;
    }

    this.nextLevel = function() {
        this.currentLevelIndex++;
        if (this.currentLevelIndex >= LEVELS.length) {
            return;
        }
        if (this.currentLevelIndex > unlockedLevels - 1) {
            incrementUnlockedLevels();
        }
        this.loadLevel(this.currentLevelIndex);
        this.currentPopupMenu = null;
    }

    this.handleEvents = function() {
        if (this.currentLevel) {
            this.currentLevel.handleEvents();
        }
    }

    this.rendering = function() {
        if (this.currentLevel) {
            this.currentLevel.rendering();
        }
        if (this.currentPopupMenu) {
            this.currentPopupMenu.rendering();
        }
    }

    this.selectUp = function() {
        if (this.currentPopupMenu) {
            this.currentPopupMenu.selectedUp();
            return;
        }
        if (this.currentLevel) {
            this.currentLevel.move(0, -1);
        }
    }
    this.selectDown = function() {
        if (this.currentPopupMenu) {
            this.currentPopupMenu.selectedDown();
            return;
        }
        if (this.currentLevel) {
            this.currentLevel.move(0, 1);
        }
    }
    this.selectLeft = function() {
        if (this.currentPopupMenu) return;

        if (this.currentLevel) {
            this.currentLevel.move(-1, 0);
        }
    }
    this.selectRight = function() {
        if (this.currentPopupMenu) return;

        if (this.currentLevel) {
            this.currentLevel.move(1, 0);
        }
    }

    this.select = function() {
        if (this.currentPopupMenu) {
            this.currentPopupMenu.select();
        }
    }

    this.pause = function() {
        this.currentPopupMenu = this.pauseMenu;
    }

    this.resume = function() {
        this.currentPopupMenu = null;
    }

    this.restartLevel = function() {
        if (this.currentLevel) {
            this.currentLevel.load(this.currentLevelIndex);
        }
    }

    this.goToMainMenu = function() {
        scene = menuScene;
    }
}