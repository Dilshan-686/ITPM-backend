const env = require('../config/env');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const Payment = mongoose.model('payment');
const stripe = require('stripe')(env.strip_secret_key);

// stripe routes
module.exports = (app) => {
    app.get('/checkout', async (req, res) => {
        res.send('Stripe GATE way');
    });

    app.post('/checkout', async (req, res) => {
        const { usd } = req.body;
        console.log(usd);
        if (usd) {
            const price = usd * 100;
            const session = await stripe.checkout.sessions.create({
                line_items: [
                    {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: 'Payments',
                            },
                            unit_amount: parseInt(price),
                        },
                        quantity: 1,
                    },
                    ,
                ],
                mode: 'payment',
                // @todo make as envs
                success_url: `http://localhost:3000/cart/checkout/success/${parseFloat(price / 100).toFixed(2)}`,
                cancel_url: `http://localhost:3000/cart/checkout/unsuccess/${parseFloat(price / 100).toFixed(2)}`,
            });
            console.log(session);
            res.send(session.url);
        } else {
            res.send('price required');
        }
    });

    app.post('/checkout/success/save-payment', async (req, res) => {
        const { authorization } = req.headers;
        const { price } = req.body;
        const decodedToken = jwt.decode(authorization, env.secret);

        console.log('de-id', decodedToken.UserId);
        if (decodedToken.UserId) {
            // save as new entry
            if (decodedToken?.UserId && price) {
                try {
                    await Payment.create({
                        UserId: decodedToken.UserId,
                        UserName: decodedToken.UserName,
                        price,
                        date: Date.now(),
                    });
                    res.send({ data: 'saving successful' });
                } catch (error) {
                    res.send({ error: 'saving unsuccessful' });
                }
            }
        } else {
            res.send({ error: 'unauthorized' });
        }
    });

    app.post('/payment/user-history', async (req, res) => {
        const { authorization } = req.headers;
        const decodedToken = jwt.decode(authorization, env.secret);
        if (decodedToken?.UserId) {
            try {
                const data = await Payment.find({
                    UserId: decodedToken.UserId,
                });
                console.log(data);
                res.send(data);
            } catch (error) {
                res.send({ error });
            }
        } else {
            res.send({ error: 'unauthorized' });
        }
    });
};
