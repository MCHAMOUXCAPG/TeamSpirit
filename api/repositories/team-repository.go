package repositories

import (
	"github.com/callicoder/packer/config"
	"github.com/callicoder/packer/entities"
)

type TeamRepository interface {
	GetTeams() ([]*entities.Team, error)
	GetTeam(teamName string) (*entities.Team, error)
	CreateTeam(team *entities.Team) (*entities.Team, error)
	UpdateTeam(teamName string, team *entities.Team) (*entities.Team, error)
	DeleteTeam(teameName string) (*entities.Team, error)
}

type TeamRepo struct{}

func NewTeamRepository() TeamRepository {
	return &TeamRepo{}
}

func (*TeamRepo) GetTeams() ([]*entities.Team, error) {

	config.AutoMigrate()
	var teams []*entities.Team
	config.DB.Preload("Surveys.Notes").Preload("Users").Find(&teams)

	return teams, nil
}

func (*TeamRepo) GetTeam(teamName string) (*entities.Team, error) {

	config.AutoMigrate()
	var team = &entities.Team{}
	config.DB.Where("name = ? ", teamName).Preload("Surveys.Notes").Preload("Users").Find(&team)

	return team, nil
}

func (*TeamRepo) CreateTeam(team *entities.Team) (*entities.Team, error) {

	config.AutoMigrate()
	config.DB.Create(&team)
	return team, nil
}

func (*TeamRepo) UpdateTeam(teamName string, team *entities.Team) (*entities.Team, error) {

	config.AutoMigrate()
	var teamToUpdate = &entities.Team{}
	config.DB.Model(&teamToUpdate).Where("name = ? ", teamName).Updates(&team)

	return team, nil
}

func (*TeamRepo) DeleteTeam(teamName string) (*entities.Team, error) {

	config.AutoMigrate()
	var team = &entities.Team{}
	config.DB.Where("name = ? ", teamName).Delete(&team)

	return team, nil
}
