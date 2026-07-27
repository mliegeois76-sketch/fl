-- List all current policy names on profiles, orders, order_items
-- Run this in Supabase SQL Editor to get the exact policy names

SELECT 
  policyname,
  tablename,
  cmd,
  permissive,
  roles
FROM pg_policies
WHERE tablename IN ('profiles', 'orders', 'order_items')
ORDER BY tablename, policyname;
