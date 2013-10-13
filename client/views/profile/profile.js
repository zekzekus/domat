Template.profile.events({
    'submit form': function(e) {
        e.preventDefault();
        var work = $('#workDuration').val();
        var shortB = $('#shortDuration').val();
        var longB = $('#longDuration').val();

        Session.set('tmpWork', work);
        Session.set('tmpShort', shortB);
        Session.set('tmpLong', longB);

        throwSuccess('Settings saved!');
    }
});

Template.profile.helpers({
    work: function() { return Session.get('tmpWork'); },
    shortB: function() { return Session.get('tmpShort'); },
    longB: function() { return Session.get('tmpLong'); }
});
