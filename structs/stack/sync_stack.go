package structs

import (
	"sync"
	"sync/atomic"
)

type SyncStack[T any] struct {
	mu sync.Mutex

	read atomic.Pointer[readOnly[T]]
}

type readOnly[T any] struct {
	s *Stack[T]
}

func (s *SyncStack[T]) loadReadOnly() readOnly[T] {
	if p := s.read.Load(); p != nil {
		return *p
	}
	return readOnly[T]{s: New[T]()}
}

func (s *SyncStack[T]) Push(value T) T {
	s.mu.Lock()
	defer s.mu.Unlock()

	read := s.loadReadOnly()
	stack, value := read.s.Push(value)
	s.read.Store(&readOnly[T]{s: stack})

	return value
}

func (s *SyncStack[T]) PushMany(values []T) []T {
	s.mu.Lock()
	defer s.mu.Unlock()

	read := s.loadReadOnly()
	stack := read.s.PushMany(values)
	s.read.Store(&readOnly[T]{s: stack})

	return values
}

func (s *SyncStack[T]) Pop() T {
	s.mu.Lock()
	defer s.mu.Unlock()

	read := s.loadReadOnly()
	stack, value := read.s.Pop()
	s.read.Store(&readOnly[T]{s: stack})

	return value
}

func (s *SyncStack[T]) PopMany(n int) []T {
	s.mu.Lock()
	defer s.mu.Unlock()

	read := s.loadReadOnly()
	stack, values := read.s.PopMany(n)
	s.read.Store(&readOnly[T]{s: stack})

	return values
}

func (s *SyncStack[T]) Len() int {
	s.mu.Lock()
	defer s.mu.Unlock()

	read := s.loadReadOnly()
	return read.s.Len()
}
