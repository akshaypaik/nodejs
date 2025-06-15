const validator = require("validator");

const validateSignUpData = (req) => {

    const { firstName, lastName, emailId, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("Name is not valid!");
    }
    else if (!validator.isEmail(emailId)) {
        throw new Error("Email ID is not valid!");
    }
    else if (!validator.isStrongPassword(password)) {
        throw new Error("Password is not strong!");
    }

}

const validateEditProfileData = (req) => {
    const data = req.body;
    const allowedEditFields = ["firstName", "lastName", "photoURL", "gender", "age", "about", "skills"];
    const isEditAllowed = Object.keys(data).every((key) => allowedEditFields.includes(key));
    if (!isEditAllowed) {
        throw new Error("Edit not allowed");
    }
    if (data?.skills.length > 10) {
        throw new Error("Skills cannot be more than 10");
    }
    return isEditAllowed;
}

module.exports = { validateSignUpData, validateEditProfileData };