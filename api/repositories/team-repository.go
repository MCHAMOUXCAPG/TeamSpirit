package repositories

import (
	"capgemini.com/gorn/team-spirit/config"
	"capgemini.com/gorn/team-spirit/dto"
	"capgemini.com/gorn/team-spirit/entities"
	"github.com/jinzhu/gorm"
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

	err := updateTeamTransaction(config.DB, teamName, team)

	if err != nil {
		return nil, err
	}

	return team, nil
}

func (*TeamRepo) DeleteTeam(teamName string) (*entities.Team, error) {

	var team = &entities.Team{}

	err := deleteTeamTransaction(config.DB, teamName)

	if err != nil {
		return nil, err
	}

	return team, nil
}

func updateTeamTransaction(db *gorm.DB, teamName string, team *entities.Team) error {
	var teamToUpdate = &entities.User{}
	var teamUser []dto.TeamUser

	return db.Transaction(func(tx *gorm.DB) error {
		if err := tx.Model(&teamToUpdate).Where("name = ? ", teamName).Updates(&team).Error; err != nil {
			return err
		}

		if err := tx.Table("team_users").Where("team_name = ?", teamName).Delete(&teamUser).Error; err != nil {
			return err
		}

		for _, user := range team.Users {
			if err := tx.Exec("INSERT INTO team_users (user_id, team_name) VALUES (?, ?)", user.Id, teamName).Error; err != nil {
				return err
			}
		}
		return nil
	})
}

func deleteTeamTransaction(db *gorm.DB, teamName string) error {
	var team = &entities.Team{}
	var teamUser []dto.TeamUser

	return db.Transaction(func(tx *gorm.DB) error {
		if err := tx.Where("name = ? ", teamName).Delete(&team).Error; err != nil {
			return err
		}

		if err := tx.Table("team_users").Where("team_name = ?", teamName).Delete(&teamUser).Error; err != nil {
			return err
		}
		return nil
	})
}
