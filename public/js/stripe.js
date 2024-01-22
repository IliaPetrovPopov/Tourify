import axios from 'axios';
import { showAlert } from './alert';
// import Stripe from 'stripe';

export const bookTour = async (tourId) => {
  const stripe = Stripe(
    'pk_test_51OaFUVLpAW5HbHzcLUKHo19AMI505IZpFpeFxH1PqSueu0Y85h4yrNg6KDDLkxUAjy8vZDEyhRwWZkJWriMv5TJ200rEv02AHs'
  );

  try {
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );

    const sessionId = session.data.session.id;

    await stripe.redirectToCheckout({
      sessionId,
    });
  } catch (error) {
    showAlert('error', error);
  }
};
