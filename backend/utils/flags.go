package utils

import (
	"fmt"
	"log"
	"regexp"
	"slices"
	"strings"

	"github.com/MrLucio/M0nk3yFarm/database"
	"github.com/MrLucio/M0nk3yFarm/structs"
	"github.com/gofiber/fiber/v2"
)

func GetFlags(pagination structs.Pagination, filter structs.FlagsFilter) []structs.Flag {
	rows, err := database.Db.Query(
		fmt.Sprintf(
			"SELECT flag, sploit, team, status, response, updated_at FROM flags ORDER BY %s LIMIT ? OFFSET ?;",
			pagination.Order,
		),
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

func GetFlagsStats() structs.FlagsStats {
	rows, err := database.Db.Query(
		"SELECT COUNT(*), COUNT(*) FILTER (WHERE status = 'queued'), COUNT(*) FILTER (WHERE status = 'success') FROM flags;",
	)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	var stats structs.FlagsStats

	for rows.Next() {
		err = rows.Scan(&stats.Flags, &stats.Queued, &stats.Success)
		if err != nil {
			log.Fatal(err)
		}
	}

	return stats
}

func ParsePagination(c *fiber.Ctx, pagination *structs.Pagination) error {
	if err := c.QueryParser(pagination); err != nil {
		return err
	}

	var re = regexp.MustCompile(`(?m)(?:([a-zA-Z_]+)\.(asc|desc))`)
	var str = c.Query("order")
	var orders []string

	for _, match := range re.FindAllStringSubmatch(str, -1) {
		switch match[1] {
		case "flag", "team", "sploit", "created_at":
			if slices.ContainsFunc(orders, func(s string) bool {
				return strings.HasPrefix(s, match[1])
			}) {
				return fmt.Errorf("duplicate order")
			}
			orders = append(orders, fmt.Sprintf("%s %s", match[1], match[2]))
		default:
			log.Println(match)
			return fmt.Errorf("invalid order")
		}
	}

	pagination.PerPage = 10
	if len(orders) == 0 {
		pagination.Order = "created_at desc"
	} else {
		pagination.Order = strings.Join(orders, ", ")
	}

	return nil
}
