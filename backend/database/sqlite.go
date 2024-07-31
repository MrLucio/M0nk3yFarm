package database

import (
	"database/sql"
	"fmt"
	"math/rand"
	"strings"
	"time"

	config "github.com/MrLucio/M0nk3yFarm/config/constants"
	"github.com/MrLucio/M0nk3yFarm/structs"
	_ "github.com/mattn/go-sqlite3"
)

var Db *sql.DB = nil

func Start() error {
	var err error
	Db, err = sql.Open("sqlite3", config.SQLPath)

	if err != nil {
		return err
	}

	_, err = Db.Exec(config.SQLCreateTable)
	if err != nil {
		return err
	}

	// Insert dummy flags
	// insertFlags()

	return nil
}

func CreateParameterString(couplesNumber int, valuesNumber int) string {
	couples := make([]string, couplesNumber)
	values := make([]string, valuesNumber)

	for i := 0; i < valuesNumber; i++ {
		values[i] = "?"
	}

	for i := 0; i < couplesNumber; i++ {
		couples[i] = "(" + strings.Join(values, ", ") + ")"
	}
	return strings.Join(couples, ", ")
}

func ComposeQuerySelector(filter structs.Filter, pagination structs.Pagination) string {
	stmts := []string{}

	for _, f := range filter {
		stmts = append(stmts, fmt.Sprintf("%s = %s", f.Field, f.Value))
	}

	if pagination.Page > 0 {
		stmts = append(
			stmts,
			fmt.Sprintf(
				"LIMIT %d OFFSET %d",
				pagination.Limit,
				(pagination.Page-1)*pagination.Limit,
			),
		)
	}

	return strings.Join(stmts, " AND ")
}

const letterBytes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

func randString(n int) string {
	b := make([]byte, n)
	for i := range b {
		b[i] = letterBytes[rand.Intn(len(letterBytes))]
	}
	return string(b)
}

func insertFlags() error {
	// Start a transaction
	tx, err := Db.Begin()
	if err != nil {
		return err
	}

	// Prepare the insert statement
	stmt, err := tx.Prepare(
		"INSERT INTO flags (flag, sploit, team, status, created_at) VALUES (?, ?, ?, ?, ?)",
	)
	if err != nil {
		return err
	}
	defer stmt.Close()

	// Loop to execute the insert statement 100,000 times
	for i := 0; i < 1000; i++ {
		_, err := stmt.Exec(
			randString(5),
			randString(5),
			rand.Intn(44),
			"initialized",
			time.Now().Format(time.DateTime),
		)
		if err != nil {
			return err
		}
	}

	// Commit the transaction
	err = tx.Commit()
	if err != nil {
		return err
	}

	return nil
}
