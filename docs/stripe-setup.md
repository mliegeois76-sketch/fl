# Stripe Checkout Integration Setup

This document explains how to configure Stripe Checkout with Supabase Edge Functions.

## Architecture Overview

The checkout flow uses a secure, server-side architecture:

1. **Client (checkout.html)**: Collects shipping info and cart data
2. **Edge Function (create-checkout-session)**: Creates order + order_items using service role, then generates Stripe Checkout session
3. **Stripe**: Handles payment on hosted checkout page
4. **Edge Function (stripe-webhook)**: Receives payment confirmation and updates order status to "paid"

This approach ensures:
- **Security**: No RLS policy modifications needed (service role bypasses RLS server-side only)
- **Guest Support**: Both authenticated users and guests can checkout
- **PCI Compliance**: Stripe handles all card data

## Prerequisites

- Stripe account (test or live)
- Supabase project with Edge Functions enabled
- `guest_email` column in `orders` table (nullable)

## Environment Variables

Configure these environment variables in your Supabase project dashboard:

### For both Edge Functions

- `STRIPE_SECRET_KEY`: Your Stripe secret key
  - Test mode: `sk_test_...`
  - Live mode: `sk_live_...`
  - Get from: Stripe Dashboard > Developers > API keys

- `SUPABASE_URL`: Your Supabase project URL
  - Example: `https://yytxrapemcsloyuqewhf.supabase.co`
  - Get from: Supabase Dashboard > Settings > API

- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key
  - This key bypasses RLS policies (required for Edge Function to create orders)
  - Get from: Supabase Dashboard > Settings > API

### For stripe-webhook only

- `STRIPE_WEBHOOK_SECRET`: Your Stripe webhook signing secret
  - Get from: Stripe Dashboard > Developers > Webhooks > [Select webhook] > Signing secret

## Setup Steps

### 1. Deploy Edge Functions

```bash
# Install Supabase CLI if not already installed
npm install -g supabase

# Link to your project
supabase link --project-ref yytxrapemcsloyuqewhf

# Deploy functions
supabase functions deploy create-checkout-session
supabase functions deploy stripe-webhook
```

### 2. Configure Environment Variables in Supabase Dashboard

1. Go to Supabase Dashboard
2. Navigate to Edge Functions
3. Click on each function
4. Add environment variables in the "Environment Variables" section

### 3. Create Stripe Webhook

1. Go to Stripe Dashboard > Developers > Webhooks
2. Click "Add endpoint"
3. Endpoint URL: `https://yytxrapemcsloyuqewhf.supabase.co/functions/v1/stripe-webhook`
4. Select events to listen for:
   - `checkout.session.completed`
5. Copy the webhook signing secret
6. Add `STRIPE_WEBHOOK_SECRET` to the stripe-webhook function environment variables

### 4. Test the Integration

1. Add items to cart
2. Go to checkout page
3. Fill in shipping information (email required for guests)
4. Click "Payer et finaliser la commande"
5. You should be redirected to Stripe Checkout
6. Complete test payment (use Stripe test card: 4242 4242 4242 4242)
7. Verify order status changes to "paid" in Supabase

## Important Notes

### Guest Checkout Support

The Edge Function creates orders using the service role key, which bypasses RLS. This allows:
- **Authenticated users**: `user_id` = auth.uid(), `guest_email` = null
- **Guest users**: `user_id` = null, `guest_email` = email from form

No RLS policy modifications are needed - the service role key is used server-side only.

### Stock Management

Currently, stock is NOT decreased when creating the order. This is intentional:
- Order is created with status "pending"
- Stock should only be decreased after successful payment
- Consider adding stock management in the webhook or success page

### Email Notifications

Email notifications are currently sent from the client-side. For production, consider:
- Moving email sending to the webhook (after payment confirmation)
- Using a server-side email service

## Files Created/Modified

### New Files
- `supabase/functions/create-checkout-session/index.ts` - Creates orders and Stripe Checkout sessions
- `supabase/functions/create-checkout-session/deno.json` - Deno dependencies
- `supabase/functions/stripe-webhook/index.ts` - Handles Stripe webhooks
- `supabase/functions/stripe-webhook/deno.json` - Deno dependencies
- `docs/stripe-setup.md` - This documentation

### Modified Files
- `checkout.html` - Removed custom card form, added Stripe Checkout integration, sends cart data to Edge Function
- `cart.js` - Removed `createOrder()` method (moved to Edge Function)

## Troubleshooting

### Webhook signature verification fails
- Ensure `STRIPE_WEBHOOK_SECRET` matches the secret in Stripe Dashboard
- Check that the webhook endpoint URL is correct

### Order status not updating
- Verify the webhook is receiving events in Stripe Dashboard
- Check Edge Function logs in Supabase Dashboard
- Ensure `SUPABASE_SERVICE_ROLE_KEY` is correct (bypasses RLS)

### Checkout session creation fails
- Verify `STRIPE_SECRET_KEY` is correct
- Check Edge Function logs for detailed error messages
- Ensure cart_items are being sent correctly
- Verify either user_id or guest_email is provided

### Guest checkout fails
- Ensure email field is filled in checkout form
- Check that guest_email is being sent to Edge Function
- Verify `guest_email` column exists in orders table
