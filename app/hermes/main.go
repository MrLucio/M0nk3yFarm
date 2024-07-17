package hermes

import (
	"sync"

	"github.com/MrLucio/M0nk3yFarm/config"
	constants "github.com/MrLucio/M0nk3yFarm/config/constants"
	"github.com/MrLucio/M0nk3yFarm/structs"
	"github.com/MrLucio/M0nk3yFarm/structs/semaphore"
	stack "github.com/MrLucio/M0nk3yFarm/structs/stack"
)

func Setup(mu *sync.Mutex, sem *semaphore.Semaphore, syncList *stack.SyncStack[structs.Flag]) {
	for {
		flag := <-constants.FlagChannel

		for i := 0; i < config.Config.FlagBulkLimit; i++ {
			syncList.Push(*flag)
		}

		sem.Release()
	}
}
