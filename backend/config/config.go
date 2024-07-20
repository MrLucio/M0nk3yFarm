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
	TickDuration: 120,                                                // Seconds
	TickStart:    utils.ParseTime("2024-06-21T10:00", "Europe/Rome"), // UTC Time and Timezone
	TickEnd:      utils.ParseTime("2024-06-21T18:00", "Europe/Rome"), // UTC Time and Timezone

	// Flag
	/*
		The server will submit maximum FlagBulkLimit flags
		every FlagSubmitInterval seconds.
		Flags will be ignored after FlagLifetime minutes.
	*/
	FlagFormat:         regexp.MustCompile(`[A-Z0-9]{31}=`), // Flag parsing regex
	FlagBulkLimit:      15,                                  // Maximum number of flags to submit in a single request
	FlagSubmitInterval: 10,                                  // Seconds between flag submissions
	FlagLifetime:       5 * 120,                             // Minutes of lifetime of a flag

	// Server
	URL: "http://10.10.0.1:8080/flags",

	// Protocol
	Protocol: protocols.CCIT_AD,
}

func init() {
	Config.Teams = utils.GetTeams(Config)
}
