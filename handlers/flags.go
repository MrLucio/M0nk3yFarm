package handlers

import (
	"fmt"
	"log"
	"strings"

	"github.com/MrLucio/M0nk3yFarm/database"
	"github.com/MrLucio/M0nk3yFarm/structs"
	"github.com/MrLucio/M0nk3yFarm/utils"
	"github.com/gofiber/fiber/v2"
)

// @Summary flags
// @Description flags
// @Tags flags
// @Accept json
// @Produce json
// @Success 200 {string} string "flags"
// @Router / [get]
func HandleFlags(c *fiber.Ctx) error {
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

	return c.JSON(flags)
}

// @Summary flags
// @Description flags
// @Tags flags
// @Accept json
// @Produce json
// @Success 200 {string} string "flags"
// @Router / [get]
func HandleFlagsSubmit(c *fiber.Ctx) error {
	flag := &structs.Flag{
		Flag:   c.Query("flag"),
		Sploit: c.Query("sploit"),
	}

	if errs := utils.Validate(flag); len(errs) > 0 && errs[0].Error {
		errMsgs := make([]string, 0)

		for _, err := range errs {
			errMsgs = append(errMsgs, fmt.Sprintf(
				"Error with field %s",
				err.FailedField,
			))
		}

		return &fiber.Error{
			Code:    fiber.ErrBadRequest.Code,
			Message: strings.Join(errMsgs, "\n"),
		}
	}

	database.Db.Exec("INSERT INTO flags (flag, sploit) VALUES (?, ?)", flag.Flag, flag.Sploit)

	return c.JSON(flag)
}
