const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const env = require('../config/env');
const User = mongoose.model('user');
const AuthenticateMiddleware = require('../middleware/authenticate');

// sign up
module.exports = (app) => {
    app.get('/auth', async (req, res) => {
        res.send('sever running');
    });

    app.post('/auth/sign-up', async (req, res) => {
        const { UserId, UserName, PassWord } = req.body;
        console.log(req.body, '<<<<<');
        if (!UserId && !UserName && !PassWord) {
            res.send({ message: null, error: 'required filed missing' });
        }

        try {
            let user = await User.findOne({ UserName });
            console.log(user, 'user found <<<');
            if (!user) {
                await User.create({ UserId, UserName, PassWord });
                res.send({ message: 'User signed up successfully!', error: null });
            } else {
                res.send({ message: null, error: 'existing user' });
            }
        } catch (error) {
            console.error('Error signing in user:', error);
            res.send('Internal Server Error');
        }
    });

    // sign in
    app.post('/auth/sign-in', async (req, res) => {
        const { UserName, PassWord } = req.body;

        if (!UserName && !PassWord) {
            return res.send({ message: null, error: 'required filed missing' });
        }

        try {
            let user = await User.findOne({ UserName });
            if (user) {
                if (PassWord === user.PassWord) {
                    const accessToken = jwt.sign({ UserId: user.UserId, UserName: user.UserName }, env.secret);
                    return res.send({ message: 'User signed in successfully!', accessToken, error: null });
                } else {
                    return res.send({
                        message: null,
                        error: 'invalid credentials meaning check username and password',
                    });
                }
            } else {
                return res.send({ message: null, error: 'user not registered' });
            }
        } catch (error) {
            console.error('Error signing in user:', error);
            return res.send('Internal Server Error');
        }
    });

    // get User
    app.get('/auth/get-user', AuthenticateMiddleware, async (req, res) => {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.send({ message: null, error: 'Access token missing' });
        }

        try {
            const decodedToken = jwt.decode(authorization, env.secret);
            const userId = decodedToken.UserId;
            console.log(userId);
            const user = await User.findOne({ UserId: userId });

            if (user) {
                return res.send({ user });
            } else {
                return res.send({ message: null, error: 'User not found' });
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            if (error.name === 'TokenExpiredError') {
                return res.send({ message: null, error: 'Access token expired' });
            } else {
                return res.send('Internal Server Error');
            }
        }
    });

    // delete user
    app.get('/auth/user-danger-zone', AuthenticateMiddleware, async (req, res) => {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.send({ message: null, error: 'Access token missing' });
        }

        try {
            const decodedToken = jwt.decode(authorization, env.secret);
            const userId = decodedToken.UserId;
            console.log(userId);
            const user = await User.deleteOne({ UserId: userId });

            if (user) {
                return res.send({ message: 'User account deleted Successfully' });
            } else {
                return res.send({ message: null, error: 'User not found' });
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            if (error.name === 'TokenExpiredError') {
                return res.send({ message: null, error: 'Access token expired' });
            } else {
                return res.send('Internal Server Error');
            }
        }
    });
};
