package config

const SQLCreateTable = "CREATE TABLE IF NOT EXISTS flags (flag TEXT NOT NULL PRIMARY KEY, sploit TEXT, team TEXT, status TEXT DEFAULT \"\", response TEXT DEFAULT \"\", created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)"
const SQLPath = "db.db"
