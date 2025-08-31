-- Enhanced Broker Schema Migration
-- This migration adds comprehensive tables to support industry-standard forex broker reviews

-- Broker Assets (logos, images, branding)
CREATE TABLE IF NOT EXISTS broker_assets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    broker_id INTEGER NOT NULL,
    logo_url TEXT,
    logo_light_url TEXT,
    logo_dark_url TEXT,
    favicon_url TEXT,
    screenshot_url TEXT,
    og_image_url TEXT,
    hero_image_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (broker_id) REFERENCES brokers(id) ON DELETE CASCADE
);

-- Enhanced Broker Details
CREATE TABLE IF NOT EXISTS broker_details (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    broker_id INTEGER NOT NULL,
    founded_year INTEGER,
    headquarters TEXT,
    employee_count INTEGER,
    trading_volume_monthly TEXT,
    client_count INTEGER,
    website_url TEXT,
    description_long TEXT,
    description_short TEXT,
    methodology_score REAL DEFAULT 0.0,
    overall_rating REAL DEFAULT 0.0,
    pros_text TEXT,
    cons_text TEXT,
    company_type TEXT, -- 'ECN', 'STP', 'Market Maker', 'Hybrid'
    ownership_type TEXT, -- 'Public', 'Private', 'Subsidiary'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (broker_id) REFERENCES brokers(id) ON DELETE CASCADE
);

-- Comprehensive Scoring System (Based on Industry Standards)
CREATE TABLE IF NOT EXISTS broker_scores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    broker_id INTEGER NOT NULL,
    regulation_score REAL DEFAULT 0.0, -- 0-100 scale
    spreads_score REAL DEFAULT 0.0,
    platforms_score REAL DEFAULT 0.0,
    education_score REAL DEFAULT 0.0,
    support_score REAL DEFAULT 0.0,
    mobile_score REAL DEFAULT 0.0,
    research_score REAL DEFAULT 0.0,
    execution_score REAL DEFAULT 0.0,
    fees_score REAL DEFAULT 0.0,
    trust_score REAL DEFAULT 0.0,
    overall_score REAL DEFAULT 0.0,
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (broker_id) REFERENCES brokers(id) ON DELETE CASCADE
);

-- Trading Platforms Detail (MetaTrader, cTrader, Proprietary)
CREATE TABLE IF NOT EXISTS trading_platforms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    platform_type TEXT, -- 'Desktop', 'Web', 'Mobile', 'API'
    developer TEXT,
    mobile_available BOOLEAN DEFAULT FALSE,
    api_available BOOLEAN DEFAULT FALSE,
    algo_trading BOOLEAN DEFAULT FALSE,
    social_trading BOOLEAN DEFAULT FALSE,
    copy_trading BOOLEAN DEFAULT FALSE,
    description TEXT,
    logo_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Broker Platform Relationships
CREATE TABLE IF NOT EXISTS broker_platforms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    broker_id INTEGER NOT NULL,
    platform_id INTEGER NOT NULL,
    available BOOLEAN DEFAULT TRUE,
    primary_platform BOOLEAN DEFAULT FALSE,
    custom_features TEXT, -- JSON string of custom features
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (broker_id) REFERENCES brokers(id) ON DELETE CASCADE,
    FOREIGN KEY (platform_id) REFERENCES trading_platforms(id) ON DELETE CASCADE
);

-- Enhanced Payment Methods
CREATE TABLE IF NOT EXISTS payment_methods_enhanced (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    broker_id INTEGER NOT NULL,
    method_name TEXT NOT NULL,
    method_type TEXT, -- 'Bank Transfer', 'Credit Card', 'E-Wallet', 'Crypto'
    deposit_available BOOLEAN DEFAULT TRUE,
    withdrawal_available BOOLEAN DEFAULT TRUE,
    deposit_fee REAL DEFAULT 0.0,
    withdrawal_fee REAL DEFAULT 0.0,
    deposit_fee_percentage REAL DEFAULT 0.0,
    withdrawal_fee_percentage REAL DEFAULT 0.0,
    processing_time_deposit TEXT,
    processing_time_withdrawal TEXT,
    minimum_deposit REAL DEFAULT 0.0,
    maximum_deposit REAL,
    minimum_withdrawal REAL DEFAULT 0.0,
    maximum_withdrawal REAL,
    currency_support TEXT, -- JSON array of supported currencies
    geographic_restrictions TEXT, -- JSON array of restricted countries
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (broker_id) REFERENCES brokers(id) ON DELETE CASCADE
);

