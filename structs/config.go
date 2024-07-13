package structs

import (
	"regexp"
	"time"
)

type Config struct {
	// Teams
	MaxTeams      int
	ExcludedTeams []int
	TeamFormat    string
	AddressFormat string

	// Teams
	Teams []Team

	// Token
	PersonalToken string

	// Tick & Time
	Timezone     string
	TickDuration int
	TickStart    time.Time
	TickEnd      time.Time

	// Flag
	FlagFormat    *regexp.Regexp
	FlagBulkLimit int

	// Server
	URL string

	// Protocol
	Protocol Protocol
}
