package handlers

import (
	"fmt"
	"strings"

	"github.com/MrLucio/M0nk3yFarm/config"
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
	flags := utils.GetFlags()

	return c.JSON(flags)
}

// @Summary flags
// @Description flags
// @Tags flags
// @Accept json
// @Produce json
// @Success 200 {string} string "flags"
// @Router / [get]
func HandleFlagsAdd(c *fiber.Ctx) error {
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

func HandleFlagsSubmit(c *fiber.Ctx) error {
	flags := utils.GetFlags()

	err := config.Config.Protocol.SubmitFlags(config.Config.URL, flags)
	if err != nil {
		return err
	}

	return c.JSON(flags)
}