-- Country Regulations Detail (Comprehensive Regulatory Information)
CREATE TABLE IF NOT EXISTS country_regulations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    country_code TEXT NOT NULL,
    country_name TEXT NOT NULL,
    regulator_name TEXT NOT NULL,
    regulator_acronym TEXT,
    regulator_website TEXT,
    leverage_limit INTEGER,
    trader_protection TEXT,
    compensation_scheme TEXT,
    compensation_amount INTEGER,
    segregated_accounts BOOLEAN DEFAULT FALSE,
    negative_balance_protection BOOLEAN DEFAULT FALSE,
    regulatory_description TEXT,
    flag_url TEXT,
    established_year INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Broker Country Availability & Regulatory Status
CREATE TABLE IF NOT EXISTS broker_countries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    broker_id INTEGER NOT NULL,
    country_code TEXT NOT NULL,
    accepts_residents BOOLEAN DEFAULT TRUE,
    regulatory_status TEXT, -- 'Licensed', 'Authorized', 'Passported', 'Restricted'
    license_number TEXT,
    regulation_id INTEGER,
    restrictions TEXT, -- JSON string of any specific restrictions
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (broker_id) REFERENCES brokers(id) ON DELETE CASCADE,
    FOREIGN KEY (regulation_id) REFERENCES country_regulations(id)
);

-- Enhanced Review Categories (For Detailed Scoring)
CREATE TABLE IF NOT EXISTS review_categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    weight REAL DEFAULT 1.0, -- Weight in overall score calculation
    description TEXT,
    icon_class TEXT, -- CSS icon class for UI
    parent_category_id INTEGER,
    sort_order INTEGER DEFAULT 0,
    FOREIGN KEY (parent_category_id) REFERENCES review_categories(id)
);

-- User Reviews System (For Future Implementation)
CREATE TABLE IF NOT EXISTS user_reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    broker_id INTEGER NOT NULL,
    user_name TEXT,
    user_email TEXT,
    rating INTEGER CHECK(rating >= 1 AND rating <= 5),
    review_title TEXT,
    review_text TEXT,
    pros TEXT,
    cons TEXT,
    trading_experience TEXT, -- 'Beginner', 'Intermediate', 'Advanced'
    account_type_used TEXT,
    verified BOOLEAN DEFAULT FALSE,
    helpful_votes INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    broker_response TEXT,
    broker_response_date DATETIME,
    FOREIGN KEY (broker_id) REFERENCES brokers(id) ON DELETE CASCADE
);

-- Enhanced Spreads Table (More Currency Pairs and Account Types)
CREATE TABLE IF NOT EXISTS spreads_enhanced (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    broker_id INTEGER NOT NULL,
    account_type TEXT NOT NULL,
    currency_pair TEXT NOT NULL,
    spread_from REAL,
    spread_avg REAL,
    spread_max REAL,
    commission_per_lot REAL DEFAULT 0.0,
    commission_percentage REAL DEFAULT 0.0,
    swap_long REAL DEFAULT 0.0,
    swap_short REAL DEFAULT 0.0,
    market_hours TEXT, -- 'London', 'NewYork', 'Tokyo', 'Sydney'
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (broker_id) REFERENCES brokers(id) ON DELETE CASCADE
);

-- Account Types Detail (Standard, ECN, STP, Islamic, etc.)
CREATE TABLE IF NOT EXISTS account_types_enhanced (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    broker_id INTEGER NOT NULL,
    account_name TEXT NOT NULL,
    account_type TEXT, -- 'Standard', 'ECN', 'STP', 'Islamic', 'VIP', 'Demo'
    min_deposit REAL DEFAULT 0.0,
    max_leverage INTEGER DEFAULT 1,
    commission_per_lot REAL DEFAULT 0.0,
    spread_markup REAL DEFAULT 0.0,
    minimum_trade_size REAL DEFAULT 0.01,
    maximum_trade_size REAL,
    islamic_compliant BOOLEAN DEFAULT FALSE,
    demo_available BOOLEAN DEFAULT TRUE,
    vip_features TEXT, -- JSON string of VIP features
    description TEXT,
    target_trader_type TEXT, -- 'Beginner', 'Professional', 'Institutional'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (broker_id) REFERENCES brokers(id) ON DELETE CASCADE
);

