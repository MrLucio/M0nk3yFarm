package utils

import (
	"log"

	"github.com/MrLucio/M0nk3yFarm/database"
	"github.com/MrLucio/M0nk3yFarm/structs"
)

func GetFlags(pagination structs.Pagination, filter structs.FlagFilter) []structs.Flag {
	rows, err := database.Db.Query(
		"SELECT flag, sploit, team, status, response, updated_at FROM flags ORDER BY created_at DESC LIMIT ? OFFSET ?;",
		pagination.PerPage,
		pagination.Page*pagination.PerPage,
	)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	var flags []structs.Flag

	for rows.Next() {
		var flag structs.Flag
		err = rows.Scan(
			&flag.Flag,
			&flag.Sploit,
			&flag.Team,
			&flag.Status,
			&flag.Response,
			&flag.Time,
		)
		if err != nil {
			log.Fatal(err)
		}
		flags = append(flags, flag)
	}

	return flags
}
