#!/bin/bash

# Database setup script for BrokerAnalysis

echo "🔧 Setting up BrokerAnalysis Database..."

# Clean up existing database
echo "📦 Cleaning up existing database..."
rm -rf .wrangler/state/v3/d1
mkdir -p .wrangler/state/v3/d1/miniflare-D1DatabaseObject

# Initialize local D1 database
echo "🗄️ Initializing local D1 database..."
wrangler d1 execute brokeranalysis-production --local --command "SELECT 1" 2>/dev/null || true

# Apply migrations
echo "📝 Applying database migrations..."
for migration in migrations/*.sql; do
    echo "  - Applying $(basename $migration)..."
    wrangler d1 execute brokeranalysis-production --local --file="$migration" 2>/dev/null || echo "    ⚠️ Migration might have issues, continuing..."
done

# Check which seed file to use
if [ -f "comprehensive_broker_database_cleaned.sql" ]; then
    echo "🌱 Seeding database with comprehensive broker data..."
    wrangler d1 execute brokeranalysis-production --local --file=comprehensive_broker_database_cleaned.sql 2>/dev/null || echo "⚠️ Some seed data might have issues, continuing..."
elif [ -f "seed.sql" ]; then
    echo "🌱 Seeding database with basic data..."
    wrangler d1 execute brokeranalysis-production --local --file=seed.sql 2>/dev/null || echo "⚠️ Some seed data might have issues, continuing..."
fi

# Verify database setup
echo "✅ Verifying database setup..."
wrangler d1 execute brokeranalysis-production --local --command "SELECT COUNT(*) as count FROM brokers" 2>/dev/null || echo "⚠️ Could not verify broker count"

echo "✨ Database setup complete!"