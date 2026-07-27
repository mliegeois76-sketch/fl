import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
});

const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')!;
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle OPTIONS preflight request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const signature = req.headers.get('stripe-signature');
    
    if (!signature) {
      return new Response('No signature', { 
        status: 400,
        headers: corsHeaders
      });
    }

    const body = await req.text();
    
    // Verify webhook signature
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );

    // Handle checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.order_id;

      if (!orderId) {
        return new Response('No order_id in metadata', { 
          status: 400,
          headers: corsHeaders
        });
      }

      // Update order status to 'paid'
      const { error } = await supabase
        .from('orders')
        .update({ status: 'paid' })
        .eq('id', orderId);

      if (error) {
        console.error('Error updating order:', error);
        return new Response('Error updating order', { 
          status: 500,
          headers: corsHeaders
        });
      }

      console.log(`Order ${orderId} marked as paid`);
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
