package config

import (
	"capgemini.com/gorn/team-spirit/entities"
	"github.com/jinzhu/gorm"
)

var DB *gorm.DB
var ERR error

func GetConnection() {

	DB, ERR = gorm.Open("sqlite3", "./database.db")

	if ERR != nil {
		panic("failed to connect database")
	}

	DB.Exec("PRAGMA foreign_keys = ON;")

	DB.AutoMigrate(&entities.Survey{}, &entities.Note{}, &entities.User{}, &entities.Role{}, &entities.Team{})
	DB.LogMode(true)
}
