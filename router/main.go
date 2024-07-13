package router

import (
	"github.com/MrLucio/M0nk3yFarm/handlers"
	"github.com/gofiber/fiber/v2"
)

func AddRoutes(app *fiber.App) {
	app.Get("/", handlers.HandleIndex)

	// Add Flags routes
	AddFlagsRoutes(app)

	// Add Swagger routes
	AddSwaggerRoutes(app)
}