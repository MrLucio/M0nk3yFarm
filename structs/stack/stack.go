package structs

type (
	Stack[T any] struct {
		top    *node[T]
		length int
	}
	node[T any] struct {
		value T
		prev  *node[T]
	}
)

// Create a new stack
func New[T any]() *Stack[T] {
	return &Stack[T]{nil, 0}
}

// Return the number of items in the stack
func (s *Stack[T]) Len() int {
	return s.length
}

// View the top item on the stack
func (s *Stack[T]) Peek() T {
	if s.length == 0 {
		var empty T
		return empty
	}
	return s.top.value
}

// Pop the top item of the stack and return it
func (s *Stack[T]) Pop() (*Stack[T], T) {
	if s.length == 0 {
		var empty T
		return s, empty
	}

	n := s.top
	s.top = n.prev
	s.length--
	return s, n.value
}

func (s *Stack[T]) PopMany(n int) (*Stack[T], []T) {
	if n > s.length {
		n = s.length
	}

	result := make([]T, n)

	for i := 0; i < n; i++ {
		n := s.top
		s.top = n.prev
		result[i] = n.value
	}

	s.length -= n
	return s, result
}

// Push a value onto the top of the stack
func (s *Stack[T]) Push(value *T) (*Stack[T], T) {
	n := &node[T]{*value, s.top}
	s.top = n
	s.length++

	return s, *value
}

func (s *Stack[T]) PushMany(values []T) *Stack[T] {
	for _, value := range values {
		s.Push(&value)
	}
	return s
}
