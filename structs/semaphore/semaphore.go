package semaphore

import (
	"sync"
)

type Semaphore struct {
	mu    sync.Mutex
	cond  *sync.Cond
	count int
}

func New(initialCount int) *Semaphore {
	s := &Semaphore{
		count: initialCount,
	}
	s.cond = sync.NewCond(&s.mu)
	return s
}

func (s *Semaphore) Acquire() {
	s.mu.Lock()
	defer s.mu.Unlock()

	for s.count <= 0 {
		s.cond.Wait()
	}
	s.count--
}

func (s *Semaphore) Release() {
	s.mu.Lock()
	defer s.mu.Unlock()

	s.count++
	s.cond.Signal()
}

func (s *Semaphore) TryRelease() bool {
	s.mu.Lock()
	defer s.mu.Unlock()

	if s.count > 0 {
		s.count++
		s.cond.Signal()
		return true
	}
	return false
}

func (s *Semaphore) Count() int {
	s.mu.Lock()
	defer s.mu.Unlock()
	return s.count
}
