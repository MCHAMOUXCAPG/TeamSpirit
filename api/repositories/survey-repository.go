package repositories

import (
	"time"

	"capgemini.com/gorn/team-spirit/config"
	"capgemini.com/gorn/team-spirit/dto"
	"capgemini.com/gorn/team-spirit/entities"
)

type SurveyRepository interface {
	GetSurveys(teamName string) ([]*entities.Survey, error)
	GetSurvies() ([]*entities.Survey, error)
	GetSurviesByPeriodAndTeamName(startDate string, endDate string, teamName string) ([]*entities.Survey, error)
	GetSurvey(surveyCode string) (*entities.Survey, error)
	CreateSurvey(survey *entities.Survey) (*entities.Survey, error)
	UpdateSurvey(surveyCode string, survey *entities.Survey) (*entities.Survey, error)
	DeleteSurvey(SurveyCode string) (*entities.Survey, error)
	ResetSurvey(SurveyCode string, note *entities.Note) (*entities.Note, error)
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

func (*SurveyRepo) GetSurveys(teamName string) ([]*entities.Survey, error) {

	var surveys []*entities.Survey
	result := config.DB.Preload("Notes").Where("team_name = ?", teamName).Order("start_date DESC").Find(&surveys)

	return surveys, result.Error
}

func (*SurveyRepo) GetSurvies() ([]*entities.Survey, error) {

	var survies []*entities.Survey
	result := config.DB.Preload("Notes").Find(&survies)

	return survies, result.Error
}

func (*SurveyRepo) GetSurviesByPeriodAndTeamName(startDate string, endDate string, teamName string) ([]*entities.Survey, error) {
	layoutISO := "2006-01-02"
	startD, _ := time.Parse(layoutISO, startDate)
	endD, _ := time.Parse(layoutISO, endDate)
	endD = endD.AddDate(0, 0, 1)
	var survies []*entities.Survey
	result := config.DB.Where("start_date >= ? AND start_date < ? AND team_name = ?", startD, endD, teamName).Or("end_date >= ? AND end_date < ? AND team_name = ?", startD, endD, teamName).Preload("Notes").Find(&survies)

	return survies, result.Error
}

func (*SurveyRepo) GetSurvey(surveyCode string) (*entities.Survey, error) {

	var survey = &entities.Survey{}
	result := config.DB.Where("code = ? ", surveyCode).Preload("Notes").Find(&survey)

	return survey, result.Error
}

func (*SurveyRepo) CreateSurvey(survey *entities.Survey) (*entities.Survey, error) {

	result := config.DB.Create(&survey)

	return survey, result.Error
}

func (*SurveyRepo) UpdateSurvey(surveyCode string, survey *entities.Survey) (*entities.Survey, error) {

	var surveyToUpdate = &entities.Survey{}
	result := config.DB.Model(&surveyToUpdate).Where("code = ? ", surveyCode).Updates(&survey)

	return survey, result.Error
}

func (*SurveyRepo) DeleteSurvey(surveyCode string) (*entities.Survey, error) {

	var survey = &entities.Survey{}
	result := config.DB.Where("code = ? ", surveyCode).Delete(&survey)

	return survey, result.Error
}

func (*SurveyRepo) ResetSurvey(surveyCode string, note *entities.Note) (*entities.Note, error) {

	var notes = &entities.Note{}
	result := config.DB.Model(&notes).Where("survey_code = ? ", surveyCode).Delete(&note)

	return note, result.Error
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
	result := config.DB.Where("end_date = ? AND team_name = ?", config.DB.Table("surveys").Select("max(end_date)").Where("team_name = ?", teamName).SubQuery(), teamName).Preload("Notes").Find(&survey)
	return survey, result.Error
}

func (*SurveyRepo) GetNotesGroupByUsers(surveyCode string) ([]*dto.ResultByUsers, error) {

	rows, err := config.DB.Table("notes").Where("survey_code = ?", surveyCode).Select("public.notes.user,avg(note) as average").Group("public.notes.user").Rows()

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
	return result, err
}

func (*SurveyRepo) GetNotesBySurveyAndUser(surveyCode string, user string) ([]*entities.Note, error) {
	var notes []*entities.Note
	result := config.DB.Select("number, note, survey_code").Where("survey_code = ? and public.notes.user = ?", surveyCode, user).Find(&notes)
	return notes, result.Error
}

func (*SurveyRepo) GetNotesGroupByQuestions(surveyCode string) ([]*dto.ResultByQuestions, error) {
	// var notes []*entities.Note
	rows, err := config.DB.Table("notes").Where("survey_code = ?", surveyCode).Select("public.notes.number as number ,avg(note) as average").Group("number").Order("public.notes.number").Rows()

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
	return result, err
}

func (*SurveyRepo) GetNotesBySurveyAndQuestion(number int, surveyCode string) ([]*entities.Note, error) {
	var notes []*entities.Note
	result := config.DB.Select("public.notes.user, note").Where("number = ? and survey_code = ?", number, surveyCode).Find(&notes)
	return notes, result.Error
}
