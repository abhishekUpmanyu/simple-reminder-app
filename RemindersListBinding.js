export default class RemindersListBinding {
    constructor (element) {
        this.listElement = element;
    }

    addReminder (reminder) {
        // Creating Elements
        var container = document.createElement('div');
        container.className = 'reminder';

        var headRow = document.createElement('div');
        headRow.className = 'reminder-head-row';

        var leadFlex = document.createElement('div');
        leadFlex.className = 'reminder-lead-flex';

        var checkbox = document.createElement('input');
        checkbox.className = 'reminder-checkbox';
        checkbox.type = 'checkbox';

        var title = document.createElement('div');
        title.className = 'reminder-title';
        title.innerHTML = reminder.title;

        var trailFlex = document.createElement('div');
        trailFlex.className = 'reminder-trail-flex';

        var dateTime = document.createElement('div');
        dateTime.className = 'reminder-date-time';
        dateTime.innerHTML = reminder.dateTime;

        var deleteButton = document.createElement('div');

        var description = document.createElement('p');
        description.className = 'reminder-description';
        description.innerHTML = reminder.description;

        // Creating Heirarchy for Elements
        leadFlex.appendChild(checkbox);
        leadFlex.appendChild(title);

        trailFlex.appendChild(dateTime);
        trailFlex.appendChild(deleteButton);

        headRow.appendChild(leadFlex);
        headRow.appendChild(trailFlex);

        container.appendChild(headRow);
        container.appendChild(description);
        container.appendChild(document.createElement('hr'));

        // Appending the reminder
        this.listElement.appendChild(container);
    }

    updateReminder(index, reminder) {
        var reminderContainer = this.listElement.children[index];
        reminderContainer.children[0][0][1].innerHTML = reminder.title;
        reminderContainer.childred[0][1][0].innerHTML = reminder.dateTime;
        reminderContainer.children[1].innerHTML = reminder.description;
    }
}