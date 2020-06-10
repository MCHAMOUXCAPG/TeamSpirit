package repositories

import (
	"github.com/callicoder/packer/config"
	"github.com/callicoder/packer/entities"
)

type AuthRepository interface {
	GetUserByEmail(email string) (*entities.User, error)
}

type AuthRepo struct{}

func NewAuthRepository() AuthRepository {
	return &AuthRepo{}
}

func (*AuthRepo) GetUserByEmail(email string) (*entities.User, error) {

	config.AutoMigrate()
	var foundUser = &entities.User{}
	config.DB.Where("email = ?", email).Preload("Roles").Preload("Teams").Find(&foundUser)

	return foundUser, nil
}
