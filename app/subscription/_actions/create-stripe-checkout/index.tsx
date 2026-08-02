"use server";

import { auth } from "@clerk/nextjs/server";
import Stripe from "stripe";

export const createStripeCheckout = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Stripe secret key not found");
  }

  if (!process.env.APP_URL) {
    throw new Error("APP_URL not configured");
  }

  if (!process.env.STRIPE_PREMIUM_PLAN_PRICE_ID) {
    throw new Error("STRIPE_PREMIUM_PLAN_PRICE_ID not configured");
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-11-17.clover" as Stripe.LatestApiVersion,
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    success_url: `${process.env.APP_URL}/`,
    cancel_url: `${process.env.APP_URL}/`,
    metadata: {
      clerk_user_id: userId,
    },
    subscription_data: {
      metadata: {
        clerk_user_id: userId,
      },
    },
    line_items: [
      {
        price: process.env.STRIPE_PREMIUM_PLAN_PRICE_ID,
        quantity: 1,
      },
    ],
  });

  return {
    sessionId: session.id,
  };
};
