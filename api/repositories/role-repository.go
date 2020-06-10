package repositories

import (
	"github.com/callicoder/packer/config"
	"github.com/callicoder/packer/entities"
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

	config.AutoMigrate()
	var roles []*entities.Role
	config.DB.Find(&roles)

	return roles, nil
}

func (*RoleRepo) GetRole(roleID int) (*entities.Role, error) {

	config.AutoMigrate()
	var role = &entities.Role{}
	config.DB.Where("id = ? ", roleID).Find(&role)

	return role, nil
}

func (*RoleRepo) CreateRole(role *entities.Role) (*entities.Role, error) {

	config.AutoMigrate()
	config.DB.Create(&role)

	return role, nil
}

func (*RoleRepo) UpdateRole(roleID int, role *entities.Role) (*entities.Role, error) {

	config.AutoMigrate()
	var roleToUpdate = &entities.Role{}
	config.DB.Model(&roleToUpdate).Where("id = ? ", roleID).Updates(&role)

	return role, nil
}

func (*RoleRepo) DeleteRole(roleID int) (*entities.Role, error) {

	config.AutoMigrate()
	var role = &entities.Role{}
	config.DB.Where("id = ? ", roleID).Delete(&role)

	return role, nil
}
