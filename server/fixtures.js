if (Tasks.find().count() === 0) {
    Tasks.insert({
        description: 'implement secure routing',
        assignee: 'zekus',
        completed_pomodoros: 3,
        completed: false
    });
    Tasks.insert({
        description: 'prepare product documentation',
        assignee: 'hasan',
        completed_pomodoros: 0,
        completed: true
    });
}
