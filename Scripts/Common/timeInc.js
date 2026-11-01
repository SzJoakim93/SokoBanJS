function TimeInc(font) {
    this.m = 0;
    this.s = 0;
    this.font = font;
    this.timeoutEvent = new TimeoutEvent(30, function(obj) { obj.increase() }, this, true);
    this.timeoutEvent.launch();
    
    this.reset = function(m, s) {
        this.m = m;
        this.s = s;
    }

    this.increase = function() {
        this.s++;
        if (this.s > 59) {
            this.m++;
            this.s = 0;
        }
    }

    this.handleEvent = function() {
        this.timeoutEvent.handleEvent();
    }

    this.rendering = function(x, y) {
        var timeString = this.m.toString() + ":" + (this.s < 10 ? "0" : "") + this.s.toString();
        this.font.apply(timeString, x, y);
    }
}