package router

import (
	"github.com/MrLucio/M0nk3yFarm/handlers"
	"github.com/gofiber/fiber/v2"

	_ "github.com/MrLucio/M0nk3yFarm/docs"
)

func AddConfigRoutes(app fiber.Router) {
	app.Get("/info", handlers.HandleInfo)
}
