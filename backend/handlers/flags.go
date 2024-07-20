package handlers

import (
	"github.com/MrLucio/M0nk3yFarm/app/hermes"
	"github.com/MrLucio/M0nk3yFarm/database"
	"github.com/MrLucio/M0nk3yFarm/structs"
	"github.com/MrLucio/M0nk3yFarm/utils"
	"github.com/gofiber/fiber/v2"
)

// @Summary Get last 100 flags
// @Tags Flags
// @Produce json
// @Success 200 {object} []structs.Flag "Flags"
// @Security		BasicAuth
// @Router /flags [get]
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

// @Summary Add flags
// @Tags Flags
// @Accept json
// @Param flags body []structs.Flag true "Flags to add"
// @Produce json
// @Success 204
// @Failure 400
// @Security		BasicAuth
// @Router /flags [post]
func HandleFlagsAdd(c *fiber.Ctx) error {
	flags := new(structs.Flags)

	if err := c.BodyParser(&flags); err != nil || len(flags.Flags) == 0 {
		return c.SendStatus(400)
	}

	if errs := utils.Validate(flags); len(errs) > 0 {
		return c.SendStatus(400)
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

	return c.SendStatus(204)
}

// @Summary Submit flags
// @Tags Flags
// @Produce json
// @Success 204
// @Failure 424
// @Security		BasicAuth
// @Router /flags/submit [post]
func HandleFlagsSubmit(c *fiber.Ctx) error {
	if err := hermes.Hermes.SubmitFlags(); err != nil {
		return c.SendStatus(424)
	}

	return c.SendStatus(204)
}
