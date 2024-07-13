package utils

import (
	"fmt"
	"slices"
	"time"

	"github.com/MrLucio/M0nk3yFarm/structs"
)

func GetTeams(Config structs.Config) []structs.Team {
	teams := make([]structs.Team, Config.MaxTeams)

	for i := 0; i < Config.MaxTeams; i++ {
		if slices.Contains(Config.ExcludedTeams, i) {
			continue
		}

		team := structs.Team{
			Name:    fmt.Sprintf(Config.TeamFormat, i),
			Address: fmt.Sprintf(Config.AddressFormat, i),
		}

		teams[i] = team
	}

	return teams
}

func ParseTime(date string) time.Time {
	t, _ := time.Parse("2006-01-02T15:04Z0700", date)
	return t
}
