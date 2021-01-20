require('dotenv').config();
const functions = require('firebase-functions');
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_API_KEY);

//API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use (express.json());

// - API Routes
app.get("/", (request, response) => response.status(200).send('hello world'));

app.post('/payments/create', async (request, response) => {
   const total = request.query.total;
//############################################################################
   console.log('Payment Request recieved for this amount >>> ', total ); 
//############################################################################

   const paymentIntent = await stripe.paymentIntents.create({
      amount: total, //subunits of the currency
      currency: "usd"
   });
   //OK - Created
   response.status(201).send({
      clientSecret: paymentIntent.client_secret,
   })
})
// - Listen command
exports.api = functions.https.onRequest(app);

// Example endpoint
// http://localhost:5001/codingtough-amaz0n/us-central1/api
