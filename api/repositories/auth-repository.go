package repositories

import (
	"capgemini.com/gorn/team-spirit/config"
	"capgemini.com/gorn/team-spirit/entities"
)

type AuthRepository interface {
	GetUserByEmail(email string) (*entities.User, error)
}

type AuthRepo struct{}

func NewAuthRepository() AuthRepository {
	return &AuthRepo{}
}

func (*AuthRepo) GetUserByEmail(email string) (*entities.User, error) {

	var foundUser = &entities.User{}
	result := config.DB.Where("email = ?", email).Preload("Role").Preload("Teams").Find(&foundUser)
	return foundUser, result.Error
}
