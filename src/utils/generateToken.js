const jwt = require("jsonwebtoken");

function generateToken(user) {
  return jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1d" }
  );
}

module.exports = generateToken;