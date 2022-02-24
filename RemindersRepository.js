var RemindersRepository = (function () {
    var instance;

    function RemindersFactory() {
        return (function () {
            var reminders = [];
            return {
                getReminders: function () {
                    return reminders;
                },
                getReminderAtIndex: function(index) {
                    return reminders[index];
                },
                addReminder: function (reminder) {
                    var i = 0;
                    for (i=0; i<reminders.length-1; ++i) {
                        if ((reminders[i].dateTime.getTime() < reminder.dateTime.getTime()) && (reminder.dateTime.getTime() <= reminders[i+1].dateTime.getTime())) {
                            break;
                        }
                    }
                    reminders.splice(i, 0, reminder);
                    return i;
                },
                editReminder: function (reminder, index) {
                    reminders.splice(index, 1, reminder);
                },
                deleteReminder: function (index) {
                    reminders.splice(index, 1);
                },
                toggleReminderSelection: function (index, value) {
                    reminders[index].selected = value;
                },
                toggleAllRemindersSelection: function (value) {
                    var i;
                    for (i=0; i<reminders.length; ++i) {
                        reminders[i].selected = value;
                    }
                }
            };
        })();
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = new RemindersFactory();
                delete instance.constructor;
            }
            return instance;
        }
    }
})();

export default RemindersRepository;