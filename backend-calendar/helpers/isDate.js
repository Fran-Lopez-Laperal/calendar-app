const moment = require('moment')

module.exports.isDate = (value) => {

    if (!value) {
        return false;
    }

    const fecha = moment(value)
    if (fecha.isValid()) {
        return true
    } else {
        return false
    }
}