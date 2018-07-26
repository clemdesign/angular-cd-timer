import { Component, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
var CdTimerComponent = (function () {
    function CdTimerComponent(elt, renderer) {
        this.elt = elt;
        this.renderer = renderer;
        // Initialization
        this.onStart = new EventEmitter();
        this.onComplete = new EventEmitter();
        this.onStop = new EventEmitter();
        this.onTick = new EventEmitter();
        this.autoStart = true;
        this.startTime = 0;
        this.endTime = 0;
        this.timeoutId = null;
        this.countdown = false;
        this.format = 'default';
    }
    CdTimerComponent.prototype.ngAfterViewInit = function () {
        this.ngContentNode = this.elt.nativeElement.childNodes[1] ? this.elt.nativeElement.childNodes[1] : this.elt.nativeElement.childNodes[0];
        this.ngContentSchema = this.ngContentNode.nodeValue;
        if (this.autoStart === undefined || this.autoStart === true) {
            this.start();
        }
    };
    CdTimerComponent.prototype.ngOnDestroy = function () {
        this.resetTimeout();
    };
    /**
     * Start the timer
     */
    CdTimerComponent.prototype.start = function () {
        this.initVar();
        this.resetTimeout();
        this.startTickCount();
        this.onStart.emit(this);
    };
    /**
     * Resume the timer
     */
    CdTimerComponent.prototype.resume = function () {
        this.resetTimeout();
        this.startTickCount();
    };
    /**
     * Stop the timer
     */
    CdTimerComponent.prototype.stop = function () {
        this.clear();
        this.onStop.emit(this);
    };
    /**
     * Reset the timer
     */
    CdTimerComponent.prototype.reset = function () {
        this.initVar();
        this.resetTimeout();
        this.clear();
        this.calculateTimeUnits();
        this.renderText();
    };
    /**
     * Get the time information
     * @returns TimeInterface
     */
    CdTimerComponent.prototype.get = function () {
        return {
            seconds: this.seconds,
            minutes: this.minutes,
            hours: this.hours,
            days: this.days,
            timer: this.timeoutId,
            tick_count: this.tickCounter
        };
    };
    CdTimerComponent.prototype.initVar = function () {
        this.startTime = this.startTime || 0;
        this.endTime = this.endTime || 0;
        this.countdown = this.countdown || false;
        this.tickCounter = this.startTime;
        // Disable countdown if start time not defined
        if (this.countdown && this.startTime === 0) {
            this.countdown = false;
        }
        // Determine auto format
        if (!this.format) {
            this.format = (this.ngContentSchema.length > 5) ? 'user' : 'default';
        }
    };
    CdTimerComponent.prototype.resetTimeout = function () {
        if (this.timeoutId) {
            clearInterval(this.timeoutId);
        }
    };
    CdTimerComponent.prototype.renderText = function () {
        var outputText;
        if (this.format === 'user') {
            // User presentation
            var items = {
                'seconds': this.seconds,
                'minutes': this.minutes,
                'hours': this.hours,
                'days': this.days
            };
            outputText = this.ngContentSchema;
            for (var _i = 0, _a = Object.keys(items); _i < _a.length; _i++) {
                var key = _a[_i];
                outputText = outputText.replace('[' + key + ']', items[key].toString());
            }
        }
        else if (this.format === 'intelli') {
            // Intelli presentation
            outputText = '';
            if (this.days > 0) {
                outputText += this.days.toString() + 'day' + ((this.days > 1) ? 's' : '') + ' ';
            }
            if ((this.hours > 0) || (this.days > 0)) {
                outputText += this.hours.toString() + 'h ';
            }
            if (((this.minutes > 0) || (this.hours > 0)) && (this.days === 0)) {
                outputText += this.minutes.toString().padStart(2, '0') + 'min ';
            }
            if ((this.hours === 0) && (this.days === 0)) {
                outputText += this.seconds.toString().padStart(2, '0') + 's';
            }
        }
        else if (this.format === 'hms') {
            // Hms presentation
            outputText = this.hours.toString().padStart(2, '0') + ':';
            outputText += this.minutes.toString().padStart(2, '0') + ':';
            outputText += this.seconds.toString().padStart(2, '0');
        }
        else {
            // Default presentation
            outputText = this.days.toString() + 'd ';
            outputText += this.hours.toString() + 'h ';
            outputText += this.minutes.toString() + 'm ';
            outputText += this.seconds.toString() + 's';
        }
        this.renderer.setValue(this.ngContentNode, outputText);
    };
    CdTimerComponent.prototype.clear = function () {
        this.resetTimeout();
        this.timeoutId = null;
    };
    CdTimerComponent.prototype.calculateTimeUnits = function () {
        if (!this.maxTimeUnit || this.maxTimeUnit === 'day') {
            this.seconds = Math.floor(this.tickCounter % 60);
            this.minutes = Math.floor((this.tickCounter / 60) % 60);
            this.hours = Math.floor((this.tickCounter / 3600) % 24);
            this.days = Math.floor((this.tickCounter / 3600) / 24);
        }
        else if (this.maxTimeUnit === 'second') {
            this.seconds = this.tickCounter;
            this.minutes = 0;
            this.hours = 0;
            this.days = 0;
        }
        else if (this.maxTimeUnit === 'minute') {
            this.seconds = Math.floor(this.tickCounter % 60);
            this.minutes = Math.floor(this.tickCounter / 60);
            this.hours = 0;
            this.days = 0;
        }
        else if (this.maxTimeUnit === 'hour') {
            this.seconds = Math.floor(this.tickCounter % 60);
            this.minutes = Math.floor((this.tickCounter / 60) % 60);
            this.hours = Math.floor(this.tickCounter / 3600);
            this.days = 0;
        }
        this.renderText();
    };
    CdTimerComponent.prototype.startTickCount = function () {
        var that = this;
        that.timeoutId = setInterval(function () {
            var counter;
            if (that.countdown) {
                // Compute finish counter for countdown
                counter = that.tickCounter;
                if (that.startTime > that.endTime) {
                    counter = that.tickCounter - that.endTime - 1;
                }
            }
            else {
                // Compute finish counter for timer
                counter = that.tickCounter - that.startTime;
                if (that.endTime > that.startTime) {
                    counter = that.endTime - that.tickCounter - 1;
                }
            }
            that.calculateTimeUnits();
            var timer = {
                seconds: that.seconds,
                minutes: that.minutes,
                hours: that.hours,
                days: that.days,
                timer: that.timeoutId,
                tick_count: that.tickCounter
            };
            that.onTick.emit(timer);
            if (counter < 0) {
                that.stop();
                that.onComplete.emit(that);
                return;
            }
            if (that.countdown) {
                that.tickCounter--;
            }
            else {
                that.tickCounter++;
            }
        }, 1000); // Each seconds
    };
    return CdTimerComponent;
}());
export { CdTimerComponent };
CdTimerComponent.decorators = [
    { type: Component, args: [{
                selector: 'cd-timer',
                template: ' <ng-content></ng-content>'
            },] },
];
/** @nocollapse */
CdTimerComponent.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: Renderer2, },
]; };
CdTimerComponent.propDecorators = {
    'startTime': [{ type: Input },],
    'endTime': [{ type: Input },],
    'countdown': [{ type: Input },],
    'autoStart': [{ type: Input },],
    'maxTimeUnit': [{ type: Input },],
    'format': [{ type: Input },],
    'onStart': [{ type: Output },],
    'onStop': [{ type: Output },],
    'onTick': [{ type: Output },],
    'onComplete': [{ type: Output },],
};
//# sourceMappingURL=cd-timer.js.map