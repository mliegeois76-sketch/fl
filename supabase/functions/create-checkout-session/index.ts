import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
});

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  try {
    // Only allow POST requests
    if (req.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    const { 
      cart_items, 
      user_id, 
      guest_email, 
      shipping_address, 
      total,
      success_url, 
      cancel_url 
    } = await req.json();

    if (!cart_items || cart_items.length === 0) {
      return new Response(JSON.stringify({ error: 'cart_items is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!user_id && !guest_email) {
      return new Response(JSON.stringify({ error: 'Either user_id or guest_email is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Create order in Supabase (using service role to bypass RLS)
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: user_id || null,
        guest_email: guest_email || null,
        total: total,
        status: 'pending',
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (orderError || !order) {
      return new Response(JSON.stringify({ error: 'Failed to create order: ' + orderError?.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Create order items
    const orderItems = cart_items.map((item: any) => ({
      order_id: order.id,
      product_id: item.id,
      quantity: item.quantity,
      price_at_purchase: item.price
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      return new Response(JSON.stringify({ error: 'Failed to create order items: ' + itemsError.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Create line items for Stripe Checkout
    const lineItems = cart_items.map((item: any) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: `Product ${item.id}`,
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: success_url || `${req.headers.get('origin')}/order-success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancel_url || `${req.headers.get('origin')}/checkout.html`,
      metadata: {
        order_id: order.id,
      },
    });

    return new Response(JSON.stringify({ checkout_url: session.url }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
