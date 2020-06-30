package repositories

import (
	"capgemini.com/gorn/team-spirit/config"
	"capgemini.com/gorn/team-spirit/dto"
	"capgemini.com/gorn/team-spirit/entities"
)

type SurveyRepository interface {
	GetSurvies() ([]*entities.Survey, error)
	GetSurvey(surveyCode string) (*entities.Survey, error)
	CreateSurvey(survey *entities.Survey) (*entities.Survey, error)
	UpdateSurvey(surveyCode string, survey *entities.Survey) (*entities.Survey, error)
	DeleteSurvey(SurveyCode string) (*entities.Survey, error)
	GetResultSurvey(surveyCode string) (float64, error)
	GetHistoricResult(teamName string) (float64, error)
	GetLastSurvey(teamName string) (*entities.Survey, error)
	GetNotesGroupByUsers(surveyCode string) ([]*dto.ResultByUsers, error)
	GetNotesBySurveyAndUser(surveyCode string, user string) ([]*entities.Note, error)
	GetNotesGroupByQuestions(surveyCode string) ([]*dto.ResultByQuestions, error)
	GetNotesBySurveyAndQuestion(number int, surveyCode string) ([]*entities.Note, error)
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

func (*SurveyRepo) GetLastSurvey(teamName string) (*entities.Survey, error) {
	var survey = &entities.Survey{}
	config.DB.Where("end_date = ? ", config.DB.Table("surveys").Where("code LIKE ?", "%"+teamName+"%").Select("max(end_date)").SubQuery()).Preload("Notes").Find(&survey)
	return survey, nil
}

func (*SurveyRepo) GetNotesGroupByUsers(surveyCode string) ([]*dto.ResultByUsers, error) {

	rows, _ := config.DB.Table("notes").Where("survey_code = ?", surveyCode).Select("user as user ,avg(note) as average").Group("user").Rows()

	var response = &dto.ResultByUsers{}
	var result []*dto.ResultByUsers
	for rows.Next() {
		rows.Scan(&response.User, &response.Average)
		result = append(result, &dto.ResultByUsers{
			User:    response.User,
			Average: response.Average,
			Notes:   nil,
		})
	}
	return result, nil
}

func (*SurveyRepo) GetNotesBySurveyAndUser(surveyCode string, user string) ([]*entities.Note, error) {
	var notes []*entities.Note
	config.DB.Select("number, note, survey_code").Where("survey_code = ? and user = ?", surveyCode, user).Find(&notes)
	return notes, nil
}

func (*SurveyRepo) GetNotesGroupByQuestions(surveyCode string) ([]*dto.ResultByQuestions, error) {
	// var notes []*entities.Note
	rows, _ := config.DB.Table("notes").Where("survey_code = ?", surveyCode).Select("number as number ,avg(note) as average").Group("number").Rows()

	var response = &dto.ResultByQuestions{}
	var result []*dto.ResultByQuestions
	for rows.Next() {
		rows.Scan(&response.QuestionNumber, &response.Average)
		result = append(result, &dto.ResultByQuestions{
			QuestionNumber: response.QuestionNumber,
			Average:        response.Average,
			Notes:          nil,
		})
	}
	return result, nil
}

func (*SurveyRepo) GetNotesBySurveyAndQuestion(number int, surveyCode string) ([]*entities.Note, error) {
	var notes []*entities.Note
	config.DB.Select("user, note").Where("number = ? and survey_code = ?", number, surveyCode).Find(&notes)
	return notes, nil
}
