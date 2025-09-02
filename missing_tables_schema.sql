-- Missing tables required by complete_forex_brokers_database.sql

-- Broker comprehensive reviews table
CREATE TABLE IF NOT EXISTS broker_comprehensive_reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    broker_id INTEGER NOT NULL,
    review_text TEXT,
    methodology_notes TEXT,
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (broker_id) REFERENCES brokers(id) ON DELETE CASCADE
);

-- Broker detailed ratings table  
CREATE TABLE IF NOT EXISTS broker_detailed_ratings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    broker_id INTEGER NOT NULL,
    regulation_trust_score REAL DEFAULT 0.0,
    fees_score REAL DEFAULT 0.0,
    platform_tools_score REAL DEFAULT 0.0,
    deposit_withdrawal_score REAL DEFAULT 0.0,
    customer_support_score REAL DEFAULT 0.0,
    research_education_score REAL DEFAULT 0.0,
    user_reviews_count INTEGER DEFAULT 0,
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (broker_id) REFERENCES brokers(id) ON DELETE CASCADE
);

-- Broker regulation details table
CREATE TABLE IF NOT EXISTS broker_regulation_details (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    broker_id INTEGER NOT NULL,
    regulatory_body TEXT,
    license_details TEXT,
    jurisdiction_details TEXT,
    compliance_notes TEXT,
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (broker_id) REFERENCES brokers(id) ON DELETE CASCADE
);

-- Broker fee structures table
CREATE TABLE IF NOT EXISTS broker_fee_structures (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    broker_id INTEGER NOT NULL,
    fee_type TEXT,
    fee_amount REAL,
    fee_percentage REAL,
    fee_description TEXT,
    account_type TEXT,
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (broker_id) REFERENCES brokers(id) ON DELETE CASCADE
);

-- Broker platform details table
CREATE TABLE IF NOT EXISTS broker_platform_details (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    broker_id INTEGER NOT NULL,
    platform_name TEXT,
    platform_features TEXT,
    platform_rating REAL,
    mobile_support BOOLEAN DEFAULT FALSE,
    api_support BOOLEAN DEFAULT FALSE,
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (broker_id) REFERENCES brokers(id) ON DELETE CASCADE
);

-- Broker support analysis table
CREATE TABLE IF NOT EXISTS broker_support_analysis (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    broker_id INTEGER NOT NULL,
    support_channels TEXT,
    response_time TEXT,
    support_quality_rating REAL,
    languages_supported TEXT,
    availability_hours TEXT,
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (broker_id) REFERENCES brokers(id) ON DELETE CASCADE
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_broker_comprehensive_reviews_broker_id ON broker_comprehensive_reviews(broker_id);
CREATE INDEX IF NOT EXISTS idx_broker_detailed_ratings_broker_id ON broker_detailed_ratings(broker_id);
CREATE INDEX IF NOT EXISTS idx_broker_regulation_details_broker_id ON broker_regulation_details(broker_id);
CREATE INDEX IF NOT EXISTS idx_broker_fee_structures_broker_id ON broker_fee_structures(broker_id);
CREATE INDEX IF NOT EXISTS idx_broker_platform_details_broker_id ON broker_platform_details(broker_id);
CREATE INDEX IF NOT EXISTS idx_broker_support_analysis_broker_id ON broker_support_analysis(broker_id);