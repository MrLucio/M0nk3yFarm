package handlers

import (
	"fmt"

	"github.com/MrLucio/M0nk3yFarm/app/hermes"
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
	pagination := structs.Pagination{
		Page:    0,
		PerPage: 100,
		SortBy:  structs.FilterEntry{Field: "created_at", Value: "desc"},
	}
	filter := structs.FlagFilter{}

	flags := utils.GetFlags(pagination, filter)

	return c.JSON(flags)
}

// @Summary flags
// @Description flags
// @Tags flags
// @Accept json
// @Produce json
// @Success 200 {string} string "flags"
// @Router / [post]
func HandleFlagsAdd(c *fiber.Ctx) error {
	flags := new(structs.Flags)
	err := c.BodyParser(flags)
	if err != nil {
		fmt.Println(err)
		return err
	}

	parameters := make([]interface{}, len(flags.Flags)*4)

	for index, flag := range flags.Flags {
		parameters[index*4] = flag.Flag
		parameters[index*4+1] = flag.Sploit
		parameters[index*4+2] = flag.Team
		parameters[index*4+3] = "queued"
	}

	database.Db.Exec(
		"INSERT INTO flags (flag, sploit, team, status) VALUES "+database.CreateParameterString(
			len(flags.Flags),
			4,
		),
		parameters...,
	)

	for _, flag := range flags.Flags {
		hermes.Hermes.EnqueueFlag(flag)
	}

	return c.JSON(flags)
}

func HandleFlagsSubmit(c *fiber.Ctx) error {
	hermes.Hermes.SubmitFlags()

	return c.SendString("OK")
}
