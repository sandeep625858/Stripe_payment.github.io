const stripe = require('stripe')('sk_test_51LTJAdSGINhZPMy7auNfKdhFKw5yuW8Ym1htE5RCCxmHcAmnV5kR6y8DzhX44AGbDxBij4gYluify8JHcj4Lebq000Ormj7tDj');
const { response } = require('express');
const express = require('express');
const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({extended : true}));

const YOUR_DOMAIN = 'http://localhost:4242';
app.get('/',(req,res)=>{
  res.sendFile('index.html', { root: __dirname });
})

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'price_1LTTvKSGINhZPMy7fgUlJg2J',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });

  res.redirect(303, session.url);
});

app.listen(4242, () => console.log('Running on port 4242'));