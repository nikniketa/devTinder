const validator = require("validator");

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
module.exports = signupValidation;
