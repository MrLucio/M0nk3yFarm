package utils

import (
	"fmt"
	"slices"
	"time"

	"github.com/MrLucio/M0nk3yFarm/structs"
	"github.com/gofiber/fiber/v2/log"
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

func ParseTime(date string, timezone string) time.Time {
	t, _ := time.Parse("2006-01-02T15:04", date)

	loc, err := time.LoadLocation(timezone)

	if err != nil {
		log.Fatal("Error parsing timezone: ", timezone)
		return time.Time{}
	}

	t = t.In(loc)

	return t
}
