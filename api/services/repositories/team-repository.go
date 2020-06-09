package repositories

import (
	"github.com/callicoder/packer/entities"
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
	DB, ERR := gorm.Open("sqlite3", "./database.db")

	if ERR != nil {
		panic("failed to connect database")
	}

	defer DB.Close()

	DB.AutoMigrate(&entities.Survey{}, &entities.Note{}, &entities.Team{})

	var teams []*entities.Team
	DB.Preload("Surveys.Notes").Find(&teams)

	return teams, nil
}

func (*TeamRepo) GetTeam(teamName string) (*entities.Team, error) {
	DB, ERR := gorm.Open("sqlite3", "./database.db")

	if ERR != nil {
		panic("failed to connect database")
	}

	defer DB.Close()

	DB.AutoMigrate(&entities.Survey{}, &entities.Note{}, &entities.Team{})
	var team = &entities.Team{}
	DB.Where("name = ? ", teamName).Preload("Surveys.Notes").Find(&team)

	return team, nil
}

func (*TeamRepo) CreateTeam(team *entities.Team) (*entities.Team, error) {
	DB, ERR := gorm.Open("sqlite3", "./database.db")

	if ERR != nil {
		panic("failed to connect database")
	}

	defer DB.Close()

	DB.AutoMigrate(&entities.Survey{}, &entities.Note{}, &entities.Team{})

	DB.Create(&team)
	return team, nil
}

func (*TeamRepo) UpdateTeam(teamName string, team *entities.Team) (*entities.Team, error) {

	DB, ERR := gorm.Open("sqlite3", "./database.db")

	if ERR != nil {
		panic("failed to connect database")
	}

	defer DB.Close()

	DB.AutoMigrate(&entities.Survey{}, &entities.Note{}, &entities.Team{})

	var teamToUpdate = &entities.Team{}
	DB.Model(&teamToUpdate).Where("name = ? ", teamName).Updates(&team)

	return team, nil
}

func (*TeamRepo) DeleteTeam(teamName string) (*entities.Team, error) {

	DB, ERR := gorm.Open("sqlite3", "./database.db")

	if ERR != nil {
		panic("failed to connect database")
	}

	defer DB.Close()

	DB.AutoMigrate(&entities.Survey{}, &entities.Note{}, &entities.Team{})

	var team = &entities.Team{}
	DB.Where("name = ? ", teamName).Delete(&team)

	return team, nil
}
