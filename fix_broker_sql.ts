#!/usr/bin/env tsx
// Fix the broker SQL to match the database schema

import fs from 'fs';

function fixBrokerSQL() {
  console.log('🔧 Fixing broker SQL to match database schema...');
  
  const sqlContent = fs.readFileSync('test_broker_data.sql', 'utf8');
  
  // Fix max_leverage values from INTEGER to TEXT format (1:XXX)
  const fixedContent = sqlContent.replace(/(\s+)(\d+),(\s*'[^']*',\s*-- spread_type|)/g, (match, whitespace, leverage, rest) => {
    return `${whitespace}'1:${leverage}',${rest}`;
  });
  
  // Also fix the VALUES section to properly format max_leverage
  const finalContent = fixedContent.replace(/(\s+)(\d+),(\s+)'([^']*)',(\s+[01]),(\s+[01]),/g, (match, ws1, leverage, ws2, spreadType, ws3, demoAccount, ws4, mobileApp) => {
    return `${ws1}'1:${leverage}',${ws2}'${spreadType}',${ws3}${demoAccount},${ws4}${mobileApp},`;
  });
  
  fs.writeFileSync('test_broker_data_fixed.sql', finalContent);
  console.log('✅ Fixed SQL saved to test_broker_data_fixed.sql');
}

fixBrokerSQL();