package router

import (
	"github.com/MrLucio/M0nk3yFarm/handlers"
	"github.com/gofiber/fiber/v2"
)

func AddRoutes(app *fiber.App) {
	api := app.Group("/api")
	auth := api.Group("", handlers.HandleAuth)

	// Add Flags routes
	AddFlagsRoutes(auth)

	// Add Swagger routes
	AddSwaggerRoutes(app)
}
