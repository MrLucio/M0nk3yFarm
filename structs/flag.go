package structs

type Flag struct {
	Flag   string `json:"flag" validate:"required"`
	Sploit string `json:"sploit" validate:"required"`
	Team   string `json:"team"`
	Time   int    `json:"time"`
	Status string `json:"status"`
}
