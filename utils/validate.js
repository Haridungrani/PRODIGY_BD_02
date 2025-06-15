const validator = require('validator');

const isValidName = (name) => {
    return typeof name === 'string' && name.trim().length > 0;
};

const isValidEmail = (email) => {
    return typeof email === 'string' && validator.isEmail(email);
};

const isValidAge = (age) => {
    return typeof age === 'number' && age > 0 && age <= 100;
};

const isValidUser = (name, email, age) => {
    return isValidName(name) && isValidEmail(email) && isValidAge(age);
};

const isValidPartialUser = ({ name, email, age }) => {
    if (name !== undefined && !isValidName(name)) return false;
    if (email !== undefined && !isValidEmail(email)) return false;
    if (age !== undefined && !isValidAge(age)) return false;
    return true;
};

module.exports = {
    isValidName,
    isValidEmail,
    isValidAge,
    isValidUser,
    isValidPartialUser
};
