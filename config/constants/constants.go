package config

import (
	"github.com/MrLucio/M0nk3yFarm/structs"
)

const SQLCreateTable = "CREATE TABLE IF NOT EXISTS flags (flag TEXT NOT NULL PRIMARY KEY, sploit TEXT, team TEXT, status TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)"
const SQLPath = "db.db"

var FlagChannel = make(chan *structs.Flag)
