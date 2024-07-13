package handlers

import (
	"encoding/base64"
	"fmt"
	"os"
	"strings"

	"github.com/gofiber/fiber/v2"
)

func HandleAuth(c *fiber.Ctx) error {
	// Check if the Authorization header is present
	if len(c.GetReqHeaders()["Authorization"]) == 0 {
		return HandleAuthForbidden(c)
	}

	// Extract the authorization header
	authorization := c.GetReqHeaders()["Authorization"][0]

	// Check if the authorization header is valid
	match := strings.Split(authorization, "Basic ")
	if len(match) != 2 {
		return HandleAuthForbidden(c)
	}

	// Decode the authorization header
	decoded, err := base64.StdEncoding.DecodeString(string(match[1]))
	if err != nil {
		fmt.Println(err)
	}

	// Check if the credentials are valid
	credentials := fmt.Sprintf("%s:%s", "Cyb3rM0nk3ys", os.Getenv("SERVER_PASSWORD"))
	if strings.Compare(string(decoded), credentials) != 0 {
		return HandleAuthForbidden(c)
	}

	return c.Next()
}

func HandleAuthForbidden(c *fiber.Ctx) error {
	return c.Status(fiber.StatusForbidden).JSON(fiber.Map{
		"error": "Forbidden",
	})
}
