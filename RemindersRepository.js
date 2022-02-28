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
                    var i = 0
                    while (i<reminders.length) {
                        if (reminders[i].dateTime.getTime() <= reminder.dateTime.getTime()) {
                            break;
                        }
                        i++;
                    }
                    reminders.splice(i, 0, reminder);
                    return i;
                },
                editReminder: function (reminder) {
                    var index = reminders.indexOf(reminder);
                    var newTitle = document.getElementById('edit-reminder-title-field').value;
                    var newDescription = document.getElementById('edit-reminder-description-field').value;
                    var newDateTime = document.getElementById('edit-reminder-date-time-field').value;
                    reminders[index].title = newTitle;
                    reminders[index].description = newDescription;
                    reminders[index].dateTime = newDateTime;
                    return index;
                },
                deleteReminder: function (reminder) {
                    var index = reminders.indexOf(reminder);
                    console.log(index, reminders, reminder);
                    reminders.splice(index, 1);
                    return index;
                },
                deleteSelected: function () {
                    var index = 0;
                    while (index<reminders.length) {
                        if (reminders[index].selected) {
                            reminders.splice(index, 1);
                        } else {
                            index++;
                        }
                    }
                    console.log(reminders);
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