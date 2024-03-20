module.exports = (req, res, next) => {
    const { accessToken } = req.headers;
    if (!accessToken) {
        return res.status(401).send({ message: null, error: 'Access token missing' });
    }
    try {
        jwt.verify(accessToken, env.secret);
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).send({ message: null, error: 'Invalid access token' });
        }
    }

    next();
};
