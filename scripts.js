import { createUUID } from "./helpers.js";
import Reminder from "./Reminder.js";
import ReminderPopUpBinding from "./ReminderPopUpBinding.js";
import RemindersListBinding from "./RemindersListBinding.js";
import RemindersRepository from "./RemindersRepository.js";

var remindersRepository = RemindersRepository.getInstance();

const remindersList = document.getElementById('reminders-container');
const remindersListBinding = new RemindersListBinding(remindersList);

const reminderPopUpBinding = new ReminderPopUpBinding();

function addReminder() {
    var uuid = createUUID();
    var titleElement = document.getElementById('reminder-title-field');
    var descriptionElement = document.getElementById('reminder-description-field');
    var dateTimeElement = document.getElementById('reminder-date-time-field');

    // Initializing New Reminder Object
    var reminder = new Reminder(uuid, titleElement.value, descriptionElement.value, new Date(dateTimeElement.value));

    // Defining Reminder Data Object Methods
    var onDismiss = (function (reminder) {
        return function () {
            var index = remindersRepository.deleteReminder(reminder);
            remindersListBinding.deleteReminderAtIndex(index);
            reminderPopUpBinding.dismissReminderPopUp();
            refreshUI();
        }
    })(reminder);
    var onTimeout = (function (reminder) {
        return function () {
            reminderPopUpBinding.showReminderPopUp(reminder);
        }
    })(reminder);
    var onUpdate = (function (reminder) {
        return function () {
            reminderPopUpBinding.showAddReminderPopUp(reminder);
        }
    })(reminder);
    var onDelete = (function (reminder) {
        return function () {
            var index = remindersRepository.deleteReminder(reminder);
            remindersListBinding.deleteReminderAtIndex(index);
            refreshUI();
        }
    })(reminder);

    // Setting Reminder Data Object Methods
    reminder.onDismiss = onDismiss;
    reminder.onTimeout = onTimeout;
    reminder.onUpdate = onUpdate;
    reminder.onDelete = onDelete;

    reminder.setNewTimeout();

    // Adding Reminder to Repository
    var index = remindersRepository.addReminder(reminder);
    console.log(index, remindersRepository.getReminders());
    remindersListBinding.addReminder(reminder, index);
    titleElement.value = '';
    descriptionElement.value = '';
    dateTimeElement.value = '';
    hideAddReminderPopUp();
    showReminders();
}

function editReminder() {
    showAddReminderPopUp();
}

function deleteReminder() {
    if (remindersRepository.getReminders().length===0) {

    }
}

// UI Functions
function showNoReminders() {
    var appFlex = document.getElementById('app-flex');
    var noReminderMessageContainer = document.getElementById('no-reminder-message-container');
    if (appFlex.style.display==='none' && noReminderMessageContainer.style.display==='flex') return;
    appFlex.style.display = 'none';
    noReminderMessageContainer.style.display = 'flex';
}

function showReminders() {
    var appFlex = document.getElementById('app-flex');
    var noReminderMessageContainer = document.getElementById('no-reminder-message-container');
    if (appFlex.style.display==='flex' && noReminderMessageContainer.style.display==='none') return;
    appFlex.style.display = 'flex';
    noReminderMessageContainer.style.display = 'none';
}

function showAddReminderPopUp(title='', description='') {
    var popUp = document.getElementById('pop-up-container');
    popUp.style.display = 'block';
}

function hideAddReminderPopUp() {
    var popUp = document.getElementById('pop-up-container');
    popUp.style.display = 'none';
}

function refreshTime() {
    var bigTime = document.getElementById('big-time');
    var date = new Date();
    var hours = date.getHours().toString().padStart(2, '0');
    var minutes = date.getMinutes().toString().padStart(2, '0');
    var seconds = date.getSeconds().toString().padStart(2, '0');
    var timeString = `${hours}:${minutes}:${seconds}`;
    bigTime.innerHTML = timeString;
}

function refreshUI() {
    if (remindersRepository.getReminders().length===0) {
        showNoReminders();
    } else {
        showReminders();
    }
}

// Initial Function Calls
refreshUI();
refreshTime();

// Interval Events
setInterval(refreshTime, 1000);

// Binding Events
(function () {
    var closeAddReminderPopUp = document.getElementById('close-add-reminder-pop-up');
    closeAddReminderPopUp.onclick = hideAddReminderPopUp;

    var addReminderButton = document.getElementById('add-reminder-button');
    addReminderButton.addEventListener('click', showAddReminderPopUp, false);

    var selectAllCheckbox = document.getElementById('select-all-checkbox');
    selectAllCheckbox.addEventListener('change', function () {
        remindersRepository.toggleAllRemindersSelection(selectAllCheckbox.checked);
        remindersListBinding.updateAllSelections(remindersRepository.getReminders());
    }, false)

    var newReminderButton = document.getElementById('new-reminder-button');
    newReminderButton.addEventListener('click', showAddReminderPopUp, false);

    var deleteSelectedButton = document.getElementById('delete-selected-button');
    deleteSelectedButton.addEventListener('click', function () {
        remindersListBinding.deleteSelected();
    }, false);

    var submitNewReminderButton = document.getElementById('submit-new-reminder-button');
    submitNewReminderButton.addEventListener('click', addReminder, false);
})();