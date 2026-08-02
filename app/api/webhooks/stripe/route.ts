import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (request: Request) => {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.error();
  }
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.error();
  }
  const text = await request.text();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-11-17.clover" as Stripe.LatestApiVersion,
  });
  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET,
  );

  switch (event.type) {
    case "invoice.paid": {
      const invoice = event.data.object;

      const subscriptionId = invoice.parent?.subscription_details?.subscription;

      const clerkUserId =
        invoice.parent?.subscription_details?.metadata?.clerk_user_id;

      if (!subscriptionId || !clerkUserId) {
        return NextResponse.error();
      }

      await clerkClient().users.updateUser(clerkUserId, {
        privateMetadata: {
          stripeCustomerId: invoice.customer,
          stripeSubscriptionId: subscriptionId,
        },
        publicMetadata: {
          subscriptionPlan: "premium",
        },
      });

      break;
    }

    case "checkout.session.completed": {
      const session = event.data.object;

      if (session.mode !== "subscription" || !session.subscription) {
        break;
      }

      const subscriptionId =
        typeof session.subscription === "string"
          ? session.subscription
          : session.subscription.id;

      const clerkUserId =
        session.metadata?.clerk_user_id ??
        (await stripe.subscriptions.retrieve(subscriptionId)).metadata
          .clerk_user_id;

      if (!clerkUserId) {
        return NextResponse.error();
      }

      await clerkClient().users.updateUser(clerkUserId, {
        privateMetadata: {
          stripeCustomerId: session.customer,
          stripeSubscriptionId: subscriptionId,
        },
        publicMetadata: {
          subscriptionPlan: "premium",
        },
      });
      break;
    }
    case "customer.subscription.deleted": {
      // Remover plano premium do usuário
      const subscription = await stripe.subscriptions.retrieve(
        event.data.object.id,
      );
      const clerkUserId = subscription.metadata.clerk_user_id;
      if (!clerkUserId) {
        return NextResponse.error();
      }
      await clerkClient().users.updateUser(clerkUserId, {
        privateMetadata: {
          stripeCustomerId: null,
          stripeSubscriptionId: null,
        },
        publicMetadata: {
          subscriptionPlan: null,
        },
      });
    }
  }
  return NextResponse.json({ received: true });
};
