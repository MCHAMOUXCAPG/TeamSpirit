package repositories

import (
	"github.com/callicoder/packer/config"
	"github.com/callicoder/packer/entities"
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

	var users []*entities.User
	config.DB.Preload("Roles").Preload("Teams").Find(&users)

	return users, nil
}

func (*UserRepo) GetUser(userID int) (*entities.User, error) {

	var user = &entities.User{}
	config.DB.Where("id = ? ", userID).Preload("Roles").Preload("Teams").Find(&user)

	return user, nil
}

func (*UserRepo) CreateUser(user *entities.User) (*entities.User, error) {

	config.DB.Create(&user)
	return user, nil
}

func (*UserRepo) UpdateUser(userID int, user *entities.User) (*entities.User, error) {

	var userToUpdate = &entities.User{}
	config.DB.Model(&userToUpdate).Where("id = ? ", userID).Updates(&user)

	return user, nil
}

func (*UserRepo) DeleteUser(userID int) (*entities.User, error) {

	var user = &entities.User{}
	config.DB.Where("id = ? ", userID).Delete(&user)

	return user, nil
}
