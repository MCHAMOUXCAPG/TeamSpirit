package repositories

import (
	"strconv"

	"campgemini.com/gorn/team-spirit/config"
	"campgemini.com/gorn/team-spirit/dto"
	"campgemini.com/gorn/team-spirit/entities"
)

type SurveyRepository interface {
	GetSurvies() ([]*entities.Survey, error)
	GetSurvey(surveyCode string) (*entities.Survey, error)
	CreateSurvey(survey *entities.Survey) (*entities.Survey, error)
	UpdateSurvey(surveyCode string, survey *entities.Survey) (*entities.Survey, error)
	DeleteSurvey(SurveyCode string) (*entities.Survey, error)
	GetResultSurvey(surveyCode string) (float64, error)
	GetHistoricResult(teamName string) (float64, error)
	GetSurveysGroupByUsers(teamName string) ([]*dto.ResultByUsers, error)
}

type SurveyRepo struct{}

func NewSurveyRepository() SurveyRepository {
	return &SurveyRepo{}
}

func (*SurveyRepo) GetSurvies() ([]*entities.Survey, error) {

	var survies []*entities.Survey
	config.DB.Preload("Notes").Find(&survies)

	return survies, nil
}

func (*SurveyRepo) GetSurvey(surveyCode string) (*entities.Survey, error) {

	var survey = &entities.Survey{}
	config.DB.Where("code = ? ", surveyCode).Preload("Notes").Find(&survey)

	return survey, nil
}

func (*SurveyRepo) CreateSurvey(survey *entities.Survey) (*entities.Survey, error) {

	config.DB.Create(&survey)

	return survey, nil
}

func (*SurveyRepo) UpdateSurvey(surveyCode string, survey *entities.Survey) (*entities.Survey, error) {

	var surveyToUpdate = &entities.Survey{}
	config.DB.Model(&surveyToUpdate).Where("code = ? ", surveyCode).Updates(&survey)

	return survey, nil
}

func (*SurveyRepo) DeleteSurvey(surveyCode string) (*entities.Survey, error) {

	var survey = &entities.Survey{}
	config.DB.Where("code = ? ", surveyCode).Delete(&survey)

	return survey, nil
}

func (*SurveyRepo) GetResultSurvey(surveyCode string) (float64, error) {

	var result float64
	row := config.DB.Table("notes").Where("survey_code = ?", surveyCode).Select("avg(note)").Row()
	row.Scan(&result)

	return result, nil
}

func (*SurveyRepo) GetHistoricResult(teamName string) (float64, error) {

	var result float64
	row := config.DB.Table("notes").Where("survey_code LIKE ?", "%"+teamName+"%").Select("avg(note)").Row()
	row.Scan(&result)

	return result, nil
}

func (*SurveyRepo) GetSurveysGroupByUsers(teamName string) ([]*dto.ResultByUsers, error) {

	var maxDate string
	row := config.DB.Table("surveys").Where("code LIKE ?", "%"+teamName+"%").Select("max(end_date)").Row()
	row.Scan(&maxDate)

	var survey = &entities.Survey{}
	config.DB.Where("end_date = ? ", maxDate).Preload("Notes").Find(&survey)

	rows, _ := config.DB.Table("notes").Where("survey_code = ?", survey.Code).Select("user as user ,avg(note) as average").Group("user").Rows()

	var response = &dto.ResultByUsers{}
	var result []*dto.ResultByUsers
	var index = 1
	for rows.Next() {
		rows.Scan(&response.User, &response.Average)
		var notes []*entities.Note
		config.DB.Select("number, note, survey_code").Where("survey_code = ? and user = ?", survey.Code, response.User).Find(&notes)
		result = append(result, &dto.ResultByUsers{
			User:    "User " + strconv.Itoa(index),
			Average: response.Average,
			Notes:   notes,
		})
		index++
	}
	return result, nil
}
