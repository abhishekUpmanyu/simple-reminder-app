import Reminder from "./Reminder.js";
import RemindersListBinding from "./RemindersListBinding.js";

const remindersList = document.getElementById('reminders-container');
const remindersListBinding = new RemindersListBinding(remindersList);

function showAddReminderPopUp() {
    var popUp = document.getElementById('pop-up-container');
    popUp.style.display = 'block';
}

function hideAddReminderPopUp() {
    var popUp = document.getElementById('pop-up-container');
    popUp.style.display = 'none';
}

function addReminder() {
    var title = document.getElementById('reminder-title-field').value;
    var description = document.getElementById('reminder-description-field').value;
    var reminder = new Reminder(title, description, '10:20PM');
    remindersListBinding.addReminder(reminder);
    hideAddReminderPopUp();
}

function editReminder() {

}

function deleteReminder() {

}

function refreshTime() {
    var bigTime = document.getElementById('big-time');
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var timeString = `${hours}:${minutes}:${seconds}`;
    bigTime.innerHTML = timeString;
}

// Interval Events
setInterval(refreshTime, 1000);

// Binding Events
var newReminderButton = document.getElementById('new-reminder-button');
newReminderButton.addEventListener('click', showAddReminderPopUp, false)

var submitNewReminderButton = document.getElementById('submit-new-reminder-button');
submitNewReminderButton.addEventListener('click', addReminder, false);