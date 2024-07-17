package athena

import (
	"sync"
	"time"

	"github.com/MrLucio/M0nk3yFarm/config"
	"github.com/MrLucio/M0nk3yFarm/structs"
	"github.com/MrLucio/M0nk3yFarm/structs/semaphore"
	stack "github.com/MrLucio/M0nk3yFarm/structs/stack"
)

func Setup(mu *sync.Mutex, sem *semaphore.Semaphore, syncList *stack.SyncStack[structs.Flag]) {
	for {
		sem.Acquire()

		// flags := syncList.PopMany(config.Config.FlagBulkLimit)

		time.Sleep(time.Second * 5)
	}
}

func submitFlags(flags []structs.Flag) error {
	err := config.Config.Protocol.SubmitFlags(config.Config.URL, flags)
	if err != nil {
		return err
	}

	return nil
}
