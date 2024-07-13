package database

import (
	"database/sql"
	"math/rand"

	_ "github.com/mattn/go-sqlite3" // Import go-sqlite3 library
)

var Db *sql.DB = nil

func Start() error {
	var err error
	Db, err = sql.Open("sqlite3", "db.db")

	if err != nil {
		return err
	}

	_, err = Db.Exec("CREATE TABLE IF NOT EXISTS flags (flag TEXT NOT NULL PRIMARY KEY, sploit TEXT, team TEXT DEFAULT \"\", time INTEGER DEFAULT 0, status TEXT DEFAULT \"store1\")")
	if err != nil {
		return err
	}

	// Insert dummy flags
	insertFlags()

	return nil
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
	stmt, err := tx.Prepare("INSERT INTO flags (flag, sploit) VALUES (?, ?)")
	if err != nil {
		return err
	}
	defer stmt.Close()

	// Loop to execute the insert statement 100,000 times
	for i := 0; i < 100; i++ {
		flagValue := randString(100) // Generate a random string of length 10
		_, err := stmt.Exec(flagValue, randString(100))
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
