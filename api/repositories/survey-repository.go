package repositories

import (
	"github.com/callicoder/packer/config"
	"github.com/callicoder/packer/entities"
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

	config.AutoMigrate()
	var survies []*entities.Survey
	config.DB.Preload("Notes").Find(&survies)

	return survies, nil
}

func (*SurveyRepo) GetSurvey(surveyCode string) (*entities.Survey, error) {

	config.AutoMigrate()
	var survey = &entities.Survey{}
	config.DB.Where("code = ? ", surveyCode).Preload("Notes").Find(&survey)

	return survey, nil
}

func (*SurveyRepo) CreateSurvey(survey *entities.Survey) (*entities.Survey, error) {

	config.AutoMigrate()
	config.DB.Create(&survey)

	return survey, nil
}

func (*SurveyRepo) UpdateSurvey(surveyCode string, survey *entities.Survey) (*entities.Survey, error) {

	config.AutoMigrate()
	var surveyToUpdate = &entities.Survey{}
	config.DB.Model(&surveyToUpdate).Where("code = ? ", surveyCode).Updates(&survey)

	return survey, nil
}

func (*SurveyRepo) DeleteSurvey(surveyCode string) (*entities.Survey, error) {

	config.AutoMigrate()
	var survey = &entities.Survey{}
	config.DB.Where("code = ? ", surveyCode).Delete(&survey)

	return survey, nil
}

func (*SurveyRepo) GetResultSurvey(surveyCode string) (float64, error) {

	config.AutoMigrate()

	var result float64
	row := config.DB.Table("notes").Where("survey_code = ?", surveyCode).Select("avg(note)").Row()
	row.Scan(&result)

	return result, nil
}
