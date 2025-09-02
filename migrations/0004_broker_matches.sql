-- Create broker matches and recommendations tables
-- These tables store user's broker match history and recommendations

-- Main table for storing broker match sessions
CREATE TABLE IF NOT EXISTS broker_matches (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    user_profile TEXT NOT NULL, -- JSON with questionnaire answers
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Individual broker recommendations for each match
CREATE TABLE IF NOT EXISTS broker_recommendations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    match_id INTEGER NOT NULL,
    broker_id INTEGER NOT NULL,
    score REAL NOT NULL,
    reasoning TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (match_id) REFERENCES broker_matches(id) ON DELETE CASCADE,
    FOREIGN KEY (broker_id) REFERENCES brokers(id) ON DELETE CASCADE
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_broker_matches_user_id ON broker_matches(user_id);
CREATE INDEX IF NOT EXISTS idx_broker_matches_created_at ON broker_matches(created_at);
CREATE INDEX IF NOT EXISTS idx_broker_recommendations_match_id ON broker_recommendations(match_id);
CREATE INDEX IF NOT EXISTS idx_broker_recommendations_score ON broker_recommendations(score);