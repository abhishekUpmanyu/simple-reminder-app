export default class Reminder {
    constructor (_uuid, _title, _description, _dateTime, _selected=false, _onTimeout) {
        this.uid = _uuid;
        this.title = _title;
        this.description = _description;
        this.dateTime = _dateTime;
        this.selected = _selected;
        this.onTimeout = _onTimeout;
        this.timeout = setTimeout(onTimeout, this.dateTime.getTime()-(new Date().getTime()));
    }

    clearCurrentTimeout() {
        clearTimeout(this.timeout);
    }

    setNewTimeout() {
        this.timeout = setTimeout(this.onTimeout, this.dateTime.getTime()-(new Date().getTime()));
    }
}