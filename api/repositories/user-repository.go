package repositories

import (
	"github.com/callicoder/packer/entities"
	"github.com/jinzhu/gorm"
)

type UserRepository interface {
	GetUsers() ([]*entities.User, error)
	GetUser(userID int) (*entities.User, error)
	CreateUser(user *entities.User) (*entities.User, error)
	UpdateUser(userID int, user *entities.User) (*entities.User, error)
	DeleteUser(userID int) (*entities.User, error)
}

type UserRepo struct{}

func NewUserRepository() UserRepository {
	return &UserRepo{}
}

func (*UserRepo) GetUsers() ([]*entities.User, error) {

	DB, ERR := gorm.Open("sqlite3", "./database.db")

	if ERR != nil {
		panic("failed to connect database")
	}

	defer DB.Close()

	DB.AutoMigrate(&entities.Survey{}, &entities.Note{}, &entities.User{}, &entities.Role{}, &entities.Team{})

	var users []*entities.User
	DB.Preload("Roles").Preload("Teams").Find(&users)

	return users, nil
}

func (*UserRepo) GetUser(userID int) (*entities.User, error) {

	DB, ERR := gorm.Open("sqlite3", "./database.db")

	if ERR != nil {
		panic("failed to connect database")
	}

	defer DB.Close()

	DB.AutoMigrate(&entities.Survey{}, &entities.Note{}, &entities.User{}, &entities.Role{}, &entities.Team{})

	var user = &entities.User{}
	DB.Where("id = ? ", userID).Preload("Roles").Preload("Teams").Find(&user)

	return user, nil
}

func (*UserRepo) CreateUser(user *entities.User) (*entities.User, error) {

	DB, ERR := gorm.Open("sqlite3", "./database.db")

	if ERR != nil {
		panic("failed to connect database")
	}

	defer DB.Close()

	DB.AutoMigrate(&entities.Survey{}, &entities.Note{}, &entities.User{}, &entities.Role{}, &entities.Team{})

	DB.Create(&user)
	return user, nil
}

func (*UserRepo) UpdateUser(userID int, user *entities.User) (*entities.User, error) {

	DB, ERR := gorm.Open("sqlite3", "./database.db")

	if ERR != nil {
		panic("failed to connect database")
	}

	defer DB.Close()

	DB.AutoMigrate(&entities.Survey{}, &entities.Note{}, &entities.User{}, &entities.Role{}, &entities.Team{})

	var userToUpdate = &entities.User{}
	DB.Model(&userToUpdate).Where("id = ? ", userID).Updates(&user)

	return user, nil
}

func (*UserRepo) DeleteUser(userID int) (*entities.User, error) {

	DB, ERR := gorm.Open("sqlite3", "./database.db")

	if ERR != nil {
		panic("failed to connect database")
	}

	defer DB.Close()

	DB.AutoMigrate(&entities.Survey{}, &entities.Note{}, &entities.User{}, &entities.Role{}, &entities.Team{})

	var user = &entities.User{}
	DB.Where("id = ? ", userID).Delete(&user)

	return user, nil
}
