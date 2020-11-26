const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        return res.status(401).json({
            status: 401,
            message: 'Unauthorized'
        });
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'secretKeyForTheAPIToken');
    } catch (err) {
        console.log(err);
    }
    if (!decodedToken) {
        return res.status(401).json({
            status: 401,
            message: 'Unauthorized'
        });
    }
    req.userId = decodedToken.userId;
    next();
};
