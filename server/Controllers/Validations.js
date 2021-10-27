const { isEmail, isMobilePhone } = require('validator');

module.exports.validateEmail = (email) => {

    if (!isEmail(email)) {
        return { validity: false, error: "not valid email" }
    }

    return { validity: true }
}

module.exports.validateMobil = (phone_number) => {

    if (!isMobilePhone(phone_number) || (phone_number.length !== 11 || (phone_number.slice(0, 3) !== "010" && phone_number.slice(0, 3) !== "011" && phone_number.slice(0, 3) !== "012"))) {
        return { validity: false, error: "not valid phone number" }

    }

    return { validity: true }
}
