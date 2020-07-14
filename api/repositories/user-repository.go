package repositories

import (
	"capgemini.com/gorn/team-spirit/config"
	"capgemini.com/gorn/team-spirit/dto"
	"capgemini.com/gorn/team-spirit/entities"
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
	result := config.DB.Preload("Roles").Preload("Teams").Find(&users)

	return users, result.Error
}

func (*UserRepo) GetUser(userID int) (*entities.User, error) {

	var user = &entities.User{}
	result := config.DB.Where("id = ? ", userID).Preload("Roles").Preload("Teams").Find(&user)

	return user, result.Error
}

func (*UserRepo) CreateUser(user *entities.User) (*entities.User, error) {

	result := config.DB.Create(&user)
	return user, result.Error
}

func (*UserRepo) UpdateUser(userID int, user *entities.User) (*entities.User, error) {

	var userToUpdate = &entities.User{}
	result := config.DB.Model(&userToUpdate).Where("id = ? ", userID).Updates(&user)

	return user, result.Error
}

func (*UserRepo) DeleteUser(userID int) (*entities.User, error) {

	var user = &entities.User{}
	var teamUser []dto.TeamUser

	result := config.DB.Where("id = ? ", userID).Delete(&user)

	if result.Error == nil {
		config.DB.Table("teams_users").Where("user_id = ?", userID).Delete(&teamUser)
	}

	return user, result.Error
}
