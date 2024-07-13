package app

import (
	"os"

	"github.com/MrLucio/M0nk3yFarm/config"
	"github.com/MrLucio/M0nk3yFarm/database"
	"github.com/MrLucio/M0nk3yFarm/router"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

func Setup() error {
	// Load environment variables
	err := config.LoadEnv()
	if err != nil {
		return err
	}

	// Create the app
	app := fiber.New()

	// Setup the database
	database.Start()
	defer database.Db.Close()

	// Setup the logger
	app.Use(logger.New(logger.Config{
		Format: "[${ip}:${port}] ${status} - ${method} ${path} ${latency}\n",
	}))

	// Setup the recover middleware
	app.Use(recover.New())

	// Setup the router
	router.AddRoutes(app)

	// Start the server
	app.Listen(":" + os.Getenv("PORT"))

	return nil
}
