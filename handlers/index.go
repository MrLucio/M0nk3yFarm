package handlers

import "github.com/gofiber/fiber/v2"

// @Summary Hello World
// @Description Hello World
// @Tags Hello World
// @Accept json
// @Produce json
// @Success 200 {string} string "Hello World"
// @Router / [get]
func HandleIndex(c *fiber.Ctx) error {
	return c.SendString("Hello World!")
}