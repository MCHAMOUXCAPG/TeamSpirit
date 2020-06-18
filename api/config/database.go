package config

import (
	"github.com/callicoder/packer/entities"
	"github.com/jinzhu/gorm"
)

var DB *gorm.DB
var ERR error

func GetConnection() {

	DB, ERR = gorm.Open("sqlite3", "./database.db")

	if ERR != nil {
		panic("failed to connect database")
	}

	DB.AutoMigrate(&entities.Survey{}, &entities.Note{}, &entities.User{}, &entities.Role{}, &entities.Team{})
}
