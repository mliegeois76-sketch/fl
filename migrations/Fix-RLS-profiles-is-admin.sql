-- Fix RLS policy to prevent users from granting themselves admin privileges
-- This migration should be applied in the Supabase SQL Editor

-- Drop the existing policy that allows updating any column
drop policy if exists "update own profile" on public.profiles;

-- Create a new policy that prevents updating is_admin column
-- Users can only update their own profile, but cannot change is_admin
create policy "update own profile"
on public.profiles for update
using (id = auth.uid())
with check (
  id = auth.uid() and 
  is_admin = (select is_admin from public.profiles where id = auth.uid())
);

-- Bonus: Fix search_path warning in handle_new_user function
-- (This function may need to be recreated if it exists)
-- ALTER FUNCTION public.handle_new_user() SET search_path = public;
