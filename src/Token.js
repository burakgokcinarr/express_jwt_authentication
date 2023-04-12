const jwt = require("jsonwebtoken");

const generateToken = ( name ) => {
    const token = jwt.sign({ name: name }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
    algorithm: process.env.JWT_ALGORITHM
})
    return token
}

const verifyToken = ( token ) => {
    try {
        // Verify the token is valid
        const { name } = jwt.verify(token, process.env.JWT_SECRET);

        return name;
    } catch (error) {
        return false;
    }
}

const refreshToken = ( name ) => {
    const token = jwt.sign({ name: name }, process.env.JWT_REFRESH_TOKEN, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    algorithm: process.env.JWT_ALGORITHM
})
    return token
}

const verifyRefreshToken = ( refreshToken ) => {
    try {
        // Verify the Refresh token is valid
        const { name } = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN);

        return name;
    } catch (error) {
        return false;
    }
}

module.exports = {
    generateToken,
    verifyToken,
    refreshToken,
    verifyRefreshToken
}