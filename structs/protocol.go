package structs

type Protocol struct {
	Name        string
	SubmitFlags func(URL string, flags []Flag) ([]Flag, error)
}
