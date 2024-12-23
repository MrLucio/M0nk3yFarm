package structs

type FilterEntry struct {
	Field string
	Value string
}

type Filter []FilterEntry

type Pagination struct {
	Page  int    `json:"page"`
	Limit int    `json:"limit"`
	Sort  string `json:"sort"`
}
