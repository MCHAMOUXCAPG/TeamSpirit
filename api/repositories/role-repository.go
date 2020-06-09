package repositories

import (
	"github.com/callicoder/packer/entities"
	"github.com/jinzhu/gorm"
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
	DB, ERR := gorm.Open("sqlite3", "./database.db")

	if ERR != nil {
		panic("failed to connect database")
	}

	defer DB.Close()

	DB.AutoMigrate(&entities.Survey{}, &entities.Note{}, &entities.User{}, &entities.Role{}, &entities.Team{})

	var roles []*entities.Role
	DB.Find(&roles)

	return roles, nil
}

func (*RoleRepo) GetRole(roleID int) (*entities.Role, error) {

	DB, ERR := gorm.Open("sqlite3", "./database.db")

	if ERR != nil {
		panic("failed to connect database")
	}

	defer DB.Close()

	DB.AutoMigrate(&entities.Survey{}, &entities.Note{}, &entities.User{}, &entities.Role{}, &entities.Team{})

	var role = &entities.Role{}
	DB.Where("id = ? ", roleID).Find(&role)

	return role, nil
}

func (*RoleRepo) CreateRole(role *entities.Role) (*entities.Role, error) {

	DB, ERR := gorm.Open("sqlite3", "./database.db")

	if ERR != nil {
		panic("failed to connect database")
	}

	defer DB.Close()

	DB.AutoMigrate(&entities.Survey{}, &entities.Note{}, &entities.User{}, &entities.Role{}, &entities.Team{})

	DB.Create(&role)
	return role, nil
}

func (*RoleRepo) UpdateRole(roleID int, role *entities.Role) (*entities.Role, error) {

	DB, ERR := gorm.Open("sqlite3", "./database.db")

	if ERR != nil {
		panic("failed to connect database")
	}

	defer DB.Close()

	DB.AutoMigrate(&entities.Survey{}, &entities.Note{}, &entities.User{}, &entities.Role{}, &entities.Team{})

	var roleToUpdate = &entities.Role{}
	DB.Model(&roleToUpdate).Where("id = ? ", roleID).Updates(&role)

	return role, nil
}

func (*RoleRepo) DeleteRole(roleID int) (*entities.Role, error) {

	DB, ERR := gorm.Open("sqlite3", "./database.db")

	if ERR != nil {
		panic("failed to connect database")
	}

	defer DB.Close()

	DB.AutoMigrate(&entities.Survey{}, &entities.Note{}, &entities.User{}, &entities.Role{}, &entities.Team{})

	var role = &entities.Role{}
	DB.Where("id = ? ", roleID).Delete(&role)

	return role, nil
}
