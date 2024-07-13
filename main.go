package main

import (
	"github.com/MrLucio/M0nk3yFarm/app"

	_ "github.com/MrLucio/M0nk3yFarm/docs"
)

// @title M0nk3yFarm
// @version 1.0
// @description
// @contact.name Luciano Mateias
// @license.name MIT
// @BasePath /
func main() {
	// Setup and run the app
	err := app.Setup()
	if err != nil {
		panic(err)
	}
}