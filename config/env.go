package config

import (
	"os"

	"github.com/joho/godotenv"
)

// LoadEnv loads the environment variables from the .env file if GO_ENV is not set
func LoadEnv() error {
	goEnv := os.Getenv("GO_ENV")
	if goEnv == "" || goEnv == "development" {
		err := godotenv.Load()
		if err != nil {
			return err
		}
	}
	return nil
}