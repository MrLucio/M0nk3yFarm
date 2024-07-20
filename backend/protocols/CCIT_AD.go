package protocols

import (
	"encoding/json"

	"github.com/MrLucio/M0nk3yFarm/structs"
	"github.com/gofiber/fiber/v2"
)

var CCIT_AD = structs.Protocol{
	Name:        "CCIT_AD",
	SubmitFlags: SubmitFlags,
}

func SubmitFlags(URL string, flags []structs.Flag) ([]structs.Flag, error) {
	var flagList []string
	for _, f := range flags {
		flagList = append(flagList, f.Flag)
	}
	jsonData, err := json.Marshal(flagList)
	if err != nil {
		return []structs.Flag{}, err
	}

	agent := fiber.AcquireAgent()
	request := agent.Request()
	defer fiber.ReleaseAgent(agent)

	// Headers
	request.SetRequestURI(URL)
	request.Header.SetMethod(fiber.MethodPut)
	request.Header.SetContentType("application/json")
	request.Header.Set("Accept", "application/json")

	// Request body
	request.SetBody(jsonData)

	// Response
	if err := agent.Parse(); err != nil {
		return []structs.Flag{}, err
	}

	_, body, _ := agent.Bytes()

	// TODO: Handle errors
	return ProcessResponse(body, flags)
}

func ProcessResponse(response []byte, flags []structs.Flag) ([]structs.Flag, error) {
	var result []structs.Flag

	/* for _, flag := range response {
		result = append(result, structs.Flag{Flag: flag})
	} */
	for _, flag := range flags {
		flag.Status = "submitted"
		result = append(result, flag)
	}

	// TODO: Handle errors
	return result, nil
}
