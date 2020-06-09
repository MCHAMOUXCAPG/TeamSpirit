package repositories

import (
	"github.com/callicoder/packer/entities"
	"github.com/jinzhu/gorm"
)

type SurveyRepository interface {
	GetSurvies() ([]*entities.Survey, error)
	GetSurvey(surveyCode string) (*entities.Survey, error)
	CreateSurvey(survey *entities.Survey) (*entities.Survey, error)
	UpdateSurvey(surveyCode string, survey *entities.Survey) (*entities.Survey, error)
	DeleteSurvey(SurveyCode string) (*entities.Survey, error)
	GetResultSurvey(surveyCode string) (float64, error)
}

type SurveyRepo struct{}

func NewSurveyRepository() SurveyRepository {
	return &SurveyRepo{}
}

func (*SurveyRepo) GetSurvies() ([]*entities.Survey, error) {
	DB, ERR := gorm.Open("sqlite3", "./database.db")

	if ERR != nil {
		panic("failed to connect database")
	}

	defer DB.Close()

	DB.AutoMigrate(&entities.Survey{}, &entities.Note{}, &entities.User{}, &entities.Role{}, &entities.Team{})

	var survies []*entities.Survey
	DB.Preload("Notes").Find(&survies)

	return survies, nil
}

func (*SurveyRepo) GetSurvey(surveyCode string) (*entities.Survey, error) {
	DB, ERR := gorm.Open("sqlite3", "./database.db")

	if ERR != nil {
		panic("failed to connect database")
	}

	defer DB.Close()

	DB.AutoMigrate(&entities.Survey{}, &entities.Note{}, &entities.User{}, &entities.Role{}, &entities.Team{})

	var survey = &entities.Survey{}
	DB.Where("code = ? ", surveyCode).Preload("Notes").Find(&survey)

	return survey, nil
}

func (*SurveyRepo) CreateSurvey(survey *entities.Survey) (*entities.Survey, error) {
	DB, ERR := gorm.Open("sqlite3", "./database.db")

	if ERR != nil {
		panic("failed to connect database")
	}

	defer DB.Close()

	DB.AutoMigrate(&entities.Survey{}, &entities.Note{}, &entities.User{}, &entities.Role{}, &entities.Team{})

	DB.Create(&survey)
	return survey, nil
}

func (*SurveyRepo) UpdateSurvey(surveyCode string, survey *entities.Survey) (*entities.Survey, error) {

	DB, ERR := gorm.Open("sqlite3", "./database.db")

	if ERR != nil {
		panic("failed to connect database")
	}

	defer DB.Close()

	DB.AutoMigrate(&entities.Survey{}, &entities.Note{}, &entities.User{}, &entities.Role{}, &entities.Team{})

	var surveyToUpdate = &entities.Survey{}
	DB.Model(&surveyToUpdate).Where("code = ? ", surveyCode).Updates(&survey)

	return survey, nil
}

func (*SurveyRepo) DeleteSurvey(surveyCode string) (*entities.Survey, error) {

	DB, ERR := gorm.Open("sqlite3", "./database.db")

	if ERR != nil {
		panic("failed to connect database")
	}

	defer DB.Close()

	DB.AutoMigrate(&entities.Survey{}, &entities.Note{}, &entities.User{}, &entities.Role{}, &entities.Team{})

	var survey = &entities.Survey{}
	DB.Where("code = ? ", surveyCode).Delete(&survey)

	return survey, nil
}

func (*SurveyRepo) GetResultSurvey(surveyCode string) (float64, error) {

	DB, ERR := gorm.Open("sqlite3", "./database.db")

	if ERR != nil {
		panic("failed to connect database")
	}

	defer DB.Close()

	DB.AutoMigrate(&entities.Survey{}, &entities.Note{}, &entities.User{}, &entities.Role{}, &entities.Team{})

	var result float64
	row := DB.Table("notes").Where("survey_code = ?", surveyCode).Select("avg(note)").Row()
	row.Scan(&result)

	return result, nil
}
