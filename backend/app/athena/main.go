package athena

import (
	"fmt"
	"sync"
	"time"

	"github.com/MrLucio/M0nk3yFarm/config"
	"github.com/MrLucio/M0nk3yFarm/database"
	"github.com/MrLucio/M0nk3yFarm/structs"
	"github.com/MrLucio/M0nk3yFarm/structs/semaphore"
	stack "github.com/MrLucio/M0nk3yFarm/structs/stack"
)

type athena struct {
	mu    *sync.Mutex
	sem   *semaphore.Semaphore
	stack *stack.SyncStack[structs.Flag]
}

var Athena *athena = nil

func New(
	mu *sync.Mutex,
	sem *semaphore.Semaphore,
	stack *stack.SyncStack[structs.Flag],
) *athena {
	Athena = &athena{
		mu:    mu,
		sem:   sem,
		stack: stack,
	}
	return Athena
}

func (a *athena) Start() {
	for {
		a.sem.Acquire()

		flags := a.stack.PopMany(config.Config.FlagBulkLimit)
		err := submitFlags(flags)

		if err != nil {
			fmt.Println(err)
		}

		time.Sleep(time.Duration(config.Config.FlagSubmitInterval) * time.Second)
	}
}

func submitFlags(flags []structs.Flag) error {
	updatedFlags, err := config.Config.Protocol.SubmitFlags(config.Config.URL, flags)
	if err != nil {
		return err
	}

	parameters := make([]interface{}, len(updatedFlags)*2)

	for index, flag := range updatedFlags {
		parameters[index*2] = flag.Flag
		parameters[index*2+1] = flag.Status
	}

	database.Db.Exec(
		"WITH updated(flag, status) AS (VALUES "+database.CreateParameterString(
			len(updatedFlags),
			2,
		)+") UPDATE flags SET status = updated.status FROM updated WHERE flags.flag = updated.flag",
		parameters...,
	)

	return nil
}
