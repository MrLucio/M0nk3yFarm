package hermes

import (
	"sync"

	"github.com/MrLucio/M0nk3yFarm/config"
	"github.com/MrLucio/M0nk3yFarm/structs"
	"github.com/MrLucio/M0nk3yFarm/structs/semaphore"
	stack "github.com/MrLucio/M0nk3yFarm/structs/stack"
)

type hermes struct {
	mu         *sync.Mutex
	sem        *semaphore.Semaphore
	localStack *stack.Stack[structs.Flag]
	stack      *stack.SyncStack[structs.Flag]
}

var Hermes *hermes = nil

func New(
	mu *sync.Mutex,
	sem *semaphore.Semaphore,
	syncStack *stack.SyncStack[structs.Flag],
) *hermes {
	Hermes = &hermes{
		mu:         mu,
		sem:        sem,
		localStack: stack.New[structs.Flag](),
		stack:      syncStack,
	}
	return Hermes
}

func (h *hermes) SubmitFlags() {
	if h.localStack.Len() == 0 {
		return
	}
	h.localStack.Clear()
	h.sem.Release()
}

func (h *hermes) EnqueueFlag(flag structs.Flag) {
	h.localStack.Push(flag)
	h.stack.Push(flag)

	if h.localStack.Len() == config.Config.FlagBulkLimit {
		h.SubmitFlags()
	}
}
