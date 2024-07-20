package structs

type FilterEntry struct {
	Field string
	Value string
}

type Filter []FilterEntry

type Pagination struct {
	Page    int         `json:"page"`
	PerPage int         `json:"per_page"`
	SortBy  FilterEntry `json:"sort_by"`
}
