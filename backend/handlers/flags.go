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
// @Success 200 {object} []structs.FlagsResponse "Flags response"
// @Failure 400
// @Failure 403
// @Security		BasicAuth
// @Router /flags [get]
func HandleFlags(c *fiber.Ctx) error {
	pagination := new(structs.Pagination)
	filter := new(structs.FlagsFilter)

	if err := utils.ParsePagination(c, pagination); err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	if err := c.QueryParser(filter); err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	flags := utils.GetFlags(*pagination, *filter)
	stats := utils.GetFlagsStats()

	flagsResponse := structs.FlagsResponse{FlagsStats: stats, Flags: flags}

	return c.JSON(flagsResponse)
}

// @Summary Add flags
// @Tags Flags
// @Accept json
// @Param flags body []structs.Flag true "Flags to add"
// @Produce json
// @Success 204
// @Failure 400
// @Failure 403
// @Security		BasicAuth
// @Router /flags [post]
func HandleFlagsAdd(c *fiber.Ctx) error {
	flags := new(structs.Flags)

	if err := c.BodyParser(&flags); err != nil || len(flags.Flags) == 0 {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	if errs := utils.Validate(flags); len(errs) > 0 {
		return c.SendStatus(fiber.StatusBadRequest)
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

	return c.SendStatus(fiber.StatusNoContent)
}

// @Summary Get flags stats
// @Tags Flags
// @Produce json
// @Success 200 {object} structs.FlagsStats
// @Failure 403
// @Security		BasicAuth
// @Router /flags/stats [get]
func HandleFlagsStats(c *fiber.Ctx) error {
	stats := utils.GetFlagsStats()

	return c.JSON(stats)
}

// @Summary Submit flags
// @Tags Flags
// @Produce json
// @Success 204
// @Failure 424
// @Failure 403
// @Security		BasicAuth
// @Router /flags/submit [post]
func HandleFlagsSubmit(c *fiber.Ctx) error {
	if err := hermes.Hermes.SubmitFlags(); err != nil {
		return c.SendStatus(fiber.StatusFailedDependency)
	}

	return c.SendStatus(fiber.StatusNoContent)
}
