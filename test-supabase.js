// Test script for Supabase migration fixes
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://yytxrapemcsloyuqewhf.supabase.co',
  'sb_publishable_aBDAK0o9CrBKUEcf6sQf7w_t-7DFRIl'
);

async function testProducts() {
  console.log('\n=== Testing Products ===');
  
  // Test 1: Get all products
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .limit(1);
  
  if (error) {
    console.error('❌ Failed to fetch products:', error.message);
    return false;
  }
  
  if (!products || products.length === 0) {
    console.log('⚠️  No products found in database');
    return false;
  }
  
  const product = products[0];
  console.log(`✅ Product fetched: ${product.name} (ID: ${product.id}, UUID type: ${typeof product.id})`);
  console.log(`   Stock: ${product.stock}, Price: ${product.price}`);
  
  // Test 2: Check if ID is UUID (string)
  if (typeof product.id === 'string' && product.id.length === 36) {
    console.log('✅ Product ID is UUID string (correct)');
  } else {
    console.log(`❌ Product ID is not UUID string: ${typeof product.id}`);
    return false;
  }
  
  return product;
}

async function testOrders() {
  console.log('\n=== Testing Orders ===');
  
  // Test 1: Check orders table schema
  const { data: orders, error } = await supabase
    .from('orders')
    .select('*')
    .limit(1);
  
  if (error) {
    console.error('❌ Failed to fetch orders:', error.message);
    return false;
  }
  
  if (orders && orders.length > 0) {
    const order = orders[0];
    console.log(`✅ Order fetched: ${order.id}`);
    console.log(`   Columns present: ${Object.keys(order).join(', ')}`);
    
    // Check for non-existent columns that we removed
    if ('shipping_address' in order) {
      console.log('⚠️  shipping_address column still exists (should have been removed)');
    } else {
      console.log('✅ shipping_address column not present (correct)');
    }
    
    if ('billing_address' in order) {
      console.log('⚠️  billing_address column still exists (should have been removed)');
    } else {
      console.log('✅ billing_address column not present (correct)');
    }
    
    if ('payment_method' in order) {
      console.log('⚠️  payment_method column still exists (should have been removed)');
    } else {
      console.log('✅ payment_method column not present (correct)');
    }
  } else {
    console.log('ℹ️  No orders in database yet');
  }
  
  return true;
}

async function testOrderItems() {
  console.log('\n=== Testing Order Items ===');
  
  // Test 1: Check order_items table schema
  const { data: orderItems, error } = await supabase
    .from('order_items')
    .select('*')
    .limit(1);
  
  if (error) {
    console.error('❌ Failed to fetch order_items:', error.message);
    return false;
  }
  
  if (orderItems && orderItems.length > 0) {
    const item = orderItems[0];
    console.log(`✅ Order item fetched: ${item.id}`);
    console.log(`   Columns present: ${Object.keys(item).join(', ')}`);
    
    // Check for correct column name
    if ('price_at_purchase' in item) {
      console.log('✅ price_at_purchase column present (correct)');
    } else {
      console.log('❌ price_at_purchase column not found');
      return false;
    }
    
    if ('price' in item) {
      console.log('⚠️  price column still exists (should be price_at_purchase)');
    } else {
      console.log('✅ price column not present (correct)');
    }
  } else {
    console.log('ℹ️  No order items in database yet');
  }
  
  return true;
}

async function testAuth() {
  console.log('\n=== Testing Auth ===');
  
  // Test 1: Check profiles table
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('*')
    .limit(1);
  
  if (error) {
    console.error('❌ Failed to fetch profiles:', error.message);
    return false;
  }
  
  if (profiles && profiles.length > 0) {
    const profile = profiles[0];
    console.log(`✅ Profile fetched: ${profile.id}`);
    console.log(`   Columns present: ${Object.keys(profile).join(', ')}`);
    
    // Check for wishlist column
    if ('wishlist' in profile) {
      console.log('✅ wishlist column present (correct)');
    } else {
      console.log('❌ wishlist column not found');
    }
    
    // Check for email_preferences column
    if ('email_preferences' in profile) {
      console.log('✅ email_preferences column present (correct)');
    } else {
      console.log('❌ email_preferences column not found');
    }
  } else {
    console.log('ℹ️  No profiles in database yet');
  }
  
  return true;
}

async function runTests() {
  console.log('=== Supabase Migration Test Suite ===\n');
  
  const product = await testProducts();
  await testOrders();
  await testOrderItems();
  await testAuth();
  
  console.log('\n=== Test Summary ===');
  console.log('Tests completed. Review results above.');
}

runTests().catch(console.error);
