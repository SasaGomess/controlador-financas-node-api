const jsonWebToken = require("jsonwebtoken");

function generateToken(user){
    jsonWebToken.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expires: "1d" }
    )
}

module.exports = generateToken;