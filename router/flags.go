package router

import (
	"github.com/MrLucio/M0nk3yFarm/handlers"
	"github.com/gofiber/fiber/v2"

	_ "github.com/MrLucio/M0nk3yFarm/docs"
)

func AddFlagsRoutes(app *fiber.App) {
	app.Get("/flags", handlers.HandleFlags)
	app.Post("/flags", handlers.HandleFlagsSubmit)
}
