package repositories

import (
	"github.com/callicoder/packer/entities"
	"github.com/jinzhu/gorm"
)

type AuthRepository interface {
	GetUserByEmail(email string) (*entities.User, error)
}

type AuthRepo struct{}

func NewAuthRepository() AuthRepository {
	return &AuthRepo{}
}

func (*AuthRepo) GetUserByEmail(email string) (*entities.User, error) {

	DB, ERR := gorm.Open("sqlite3", "./database.db")

	if ERR != nil {
		panic("failed to connect database")
	}

	defer DB.Close()

	DB.AutoMigrate(&entities.Survey{}, &entities.Note{}, &entities.User{}, &entities.Role{}, &entities.Team{})

	var foundUser = &entities.User{}
	DB.Where("email = ?", email).Preload("Roles").Preload("Teams").Find(&foundUser)

	return foundUser, nil
}
