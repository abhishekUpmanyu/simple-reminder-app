export default class ReminderPopUpBinding {
    constructor() {
        this.audio = new Audio('assets/audio/notification.mp3');
        this.reminderPopUpContainer = document.getElementById('reminder-pop-up-container');
        this.popUpContainer = document.getElementById('pop-up-container');
        console.log(this.popUpContainer);
    }

    showReminderPopUp(reminder) {
        this.audio.loop = true;
        this.audio.play();
        this.reminderPopUpContainer.children[0].children[0].children[0].onclick = reminder.onDismiss;
        this.reminderPopUpContainer.children[0].children[1].innerHTML = reminder.title;
        this.reminderPopUpContainer.children[0].children[2].innerHTML = reminder.description;
        this.reminderPopUpContainer.style.display = 'block';
    }

    dismissReminderPopUp() {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.reminderPopUpContainer.children[0].children[1].innerHTML = '';
        this.reminderPopUpContainer.children[0].children[2].innerHTML = '';
        this.reminderPopUpContainer.style.display = 'none';
    }

    showAddReminderPopUp() {
        document.getElementById('reminder-title-field').value = '';
        document.getElementById('reminder-description-field').value = '';
        document.getElementById('reminder-date-time-field').min = new Date().toISOString().slice(0, 16);
        document.getElementById('pop-up-container').style.display = 'block';
        // this.popUpContainer.style.display = 'block';
    }

    dismissAddReminderPopUp() {
        document.getElementById('reminder-title-field').value = '';
        document.getElementById('reminder-description-field').value = '';
        document.getElementById('reminder-date-time-field').value = '';
        document.getElementById('pop-up-container').style.display = 'none';
        // this.popUpContainer.style.display = 'none';
    }

    showEditReminderPopUp(reminder, onUpdate) {
        document.getElementById('edit-reminder-title-field').value = reminder.title;
        document.getElementById('edit-reminder-description-field').value = reminder.description;
        document.getElementById('edit-reminder-date-time-field').value = reminder.dateTime.toISOString().slice(0, 16);
        document.getElementById('update-reminder-button').onclick = onUpdate;
        document.getElementById('edit-pop-up-container').style.display = 'block';
    }

    dismissEditReminderPopUp() {
        document.getElementById('edit-reminder-title-field').innerHTML = '';
        document.getElementById('edit-reminder-description-field').innerHTML = '';
        document.getElementById('edit-reminder-date-time-field').value = '';
        document.getElementById('edit-pop-up-container').style.display = 'none';
        // this.popUpContainer.style.display = 'none';
    }
}