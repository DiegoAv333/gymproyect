require('dotenv').config();
const express = require('express');
const { MercadoPagoConfig, Preference, Payment } = require('mercadopago');
const cors = require('cors');
const helmet = require('helmet');
const admin = require('firebase-admin');

// TODO: Replace with the actual path to your Firebase service account key file
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Endpoint to receive webhooks from Mercado Pago
app.post('/webhook', async (req, res) => {
  console.log('Webhook received:', req.body);

  const { type, data } = req.body;

  if (type === 'payment') {
    try {
      const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN });
      const payment = new Payment(client);

      const paymentData = await payment.get({ id: data.id });

      if (paymentData.status === 'approved') {
        const { metadata } = paymentData;
        const { userId, planId } = metadata;

        if (userId && planId) {
          console.log(`Updating user ${userId} with plan ${planId}`);
          const userRef = db.collection('Usuarios').doc(userId);
          await userRef.update({
            hasActiveSubscription: true,
            plan: planId,
          });
          console.log(`User ${userId} updated successfully.`);
        }
      }
    } catch (error) {
      console.error('Error processing webhook:', error);
    }
  }

  res.status(200).send('Webhook received');
});

// Configure Mercado Pago with your Access Token
const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN });

// Endpoint to create the payment preference
app.post('/create_preference', async (req, res) => {
  const { items, payer, metadata } = req.body;

  const preference = new Preference(client);

  try {
    const result = await preference.create({
      body: {
        items: items,
        payer: {
          name: payer.name,
          email: payer.email,
        },
        back_urls: {
          success: 'http://localhost:3000/usuario/payment-success',
          failure: 'http://localhost:3000/failure',
          pending: 'http://localhost:3000/pending',
        },
        notification_url: 'https://fd9c-190-232-13-244.ngrok-free.app/webhook', // TODO: Replace with your production ngrok URL or public URL
        external_reference: `payment-${Date.now()}`,
        metadata: metadata,
      }
    });
    res.json({ id: result.id });
  } catch (error) {
    console.error('Error creating preference:', error.message || error);
    res.status(500).json({ error: 'Failed to create payment preference', details: error.message || error });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});