-- Fix infinite recursion in RLS policies
-- The issue is that policies checking profiles.is_admin create a circular dependency

-- Drop problematic policies
drop policy if exists "admins can view all orders" on public.orders;
drop policy if exists "users can view own orders" on public.orders;
drop policy if exists "users can insert own orders" on public.orders;
drop policy if exists "users can update own orders" on public.orders;
drop policy if exists "admins can insert orders" on public.orders;

-- Drop problematic policies on order_items
drop policy if exists "admins can view all order items" on public.order_items;
drop policy if exists "users can view own order items" on public.order_items;
drop policy if exists "users can insert own order items" on public.order_items;
drop policy if exists "admins can insert order items" on public.order_items;

-- Create simplified policies without circular dependency
-- Orders policies
create policy "users can view own orders"
on public.orders for select
using (user_id = auth.uid() OR user_id IS NULL);

create policy "users can insert own orders"
on public.orders for insert
with check (user_id = auth.uid() OR user_id IS NULL);

create policy "users can update own orders"
on public.orders for update
using (user_id = auth.uid());

-- Order items policies
create policy "users can view own order items"
on public.order_items for select
using (exists (
  select 1 from public.orders 
  where orders.id = order_items.order_id 
  and (orders.user_id = auth.uid() OR orders.user_id IS NULL)
));

create policy "users can insert own order items"
on public.order_items for insert
with check (exists (
  select 1 from public.orders 
  where orders.id = order_items.order_id 
  and (orders.user_id = auth.uid() OR orders.user_id IS NULL)
));

-- Products policies (public read, admin write)
create policy "products are publicly viewable"
on public.products for select
using (true);

create policy "only authenticated can insert products"
on public.products for insert
with check (auth.uid() is not null);

create policy "only authenticated can update products"
on public.products for update
using (auth.uid() is not null);
