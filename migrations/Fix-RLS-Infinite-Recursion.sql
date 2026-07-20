-- Fix infinite recursion in RLS policies
-- The issue is that policies checking profiles.is_admin create a circular dependency

-- Drop problematic policies on profiles
drop policy if exists "update own profile" on public.profiles;

-- Create simplified profile policy without recursion
create policy "update own profile"
on public.profiles for update
using (id = auth.uid())
with check (id = auth.uid());
