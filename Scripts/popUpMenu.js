function PopUpMenu(x, y, width, height, title) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.title = title;
    this.selected = 0;
    this.menuPoints = [];

    this.rendering = function() {
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Render the title
        fontWhite.apply(this.title, this.x + this.width / 2 - this.title.length * 16 / 2, this.y + 30);

        for (var i = 0; i < this.menuPoints.length; i++) {
            if (i === this.selected) {
                fontPurple.apply(this.menuPoints[i].text, this.x + 20, this.y + 60 + i * 30);
            } else {
                fontCyan.apply(this.menuPoints[i].text, this.x + 20, this.y + 60 + i * 30);
            }
        }
    }

    this.selectedUp = function() {
        if (this.selected > 0) {
            this.selected--;
        }
    }

    this.selectedDown = function() {
        if (this.selected < this.menuPoints.length - 1) {
            this.selected++;
        }
    }

    this.select = function() {
        if (this.menuPoints.length > 0) {
            this.menuPoints[this.selected].action();
        }
    }
}