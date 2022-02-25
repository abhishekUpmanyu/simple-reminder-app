export default class RemindersListBinding {
    constructor(element) {
        this.listElement = element;
    }

    addReminder(reminder, index) {
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
        dateTime.innerHTML = `${reminder.dateTime.getHours().toString().padStart(2, '0')}:${reminder.dateTime.getMinutes().toString().padStart(2, '0')}`;

        var editButton = document.createElement('div');
        editButton.id = 'inline-edit-button';
        editButton.onclick = reminder.onUpdate;

        var editIcon = document.createElement('img');
        editIcon.className = 'inline-icon-button';
        editIcon.src = 'assets/images/edit.png';

        var deleteButton = document.createElement('div');
        deleteButton.id = 'inline-delete-button';
        deleteButton.onclick = reminder.onDelete;

        var deleteIcon = document.createElement('img');
        deleteIcon.className = 'inline-icon-button';
        deleteIcon.src = 'assets/images/delete.png';

        var description = document.createElement('p');
        description.className = 'reminder-description';
        description.innerHTML = reminder.description;

        // Creating Heirarchy for Elements
        editButton.appendChild(editIcon);
        deleteButton.appendChild(deleteIcon);

        leadFlex.appendChild(checkbox);
        leadFlex.appendChild(title);

        trailFlex.appendChild(dateTime);
        trailFlex.appendChild(editButton);
        trailFlex.appendChild(deleteButton);

        headRow.appendChild(leadFlex);
        headRow.appendChild(trailFlex);

        container.appendChild(headRow);
        container.appendChild(description);
        container.appendChild(document.createElement('hr'));

        // Inserting the Reminder Element
        this.listElement.insertBefore(container, this.listElement.children[index+1]);
    }

    updateReminder(elem) {
        console.log(elem);
        // elem.children[0][0][1].innerHTML = reminder.title;
        // elem.childred[0][1][0].innerHTML = reminder.dateTime;
        // elem.children[1].innerHTML = reminder.description;
    }

    deleteReminder(elem) {
        elem.remove();
    }

    deleteReminderAtIndex(index) {
        console.log(index, this.listElement.children[index]);
        this.listElement.children[index].remove();
    }

    updateAllSelections(reminders) {
        for (let i=0; i<reminders.length; ++i) {
            this.listElement.children[i].children[0].children[0].children[0].checked = reminders[i].selected;
        }
    }

    deleteSelected() {
        for (let child of this.listElement.children) {
            if (child.children[0].children[0].children[0].checked) {
                this.deleteReminder(child);
            }
        }
    }
}