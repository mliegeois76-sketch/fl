-- Enable guest checkout by making user_id nullable in orders
-- This migration should be applied in the Supabase SQL Editor

-- Make user_id nullable in orders table
alter table public.orders alter column user_id drop not null;

-- Drop ALL existing RLS policies on order_items first (they may reference non-existent user_id)
drop policy if exists "users can view own order items" on public.order_items;
drop policy if exists "users can insert own order items" on public.order_items;
drop policy if exists "admins can view all order items" on public.order_items;
drop policy if exists "admins can insert order items" on public.order_items;

-- Drop existing RLS policies on orders
drop policy if exists "users can view own orders" on public.orders;
drop policy if exists "users can insert own orders" on public.orders;
drop policy if exists "users can update own orders" on public.orders;

-- Create new RLS policies that allow guest orders (user_id IS NULL)
-- Admins can view all orders
create policy "admins can view all orders"
on public.orders for select
using (auth.uid() in (select id from public.profiles where is_admin = true));

-- Users can view their own orders OR guest orders (for email-based lookup)
create policy "users can view own orders"
on public.orders for select
using (user_id = auth.uid() OR user_id IS NULL);

-- Admins can insert orders
create policy "admins can insert orders"
on public.orders for insert
with check (auth.uid() in (select id from public.profiles where is_admin = true));

-- Users can insert their own orders OR guest orders
create policy "users can insert orders"
on public.orders for insert
with check (user_id = auth.uid() OR user_id IS NULL);

-- Admins can update any order
create policy "admins can update orders"
on public.orders for update
using (auth.uid() in (select id from public.profiles where is_admin = true));

-- Users can update their own orders
create policy "users can update own orders"
on public.orders for update
using (user_id = auth.uid());

-- Drop existing RLS policies on order_items
drop policy if exists "users can view own order items" on public.order_items;
drop policy if exists "users can insert own order items" on public.order_items;

-- Create new RLS policies for order_items (linked via orders table)
-- Admins can view all order items
create policy "admins can view all order items"
on public.order_items for select
using (auth.uid() in (select id from public.profiles where is_admin = true));

-- Users can view order items from their own orders OR guest orders
create policy "users can view own order items"
on public.order_items for select
using (
  order_id in (
    select id from public.orders 
    where user_id = auth.uid() OR user_id IS NULL
  )
);

-- Admins can insert order items
create policy "admins can insert order items"
on public.order_items for insert
with check (auth.uid() in (select id from public.profiles where is_admin = true));

-- Users can insert order items for their own orders OR guest orders
create policy "users can insert order items"
on public.order_items for insert
with check (
  order_id in (
    select id from public.orders 
    where user_id = auth.uid() OR user_id IS NULL
  )
);

-- Add guest_email column to orders for guest order tracking
alter table public.orders add column if not exists guest_email text;
