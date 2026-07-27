-- COMPLETE CLEANUP AND RECREATION OF RLS POLICIES
-- This script removes ALL existing policies on profiles, orders, order_items
-- EXCEPT the 6 clean policies we want to keep
-- Then recreates the 6 clean policies if they don't exist
-- Run this in Supabase SQL Editor

-- ============================================
-- STEP 1: DROP ALL EXISTING POLICIES (EXCEPT THE 6 WE WANT)
-- ============================================

-- Drop policies on order_items (keep: order_items_select_own, order_items_insert_own)
DROP POLICY IF EXISTS "admin read order_items" ON order_items;
DROP POLICY IF EXISTS "create own order items" ON order_items;
DROP POLICY IF EXISTS "own order_items" ON order_items;
DROP POLICY IF EXISTS "users can insert order items" ON order_items;
DROP POLICY IF EXISTS "users can insert own order items" ON order_items;
DROP POLICY IF EXISTS "users can view own order items" ON order_items;

-- Drop policies on orders (keep: orders_select_own, orders_insert_own)
DROP POLICY IF EXISTS "admin read orders" ON orders;
DROP POLICY IF EXISTS "admin update orders" ON orders;
DROP POLICY IF EXISTS "admins can update orders" ON orders;
DROP POLICY IF EXISTS "create own order" ON orders;
DROP POLICY IF EXISTS "own orders" ON orders;
DROP POLICY IF EXISTS "users can insert orders" ON orders;
DROP POLICY IF EXISTS "users can insert own orders" ON orders;
DROP POLICY IF EXISTS "users can update own orders" ON orders;
DROP POLICY IF EXISTS "users can view own orders" ON orders;

-- Drop policies on profiles (keep: profiles_select_own, profiles_update_own)
DROP POLICY IF EXISTS "admin read profiles" ON profiles;
DROP POLICY IF EXISTS "create own profile" ON profiles;
DROP POLICY IF EXISTS "own profile" ON profiles;
DROP POLICY IF EXISTS "update own profile" ON profiles;

-- ============================================
-- STEP 2: ENSURE RLS IS ENABLED
-- ============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- ============================================
-- STEP 3: CREATE THE 6 CLEAN POLICIES
-- ============================================

-- ============================================
-- TABLE: profiles (2 policies)
-- ============================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "profiles_select_own" ON profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON profiles;

-- Policy: Authenticated users can SELECT their own profile
CREATE POLICY "profiles_select_own" ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Policy: Authenticated users can UPDATE their own profile
CREATE POLICY "profiles_update_own" ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- ============================================
-- TABLE: orders (2 policies)
-- ============================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "orders_select_own" ON orders;
DROP POLICY IF EXISTS "orders_insert_own" ON orders;

-- Policy: Authenticated users can SELECT their own orders
CREATE POLICY "orders_select_own" ON orders
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy: Authenticated users can INSERT their own orders ONLY
-- NO user_id IS NULL - must be authenticated
CREATE POLICY "orders_insert_own" ON orders
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- TABLE: order_items (2 policies)
-- ============================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "order_items_select_own" ON order_items;
DROP POLICY IF EXISTS "order_items_insert_own" ON order_items;

-- Policy: Authenticated users can SELECT order_items from their own orders
CREATE POLICY "order_items_select_own" ON order_items
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- Policy: Authenticated users can INSERT order_items for their own orders
CREATE POLICY "order_items_insert_own" ON order_items
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check RLS status
SELECT 
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('profiles', 'orders', 'order_items')
ORDER BY tablename;

-- List all policies for these tables (should be exactly 6)
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename IN ('profiles', 'orders', 'order_items')
ORDER BY tablename, policyname;

-- Count total policies (should be exactly 6)
SELECT 
  tablename,
  COUNT(*) as policy_count
FROM pg_policies
WHERE tablename IN ('profiles', 'orders', 'order_items')
GROUP BY tablename
ORDER BY tablename;