-- Trading Instruments (Forex, CFDs, Stocks, Crypto, Commodities)
CREATE TABLE IF NOT EXISTS trading_instruments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    broker_id INTEGER NOT NULL,
    instrument_category TEXT NOT NULL, -- 'Forex', 'CFD', 'Stock', 'Crypto', 'Commodity', 'Index'
    instrument_name TEXT,
    symbol TEXT,
    available BOOLEAN DEFAULT TRUE,
    min_spread REAL,
    avg_spread REAL,
    leverage_max INTEGER,
    trading_hours TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (broker_id) REFERENCES brokers(id) ON DELETE CASCADE
);

-- Educational Resources (Webinars, Courses, Guides)
CREATE TABLE IF NOT EXISTS educational_resources (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    broker_id INTEGER NOT NULL,
    resource_type TEXT, -- 'Webinar', 'Course', 'eBook', 'Video', 'Article'
    title TEXT NOT NULL,
    description TEXT,
    target_level TEXT, -- 'Beginner', 'Intermediate', 'Advanced', 'All'
    language TEXT DEFAULT 'en',
    duration_minutes INTEGER,
    resource_url TEXT,
    thumbnail_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (broker_id) REFERENCES brokers(id) ON DELETE CASCADE
);

-- Research & Analysis Tools
CREATE TABLE IF NOT EXISTS research_tools (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    broker_id INTEGER NOT NULL,
    tool_name TEXT NOT NULL,
    tool_type TEXT, -- 'Economic Calendar', 'Market Analysis', 'Trading Signals', 'News Feed'
    description TEXT,
    available_free BOOLEAN DEFAULT TRUE,
    premium_features TEXT, -- JSON string of premium features
    quality_rating INTEGER CHECK(quality_rating >= 1 AND quality_rating <= 5),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (broker_id) REFERENCES brokers(id) ON DELETE CASCADE
);

-- Customer Support Details
CREATE TABLE IF NOT EXISTS customer_support (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    broker_id INTEGER NOT NULL,
    support_type TEXT, -- 'Live Chat', 'Phone', 'Email', 'Ticket System'
    available_24_7 BOOLEAN DEFAULT FALSE,
    support_hours TEXT,
    languages_supported TEXT, -- JSON array of language codes
    response_time_avg INTEGER, -- Average response time in minutes
    quality_rating INTEGER CHECK(quality_rating >= 1 AND quality_rating <= 5),
    phone_numbers TEXT, -- JSON object with country codes and numbers
    email_addresses TEXT, -- JSON array of support emails
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (broker_id) REFERENCES brokers(id) ON DELETE CASCADE
);

-- Broker Comparisons (Pre-computed popular comparisons)
CREATE TABLE IF NOT EXISTS broker_comparisons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    broker_1_id INTEGER NOT NULL,
    broker_2_id INTEGER NOT NULL,
    comparison_title TEXT,
    winner_broker_id INTEGER,
    comparison_summary TEXT,
    detailed_analysis TEXT,
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
    view_count INTEGER DEFAULT 0,
    FOREIGN KEY (broker_1_id) REFERENCES brokers(id) ON DELETE CASCADE,
    FOREIGN KEY (broker_2_id) REFERENCES brokers(id) ON DELETE CASCADE,
    FOREIGN KEY (winner_broker_id) REFERENCES brokers(id)
);

-- Insert default trading platforms
INSERT OR IGNORE INTO trading_platforms (name, platform_type, developer, mobile_available, api_available, algo_trading, description) VALUES
('MetaTrader 4', 'Desktop', 'MetaQuotes', TRUE, TRUE, TRUE, 'Popular forex trading platform with advanced charting and Expert Advisors'),
('MetaTrader 5', 'Desktop', 'MetaQuotes', TRUE, TRUE, TRUE, 'Advanced multi-asset trading platform with improved features'),
('cTrader', 'Desktop', 'Spotware', TRUE, TRUE, TRUE, 'Professional ECN trading platform with advanced order types'),
('TradingView', 'Web', 'TradingView Inc', TRUE, TRUE, FALSE, 'Advanced charting and social trading platform'),
('Proprietary Web', 'Web', 'Various', TRUE, FALSE, FALSE, 'Custom web-based trading platform'),
('Mobile App', 'Mobile', 'Various', TRUE, FALSE, FALSE, 'Native mobile trading application');

