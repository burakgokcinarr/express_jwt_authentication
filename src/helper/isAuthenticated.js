const { verifyToken } = require("../Token");

function isAuthenticated(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).json({ error: "Not Authorized" });
    }
    // Bearer <token>>
    const authHeader = req.headers.authorization;
    const token      = authHeader.split(" ")[1];

    const isValid =  verifyToken(token);

    if (!isValid) {
        return res.status(404).json({ message: "Token not found" });
    } 

    next();
}

module.exports = {
    isAuthenticated
}