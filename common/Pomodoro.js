var env = Meteor;

Pomodoro = function(options) {
    this.options = options || {};

    this.workDuration = this.options.workDuration || 25;
    this.shortBreakDuration = this.options.shortBreakDuration || 5;
    this.longBreakDuration = this.options.longBreakDuration || 15;
    this.pomocount = 0;
    this.state = undefined;
    this.timeoutHandle = undefined;
    this.time = this.workDuration;
    this.updateState();
};

Pomodoro.prototype.getOptions = function() {
    return this.options;
};

Pomodoro.prototype.start = function() {
    var that = this;

    console.log(this.time + ' - ' + this.state + ' - ' + this.pomocount);

    this.time -= 1;

    if (this.time === 0) {
        env.clearTimeout(this.timeoutHandle);
        this.updateState();
        return;
    }
    this.timeoutHandle = env.setTimeout(function() { that.start(); }, 1000);
};

Pomodoro.prototype.getPrettyTime = function() {
    mins = Math.floor(this.time / 60);
    secs = this.time % 60;

    mins = mins < 10 ? "0" + mins : mins;
    secs = secs < 10 ? "0" + secs : secs;

    return mins + ':' + secs;
};

Pomodoro.prototype.updateState = function() {
    if (this.state === 'work') {
        if (this.pomocount % 4 === 0) {
            this.state = 'long break';
            this.time = this.longBreakDuration;
        } else {
            this.state = 'short break';
            this.time = this.shortBreakDuration;
        }
    } else {
        this.state = 'work';
        this.pomocount += 1;
        this.time = this.workDuration;
    }
    return;
};
