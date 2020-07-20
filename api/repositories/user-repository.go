package repositories

import (
	"capgemini.com/gorn/team-spirit/config"
	"capgemini.com/gorn/team-spirit/dto"
	"capgemini.com/gorn/team-spirit/entities"
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

	var users []*entities.User
	result := config.DB.Preload("Role").Preload("Teams").Find(&users)

	return users, result.Error
}

func (*UserRepo) GetUser(userID int) (*entities.User, error) {

	var user = &entities.User{}
	result := config.DB.Where("id = ? ", userID).Preload("Role").Preload("Teams").Find(&user)

	return user, result.Error
}

func (*UserRepo) CreateUser(user *entities.User) (*entities.User, error) {

	result := config.DB.Create(&user)
	return user, result.Error
}

func (*UserRepo) UpdateUser(userID int, user *entities.User) (*entities.User, error) {

	err := updateUserTransaction(config.DB, userID, user)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (*UserRepo) DeleteUser(userID int) (*entities.User, error) {

	var user = &entities.User{}
	err := deleteUserTransaction(config.DB, userID)

	if err != nil {
		return nil, err
	}

	return user, nil
}

func updateUserTransaction(db *gorm.DB, userID int, user *entities.User) error {
	var userToUpdate = &entities.User{}
	var teamUser []dto.TeamUser
	return db.Transaction(func(tx *gorm.DB) error {
		if err := tx.Model(&userToUpdate).Where("id = ? ", userID).Updates(&user).Error; err != nil {
			return err
		}

		if user.Role.Id == 0 {
			if err := tx.Model(&userToUpdate).Where("id = ?", userID).Update("role_id", 0).Error; err != nil {
				return err
			}
		}

		if err := tx.Table("team_users").Where("user_id = ?", userID).Delete(&teamUser).Error; err != nil {
			return err
		}

		for _, team := range user.Teams {
			if err := tx.Exec("INSERT INTO team_users (user_id, team_name) VALUES (?, ?)", userID, team.Name).Error; err != nil {
				return err
			}
		}
		return nil
	})
}

func deleteUserTransaction(db *gorm.DB, userID int) error {
	var user = &entities.User{}
	var teamUser []dto.TeamUser

	return db.Transaction(func(tx *gorm.DB) error {
		if err := tx.Where("id = ? ", userID).Delete(&user).Error; err != nil {
			return err
		}

		if err := tx.Table("team_users").Where("user_id = ?", userID).Delete(&teamUser).Error; err != nil {
			return err
		}
		return nil
	})
}
