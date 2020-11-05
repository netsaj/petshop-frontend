const moment = require('moment');
// eslint-disable-next-line no-unused-vars
const millisecondsInDay = 86400000;
// eslint-disable-next-line no-unused-vars
const millisecondsInMonth = 2629750000;

/**
 * Calcula los años de diferencia entre la fecha ingresada y la fecha actual
 * @param date : Date
 * @returns {number}
 */
module.exports.calcYears = (date) => {
    if (date === undefined || date == null) {
        date = new Date()
    }
    //console.log(date);
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)
    return parseFloat(moment().diff(moment(date), 'years', true).toFixed(2));
};

/**
 * Convierte una fecha de string a tipo Date javascript
 * @param date_string
 * @returns {Date}
 */
module.exports.parseToDate = (date_string) => {
    return moment(date_string).toDate();
};

module.exports.toGoDatetime = (date) => {
    return moment(date).format("YYYY-MM-DDTHH:mm:ssZ");
};

module.exports.getDateOnly = (date) => {
    const str = moment(date).format("YYYY-MM-DD");
    return str === "Invalid date" ? "" : str
}
module.exports.getTimeOnly = (date) => {
    const str = moment(date).format("hh:mm a");
    return str === "Invalid date" ? "" : str
}

module.exports.calculateDateFromYears = (years) => {
    if (!isNaN(parseFloat(years))) {

        let date = moment().subtract(years, 'years').toDate();
        date.setHours(0)
        date.setMinutes(0)
        date.setSeconds(0)
        date.setMilliseconds(0)
        return date;
    }
};

module.exports.cambiarFormatoFecha = (date) => {
    return this.getDateOnly(date) + " " + this.getTimeOnly(date)
}
