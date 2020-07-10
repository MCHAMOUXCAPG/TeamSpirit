package repositories

import (
	"capgemini.com/gorn/team-spirit/config"
	"capgemini.com/gorn/team-spirit/entities"
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

	var teams []*entities.Team
	result := config.DB.Preload("Surveys.Notes").Preload("Users").Find(&teams)

	return teams, result.Error
}

func (*TeamRepo) GetTeam(teamName string) (*entities.Team, error) {

	var team = &entities.Team{}
	result := config.DB.Where("name = ? ", teamName).Preload("Surveys.Notes").Preload("Users").Find(&team)

	return team, result.Error
}

func (*TeamRepo) CreateTeam(team *entities.Team) (*entities.Team, error) {

	result := config.DB.Create(&team)
	return team, result.Error
}

func (*TeamRepo) UpdateTeam(teamName string, team *entities.Team) (*entities.Team, error) {

	var teamToUpdate = &entities.Team{}
	result := config.DB.Model(&teamToUpdate).Where("name = ? ", teamName).Updates(&team)

	return team, result.Error
}

func (*TeamRepo) DeleteTeam(teamName string) (*entities.Team, error) {

	var team = &entities.Team{}
	result := config.DB.Where("name = ? ", teamName).Delete(&team)

	return team, result.Error
}
