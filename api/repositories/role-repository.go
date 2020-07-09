package repositories

import (
	"capgemini.com/gorn/team-spirit/config"
	"capgemini.com/gorn/team-spirit/entities"
)

type RoleRepository interface {
	GetRoles() ([]*entities.Role, error)
	GetRole(roleID int) (*entities.Role, error)
	CreateRole(role *entities.Role) (*entities.Role, error)
	UpdateRole(roleID int, role *entities.Role) (*entities.Role, error)
	DeleteRole(roleID int) (*entities.Role, error)
}

type RoleRepo struct{}

func NewRoleRepository() RoleRepository {
	return &RoleRepo{}
}

func (*RoleRepo) GetRoles() ([]*entities.Role, error) {

	var roles []*entities.Role
	result := config.DB.Find(&roles)

	return roles, result.Error
}

func (*RoleRepo) GetRole(roleID int) (*entities.Role, error) {

	var role = &entities.Role{}
	result := config.DB.Where("id = ? ", roleID).Find(&role)

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
	result := config.DB.Where("id = ? ", roleID).Delete(&role)

	return role, result.Error
}
