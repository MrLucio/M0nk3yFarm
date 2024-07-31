package handlers

import (
	"github.com/gofiber/fiber/v2"
)

// @Summary
// @Tags Config
// @Produce json
// @Success 204
// @Failure 403
// @Security		BasicAuth
// @Router /info [get]
func HandleInfo(c *fiber.Ctx) error {
	return c.SendStatus(fiber.StatusNoContent)
}
