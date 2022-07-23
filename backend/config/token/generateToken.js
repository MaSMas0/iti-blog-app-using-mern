const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "20d" });
  console.log(process.env.JWT_SECRET)
};

module.exports = generateToken;
