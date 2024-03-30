const env = require('../config/env');
const authenticate = require('../middleware/authenticate');
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
                                name: 'usr_cart',
                            },
                            unit_amount: parseInt(price),
                        },
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                // @todo make as envs
                success_url: 'http://localhost:3000/cart/checkout/success',
                cancel_url: 'http://localhost:3000/cart/checkout/unsuccess',
            });
            console.log(session);
            res.send(session.url);
        } else {
            res.send('price required');
        }
    });
};
