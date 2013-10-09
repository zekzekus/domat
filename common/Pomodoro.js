var env = Meteor;

Pomodoro = function(options) {
    this.options = options || {};

    this.workDuration = this.options.workDuration || 25 * 60;
    this.shortBreakDuration = this.options.shortBreakDuration || 5 * 60;
    this.longBreakDuration = this.options.longBreakDuration || 15 * 60;
    this.callback = this.options.callback;
    this.__setDefaults();
};

Pomodoro.prototype.__setDefaults = function() {
    this.pomocount = 0;
    this.state = undefined;
    this.intervalHandle = undefined;
    this.setTime(this.workDuration);
    this.updateState();
};

Pomodoro.prototype.setTime = function(value) {
    this.time = value;
    this.callback(this.getPrettyTime());
};

Pomodoro.prototype.getTime = function() {
    return this.time;
};

Pomodoro.prototype.getOptions = function() {
    return this.options;
};

Pomodoro.prototype.start = function() {
    var that = this;
    if (this.intervalHandle === undefined) {
        this.intervalHandle = env.setInterval(function() { that.__start(); }, 1000);
    }
};

Pomodoro.prototype.__start = function() {
    this.setTime(this.getTime() - 1);

    if (this.getTime() === 0) {
        env.clearInterval(this.intervalHandle);
        this.intervalHandle = undefined;
        this.updateState();
        return;
    }
};

Pomodoro.prototype.getPrettyTime = function() {
    mins = Math.floor(this.getTime() / 60);
    secs = this.getTime() % 60;

    mins = mins < 10 ? "0" + mins : mins;
    secs = secs < 10 ? "0" + secs : secs;

    return mins + ':' + secs;
};

Pomodoro.prototype.updateState = function() {
    if (this.state === 'work') {
        if (this.pomocount % 4 === 0) {
            this.state = 'long break';
            this.setTime(this.longBreakDuration);
        } else {
            this.state = 'short break';
            this.setTime(this.shortBreakDuration);
        }
    } else {
        this.state = 'work';
        this.pomocount += 1;
        this.setTime(this.workDuration);
    }
    return;
};

Pomodoro.prototype.reset = function() {
    env.clearInterval(this.intervalHandle);
    this.intervalHandle = undefined;
    this.__setDefaults();
};
