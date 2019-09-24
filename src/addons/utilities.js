class utils {

  constructor() {
  }

  DateToString(date) {
    const dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
    console.log('Date = ' + date + ' / After: ' + dateString.split("T")[0] + ' ' + dateString.split("T")[1].split(".")[0]);
    return dateString.split("T")[0] + ' ' + dateString.split("T")[1].split(".")[0];
  }

  StringToDate(date) {
    console.log('Inside StringToDate(). date = ' + date);
    return new Date(date.replace(/ /, 'T') + '000Z');
  }
}

module.exports = new utils();