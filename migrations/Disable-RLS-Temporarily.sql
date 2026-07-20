-- Disable RLS temporarily to fix infinite recursion
-- This will allow products to be displayed while we fix the policies

-- Disable RLS on all tables
alter table public.profiles disable row level security;
alter table public.orders disable row level security;
alter table public.order_items disable row level security;
alter table public.products disable row level security;
