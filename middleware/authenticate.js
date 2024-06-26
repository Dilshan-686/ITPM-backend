module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).send({ message: null, error: 'Access token missing' });
    }
    try {
        jwt.verify(authorization, env.secret);
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).send({ message: null, error: 'Invalid access token' });
        }
    }

    next();
};
