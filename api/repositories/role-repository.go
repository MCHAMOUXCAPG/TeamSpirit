package repositories

import (
	"capgemini.com/gorn/team-spirit/config"
	"capgemini.com/gorn/team-spirit/entities"
	"github.com/jinzhu/gorm"
)

type RoleRepository interface {
	GetRoles() ([]*entities.Role, error)
	GetRole(roleID int) (*entities.Role, error)
	CreateRole(role *entities.Role) (*entities.Role, error)
	UpdateRole(roleID int, role *entities.Role) (*entities.Role, error)
	DeleteRole(roleID int) (*entities.Role, error)
	GetRoleByName(roleName string) (*entities.Role, error)
}

type RoleRepo struct{}

func NewRoleRepository() RoleRepository {
	return &RoleRepo{}
}

func (*RoleRepo) GetRoles() ([]*entities.Role, error) {

	var roles []*entities.Role
	result := config.DB.Where("id <> 3").Find(&roles)

	return roles, result.Error
}

func (*RoleRepo) GetRole(roleID int) (*entities.Role, error) {

	var role = &entities.Role{}
	result := config.DB.Where("id = ? ", roleID).Find(&role)

	return role, result.Error
}

func (*RoleRepo) GetRoleByName(roleName string) (*entities.Role, error) {

	var role = &entities.Role{}
	result := config.DB.Where("name = ? ", roleName).Find(&role)

	return role, result.Error
}

func (*RoleRepo) CreateRole(role *entities.Role) (*entities.Role, error) {

	result := config.DB.Create(&role)

	return role, result.Error
}

func (*RoleRepo) UpdateRole(roleID int, role *entities.Role) (*entities.Role, error) {

	var roleToUpdate = &entities.Role{}
	result := config.DB.Model(&roleToUpdate).Where("id = ? ", roleID).Updates(&role)

	return role, result.Error
}

func (*RoleRepo) DeleteRole(roleID int) (*entities.Role, error) {

	var role = &entities.Role{}
	err := deleteRoleTransaction(config.DB, roleID)

	if err != nil {
		return nil, err
	}

	return role, nil
}

func deleteRoleTransaction(db *gorm.DB, roleID int) error {
	var role = &entities.Role{}
	return db.Transaction(func(tx *gorm.DB) error {
		if err := tx.Where("id = ? ", roleID).Delete(&role).Error; err != nil {
			return err
		}

		if err := tx.Table("users").Where("role_id = ?", roleID).Update("role_id", 0).Error; err != nil {
			return err
		}
		return nil
	})
}
