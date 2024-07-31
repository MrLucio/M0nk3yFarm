package router

import (
	"github.com/MrLucio/M0nk3yFarm/handlers"
	"github.com/gofiber/fiber/v2"

	_ "github.com/MrLucio/M0nk3yFarm/docs"
)

func AddFlagsRoutes(app fiber.Router) {
	// GET
	app.Get("/flags", handlers.HandleFlags)
	app.Get("/flags/stats", handlers.HandleFlagsStats)

	// POST
	app.Post("/flags", handlers.HandleFlagsAdd)
	app.Post("/flags/submit", handlers.HandleFlagsSubmit)
}
