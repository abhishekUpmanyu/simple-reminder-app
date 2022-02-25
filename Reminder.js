export default class Reminder {
    constructor (_uuid, _title, _description, _dateTime, _selected=false) {
        this.uid = _uuid;
        this.title = _title;
        this.description = _description;
        this.dateTime = _dateTime;
        this.selected = _selected;
        this.onTimeout = function() {};
        this.onDismiss = function() {};
        this.onUpdate = function() {};
        this.onDelete = function() {};
    }

    clearCurrentTimeout() {
        clearTimeout(this.timeout);
    }

    setNewTimeout() {
        this.timeout = setTimeout(this.onTimeout, this.dateTime.getTime()-(new Date().getTime()));
    }
}