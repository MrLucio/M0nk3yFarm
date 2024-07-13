package config

import (
	"regexp"

	"github.com/MrLucio/M0nk3yFarm/protocols"
	"github.com/MrLucio/M0nk3yFarm/structs"
	"github.com/MrLucio/M0nk3yFarm/utils"
)

var Config = structs.Config{
	// Teams
	MaxTeams:      44,
	ExcludedTeams: []int{1, 32},
	TeamFormat:    "Team #%d",
	AddressFormat: "10.60.%d.1",

	// Token
	PersonalToken: "ccitad",

	// Tick & Time
	Timezone:     "Europe/Rome",
	TickDuration: 120, // 2 minutes
	TickStart:    utils.ParseTime("2024-06-21T10:00+0200"),
	TickEnd:      utils.ParseTime("2024-06-21T18:00+0200"),

	// Flag
	FlagFormat:    regexp.MustCompile(`[A-Z0-9]{31}=`),
	FlagBulkLimit: 15,

	// Server
	URL: "http://10.10.0.1:8080/flags",

	// Protocol
	Protocol: protocols.CCIT_AD,
}

func init() {
	Config.Teams = utils.GetTeams(Config)
}
