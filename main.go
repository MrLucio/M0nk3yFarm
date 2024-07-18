package main

import (
	"github.com/MrLucio/M0nk3yFarm/app"

	_ "github.com/MrLucio/M0nk3yFarm/docs"
)

// @title M0nk3yFarm
// @version 1.0
// @termsOfService  http://swagger.io/terms/

// @license.name MIT
// @license.url https://github.com/MrLucio/M0nk3yFarm/blob/main/LICENSE

// @BasePath /api

// @securityDefinitions.basic  BasicAuth

// @Schemes https http
func main() {
	// Setup and run the app
	err := app.Setup()
	if err != nil {
		panic(err)
	}
}
