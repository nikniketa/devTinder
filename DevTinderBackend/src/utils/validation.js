const validator = require("validator");
const isValidEditableField = (req) => {
  const editableField = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "about",
    "skill",
  ];
  const requestField = req.body;
  return Object.keys(requestField).every((field) =>
    editableField.includes(field),
  );
};
const signupValidation = (req) => {
  const { firstName, lastName, emailId, password, age } = req.body;
  if (firstName === "" || firstName.length < 2 || firstName.length > 25) {
    throw new Error("Firstname is not valid");
  }
  if (lastName === "" || lastName.length > 25) {
    throw new Error("lastNmae is not valid");
  }
  if (!validator.isEmail(emailId)) {
    throw new Error("Please enter correct email ID");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong");
  }
  if (age < 18) {
    throw new Error("Age should be greater than 18 years");
  }
};
module.exports = { signupValidation, isValidEditableField };
