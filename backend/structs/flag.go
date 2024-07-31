package structs

import "time"

type Flag struct {
	Flag     string    `json:"flag"     validate:"required"`
	Sploit   string    `json:"sploit"   validate:"required"`
	Team     string    `json:"team"     validate:"required"`
	Time     time.Time `json:"time"`
	Response string    `json:"response"`
	Status   string    `json:"status"`
}

type Flags struct {
	Flags []Flag `json:"flags" validate:"required,dive,required"`
}

type FlagsFilter struct {
	Flag   string `json:"flag"`
	Sploit string `json:"sploit"`
	Team   string `json:"team"`
	Before int    `json:"before"`
	After  int    `json:"after"`
	Status string `json:"status"`
}

type FlagsStats struct {
	Flags   int `json:"flags"`
	Queued  int `json:"queued"`
	Success int `json:"success"`
}

type FlagsResponse struct {
	FlagsStats FlagsStats `json:"stats"`
	Flags      []Flag     `json:"flags"`
}
