package utils

import (
	"log"

	"github.com/MrLucio/M0nk3yFarm/database"
	"github.com/MrLucio/M0nk3yFarm/structs"
)

func GetFlags() []structs.Flag {
	rows, err := database.Db.Query("SELECT * FROM flags LIMIT 10")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	var flags []structs.Flag

	for rows.Next() {
		var flag structs.Flag
		err = rows.Scan(&flag.Flag, &flag.Sploit, &flag.Team, &flag.Time, &flag.Status)
		if err != nil {
			log.Fatal(err)
		}
		flags = append(flags, flag)
	}

	return flags
}