-- Insert default review categories with weights (similar to Investopedia's methodology)
INSERT OR IGNORE INTO review_categories (name, weight, description, icon_class, sort_order) VALUES
('Regulation & Safety', 0.25, 'Regulatory compliance, fund protection, and transparency', 'fas fa-shield-alt', 1),
('Trading Conditions', 0.20, 'Spreads, commissions, leverage, and execution quality', 'fas fa-chart-line', 2),
('Platforms & Technology', 0.15, 'Trading platform quality, mobile apps, and tools', 'fas fa-desktop', 3),
('Education & Research', 0.15, 'Educational resources and market analysis quality', 'fas fa-graduation-cap', 4),
('Customer Service', 0.10, 'Support quality, availability, and response times', 'fas fa-headset', 5),
('Fees & Costs', 0.10, 'Overall cost structure and fee transparency', 'fas fa-dollar-sign', 6),
('Mobile Experience', 0.05, 'Mobile app functionality and user experience', 'fas fa-mobile-alt', 7);

-- Insert major regulatory bodies
INSERT OR IGNORE INTO country_regulations (country_code, country_name, regulator_name, regulator_acronym, leverage_limit, trader_protection, compensation_scheme, compensation_amount, segregated_accounts, negative_balance_protection) VALUES
('AU', 'Australia', 'Australian Securities and Investments Commission', 'ASIC', 30, 'Strong', 'Australian Financial Complaints Authority', 500000, TRUE, TRUE),
('GB', 'United Kingdom', 'Financial Conduct Authority', 'FCA', 30, 'Strong', 'Financial Services Compensation Scheme', 85000, TRUE, TRUE),
('US', 'United States', 'Commodity Futures Trading Commission', 'CFTC', 50, 'Strong', 'SIPC Protection', 500000, TRUE, FALSE),
('CY', 'Cyprus', 'Cyprus Securities and Exchange Commission', 'CySEC', 30, 'Medium', 'Investor Compensation Fund', 20000, TRUE, TRUE),
('SC', 'Seychelles', 'Financial Services Authority', 'FSA', 1000, 'Low', 'Limited Protection', 0, FALSE, FALSE),
('VG', 'British Virgin Islands', 'BVI Financial Services Commission', 'BVIFSC', 1000, 'Low', 'No Compensation', 0, FALSE, FALSE),
('CA', 'Canada', 'Investment Industry Regulatory Organization of Canada', 'IIROC', 50, 'Strong', 'Canadian Investor Protection Fund', 1000000, TRUE, TRUE);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_broker_assets_broker_id ON broker_assets(broker_id);
CREATE INDEX IF NOT EXISTS idx_broker_details_broker_id ON broker_details(broker_id);
CREATE INDEX IF NOT EXISTS idx_broker_scores_broker_id ON broker_scores(broker_id);
CREATE INDEX IF NOT EXISTS idx_broker_platforms_broker_id ON broker_platforms(broker_id);
CREATE INDEX IF NOT EXISTS idx_payment_methods_enhanced_broker_id ON payment_methods_enhanced(broker_id);
CREATE INDEX IF NOT EXISTS idx_broker_countries_broker_id ON broker_countries(broker_id);
CREATE INDEX IF NOT EXISTS idx_broker_countries_country_code ON broker_countries(country_code);
CREATE INDEX IF NOT EXISTS idx_user_reviews_broker_id ON user_reviews(broker_id);
CREATE INDEX IF NOT EXISTS idx_spreads_enhanced_broker_id ON spreads_enhanced(broker_id);
CREATE INDEX IF NOT EXISTS idx_spreads_enhanced_currency_pair ON spreads_enhanced(currency_pair);
CREATE INDEX IF NOT EXISTS idx_account_types_enhanced_broker_id ON account_types_enhanced(broker_id);
CREATE INDEX IF NOT EXISTS idx_trading_instruments_broker_id ON trading_instruments(broker_id);
CREATE INDEX IF NOT EXISTS idx_educational_resources_broker_id ON educational_resources(broker_id);
CREATE INDEX IF NOT EXISTS idx_research_tools_broker_id ON research_tools(broker_id);
CREATE INDEX IF NOT EXISTS idx_customer_support_broker_id ON customer_support(broker_id);