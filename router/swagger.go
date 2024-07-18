package router

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/swagger"

	_ "github.com/MrLucio/M0nk3yFarm/docs"
)

func AddSwaggerRoutes(app *fiber.App) {
	app.Get("/docs/*", swagger.New(swagger.Config{
		CustomStyle: " ",
	}))
}
