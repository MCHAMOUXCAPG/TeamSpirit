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
	UpdateSuperUser(team *entities.Team) error
}

type TeamRepo struct{}

func NewTeamRepository() TeamRepository {
	return &TeamRepo{}
}

func (*TeamRepo) GetTeams() ([]*entities.Team, error) {

	var teams []*entities.Team
	result := config.DB.Preload("Surveys.Notes").Preload("Users", "role_id <> 3").Find(&teams)

	return teams, result.Error
}

func (*TeamRepo) GetTeam(teamName string) (*entities.Team, error) {

	var team = &entities.Team{}
	result := config.DB.Where("name = ? ", teamName).Preload("Users", "role_id <> 3").Preload("Surveys.Notes").Preload("Users.Role").Preload("Users.Teams").Find(&team)

	return team, result.Error
}

func (*TeamRepo) CreateTeam(team *entities.Team) (*entities.Team, error) {

	result := config.DB.Create(&team)
	return team, result.Error
}

func (*TeamRepo) UpdateSuperUser(team *entities.Team) error {
	var teamUser []dto.TeamUser
	// var users = &entities.User{}
	var user []*entities.User
	config.DB.Where("role_id = 3 ").Preload("Role").Preload("Teams").Find(&user)
	for _, userAPI := range user {
		superAdminId := userAPI.Id

		result := config.DB.Table("team_users").Where("user_id = ? AND team_name = ?", superAdminId, team.Name).Find(&teamUser)
		if result.RowsAffected == 0 {
			config.DB.Exec("INSERT INTO team_users (user_id, team_name) VALUES (?,?)", superAdminId, team.Name)
		}
		// return result.Error
	}
	return nil
}

func (*TeamRepo) UpdateTeam(teamName string, team *entities.Team) (*entities.Team, error) {

	var teamToUpdate = &entities.Team{}
	result := config.DB.Model(&teamToUpdate).Where("name = ? ", teamName).Updates(&team)
	return team, result.Error

}

func (*TeamRepo) DeleteTeam(teamName string) (*entities.Team, error) {

	var team = &entities.Team{}

	err := deleteTeamTransaction(config.DB, teamName)

	if err != nil {
		return nil, err
	}

	return team, nil
}

func deleteTeamTransaction(db *gorm.DB, teamName string) error {
	var team = &entities.Team{}
	var teamUser []dto.TeamUser
	var userPWBRD []*entities.User
	var NotAvailableIds []int

	return db.Transaction(func(tx *gorm.DB) error {
		if err := tx.Where("name = ? ", teamName).Delete(&team).Error; err != nil {
			return err
		}
		config.DB.Where("role_id = 3 ").Preload("Role").Preload("Teams").Find(&userPWBRD)
		for _, userAPI := range userPWBRD {

			NotAvailableIds = append(NotAvailableIds, userAPI.Id)
		}

		if err := tx.Table("team_users").Where("team_name = ?", teamName).Not("user_id", NotAvailableIds).Delete(&teamUser).Error; err != nil {
			return err
		}
		return nil
	})
}
