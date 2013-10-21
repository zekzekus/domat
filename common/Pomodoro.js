var env = Meteor;

Pomodoro = function(options) {
    this.options = options || {};

    this.workDuration = this.options.workDuration || 25 * 60;
    this.shortBreakDuration = this.options.shortBreakDuration || 5 * 60;
    this.longBreakDuration = this.options.longBreakDuration || 15 * 60;
    this.onCountdown = this.options.onCountdown || function() {};
    this.onWorkStart = this.options.onWorkStart || function() {};
    this.onWorkFinish = this.options.onWorkFinish || function() {};
    this.onShortBreakStart = this.options.onShortBreakStart || function() {};
    this.onShortBreakFinish = this.options.onShortBreakFinish || function() {};
    this.onLongBreakStart = this.options.onLongBreakStart || function() {};
    this.onLongBreakFinish = this.options.onLongBreakFinish || function() {};
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
    this.onCountdown();
};

Pomodoro.prototype.getTime = function() {
    return this.time;
};

Pomodoro.prototype.getPrettyState = function() {
    if (this.state === 'work') {
        return 'Working!';
    }
    if (this.state === 'short break') {
        return 'Short Break';
    }
    if (this.state === 'long break') {
        return 'Long Break';
    }
};

Pomodoro.prototype.getPercent = function() {
    var duration;
    if (this.state === 'work') {
        duration = this.workDuration;
    } else if (this.state === 'short break') {
        duration = this.shortBreakDuration;
    } else if (this.state === 'long break') {
        duration = this.longBreakDuration;
    }

    return Math.floor(100 - (100 * this.time / duration));
};

Pomodoro.prototype.getOptions = function() {
    return this.options;
};

Pomodoro.prototype.start = function() {
    var that = this;
    if (this.intervalHandle === undefined) {
        this.intervalHandle = env.setInterval(function() {
            that.__start();
        }, 1000);
        this.__callStartCallbacks();
    }
};

Pomodoro.prototype.__start = function() {
    this.setTime(this.getTime() - 1);

    if (this.getTime() === 0) {
        this.__callFinishCallbacks();
        this.__clearInterval();
        this.updateState();
        return;
    }
};

Pomodoro.prototype.__callStartCallbacks = function() {
    switch (this.state) {
        case 'work':
            this.onWorkStart();
            break;
        case 'short break':
            this.onShortBreakStart();
            break;
        case 'long break':
            this.onLongBreakStart();
            break;
        default: break;
    }
};

Pomodoro.prototype.__callFinishCallbacks = function() {
    switch (this.state) {
        case 'work':
            this.onWorkFinish();
            break;
        case 'short break':
            this.onShortBreakFinish();
            break;
        case 'long break':
            this.onLongBreakFinish();
            break;
        default: break;
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
    this.__clearInterval();
    this.__setDefaults();
};

Pomodoro.prototype.stop = function() {
    this.__clearInterval();
};

Pomodoro.prototype.__clearInterval = function() {
    env.clearInterval(this.intervalHandle);
    this.intervalHandle = undefined;
};

pomodoro = undefined;

initPomodoro = function() {
    var settings = Settings.findOne({user_id: Meteor.user()._id});

    if (!settings) {
        settings = {
            workDuration: undefined,
            shortBreakDuration: undefined,
            longBreakDuration: undefined
        };
    }

    if (pomodoro === undefined) {
        pomodoro = new Pomodoro({
            workDuration: settings.workDuration,
            shortBreakDuration: settings.shortBreakDuration,
            longBreakDuration: settings.longBreakDuration,
            onCountdown: function() {
                Session.set('timer', this.getPrettyTime());
                Session.set('percent', this.getPercent());
                Session.set('state', this.getPrettyState());
                document.title = this.getPrettyTime();
            },
            onWorkFinish: function() {
                var linked_id = Session.get('linked_id');
                if (linked_id !== undefined) {
                    var linked_task = Tasks.findOne({_id: linked_id});
                    Tasks.update(linked_id, {$set: {
                        completed_pomodoros: linked_task.completed_pomodoros + 1
                    }});
                }
            }
        });
    }
};
