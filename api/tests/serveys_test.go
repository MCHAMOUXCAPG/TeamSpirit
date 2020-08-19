package tests

import (
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"

	"capgemini.com/gorn/team-spirit/dto"
	"capgemini.com/gorn/team-spirit/entities"
	"capgemini.com/gorn/team-spirit/repositories"
	"capgemini.com/gorn/team-spirit/services"
	"github.com/labstack/echo/v4"
	"github.com/stretchr/testify/assert"
)

var (
	SurveyRepo repositories.SurveyRepository = repositories.NewSurveyRepository()
)

func TestGetSurvies(t *testing.T) {
	// Post 1 team in the mock database

	team1, _ := TeamRepo.CreateTeam(&entities.Team{Name: "team1", StartDate: time.Date(2016, time.August, 15, 0, 0, 0, 0, time.UTC), Num_mumbers: 5, Frequency: 14})
	assert.Equal(t, team1.Name, "team1")

	// Post 2 Survies in the mock database

	survey1, _ := SurveyRepo.CreateSurvey(&entities.Survey{StartDate: time.Date(2016, time.August, 15, 0, 0, 0, 0, time.UTC), EndDate: time.Date(2016, time.August, 30, 0, 0, 0, 0, time.UTC), Code: "code1", TeamName: "team1"})
	survey2, _ := SurveyRepo.CreateSurvey(&entities.Survey{StartDate: time.Date(2016, time.August, 15, 0, 0, 0, 0, time.UTC), EndDate: time.Date(2016, time.August, 30, 0, 0, 0, 0, time.UTC), Code: "code2", TeamName: "team1"})
	assert.Equal(t, survey1.Code, "code1")
	assert.Equal(t, survey2.Code, "code2")

	// Create a new Request
	e := echo.New()
	req := httptest.NewRequest(http.MethodGet, "/survies", nil)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)

	// Execute a function and assertions
	if assert.NoError(t, services.GetSurvies(c)) {
		var survies []*entities.Survey
		json.NewDecoder(rec.Body).Decode(&survies)
		assert.Equal(t, http.StatusOK, rec.Code)
		assert.Equal(t, len(survies), 2)
	}

	// clean databse
	TeamRepo.DeleteTeam(team1.Name)
	SurveyRepo.DeleteSurvey(survey1.Code)
	SurveyRepo.DeleteSurvey(survey2.Code)

}

func TestGetSurvey(t *testing.T) {
	// Post 1 team in the mock database

	team1, _ := TeamRepo.CreateTeam(&entities.Team{Name: "team1", StartDate: time.Date(2016, time.August, 15, 0, 0, 0, 0, time.UTC), Num_mumbers: 5, Frequency: 14})
	assert.Equal(t, team1.Name, "team1")

	// Post a survey in the mock database

	survey1, _ := SurveyRepo.CreateSurvey(&entities.Survey{StartDate: time.Date(2016, time.August, 15, 0, 0, 0, 0, time.UTC), EndDate: time.Date(2016, time.August, 30, 0, 0, 0, 0, time.UTC), Code: "code1", TeamName: "team1"})
	assert.Equal(t, survey1.Code, "code1")

	// Create a new Request
	e := echo.New()
	req := httptest.NewRequest(http.MethodGet, "/", nil)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	c.SetPath("/survey/:surveyCode")
	c.SetParamNames("surveyCode")
	c.SetParamValues(survey1.Code)

	// Execute function and Assertions
	if assert.NoError(t, services.GetSurvey(c)) {
		var survey entities.Survey
		json.NewDecoder(io.Reader(rec.Body)).Decode(&survey)
		assert.Equal(t, http.StatusOK, rec.Code)
		assert.Equal(t, survey1.Code, survey.Code)
	}

	// clean databse
	TeamRepo.DeleteTeam(team1.Name)
	SurveyRepo.DeleteSurvey(survey1.Code)
}

func TestCreateSurvey(t *testing.T) {

	// Post 1 team in the mock database

	team1, _ := TeamRepo.CreateTeam(&entities.Team{Name: "team1", StartDate: time.Date(2016, time.August, 15, 0, 0, 0, 0, time.UTC), Num_mumbers: 5, Frequency: 14})
	assert.Equal(t, team1.Name, "team1")

	// Create a new Request
	var survey entities.Survey
	surveyJSON := `{"Code": "code1", "StartDate":"2020-07-16T00:00:00Z", "EndDate": "2020-07-29T00:00:00Z","TeamName": "team1"}`
	e := echo.New()
	req := httptest.NewRequest(http.MethodPost, "/survey/create", strings.NewReader(surveyJSON))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)

	// Assertions
	if assert.NoError(t, services.CreateSurvey(c)) {
		json.NewDecoder(io.Reader(rec.Body)).Decode(&survey)
		assert.Equal(t, http.StatusOK, rec.Code)
		assert.Equal(t, survey.Code, "code1")
	}

	TeamRepo.DeleteTeam(team1.Name)
	SurveyRepo.DeleteSurvey(survey.Code)
}

func TestUpdateSurvey(t *testing.T) {

	// Post 1 team in the mock database

	team1, _ := TeamRepo.CreateTeam(&entities.Team{Name: "team1", StartDate: time.Date(2016, time.August, 15, 0, 0, 0, 0, time.UTC), Num_mumbers: 5, Frequency: 14})
	assert.Equal(t, team1.Name, "team1")

	// Post a new survey
	survey1, _ := SurveyRepo.CreateSurvey(&entities.Survey{StartDate: time.Date(2016, time.August, 15, 0, 0, 0, 0, time.UTC), EndDate: time.Date(2016, time.August, 30, 0, 0, 0, 0, time.UTC), Code: "code1", TeamName: "team1"})
	assert.Equal(t, survey1.Code, "code1")

	// Create a new Request
	var survey entities.Survey
	surveyJSON := `{"Code": "code2", "StartDate":"2020-07-01T00:00:00Z", "EndDate":"2020-07-30T00:00:00Z", "TeamName": "team1"}`
	e := echo.New()
	req := httptest.NewRequest(http.MethodPut, "/", strings.NewReader(surveyJSON))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	c.SetPath("/survey/:surveyCode")
	c.SetParamNames("surveyCode")
	c.SetParamValues(survey1.Code)

	// Assertions
	if assert.NoError(t, services.UpdateSurvey(c)) {
		json.NewDecoder(io.Reader(rec.Body)).Decode(&survey)
		assert.Equal(t, http.StatusOK, rec.Code)
		assert.Equal(t, survey.Code, "code2")

	}
	SurveyRepo.DeleteSurvey(survey1.Code)
	SurveyRepo.DeleteSurvey(survey.Code)
	TeamRepo.DeleteTeam(team1.Name)

}

func TestDeleteSurvey(t *testing.T) {

	// Post 1 team in the mock database
	team1, _ := TeamRepo.CreateTeam(&entities.Team{Name: "team1", StartDate: time.Date(2016, time.August, 15, 0, 0, 0, 0, time.UTC), Num_mumbers: 5, Frequency: 14})
	assert.Equal(t, team1.Name, "team1")

	// Post a new survey
	survey1, _ := SurveyRepo.CreateSurvey(&entities.Survey{StartDate: time.Date(2016, time.August, 15, 0, 0, 0, 0, time.UTC), EndDate: time.Date(2016, time.August, 30, 0, 0, 0, 0, time.UTC), Code: "code1", TeamName: "team1"})
	assert.Equal(t, survey1.Code, "code1")

	// Create a new Request
	var survey entities.Survey
	e := echo.New()
	req := httptest.NewRequest(http.MethodDelete, "/", nil)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	c.SetPath("/survey/:surveyCode")
	c.SetParamNames("surveyCode")
	c.SetParamValues(survey1.Code)

	// Assertions
	if assert.NoError(t, services.DeleteSurvey(c)) {
		json.NewDecoder(io.Reader(rec.Body)).Decode(&survey)
		assert.Equal(t, http.StatusOK, rec.Code)
		assert.Equal(t, survey.Code, "")
	}

	TeamRepo.DeleteTeam(team1.Name)
}

func TestAddNotesToSurvey(t *testing.T) {

	// Post 1 team in the mock database
	team1, _ := TeamRepo.CreateTeam(&entities.Team{Name: "team1", StartDate: time.Date(2016, time.August, 15, 0, 0, 0, 0, time.UTC), Num_mumbers: 5, Frequency: 14})
	assert.Equal(t, team1.Name, "team1")

	// Post 1 survey in the mock database
	survey1, _ := SurveyRepo.CreateSurvey(&entities.Survey{StartDate: time.Date(2016, time.August, 15, 0, 0, 0, 0, time.UTC), EndDate: time.Date(2016, time.August, 30, 0, 0, 0, 0, time.UTC), Code: "code1", TeamName: "team1"})
	assert.Equal(t, survey1.Code, "code1")

	// Create a new Request
	survey2 := &entities.Survey{}
	notesJSON := `[{"User": "user 1", "Number": 1, "Note": 10, "SurveyCode": "code1"},{"User": "user ", "Number": 2, "Note": 5, "SurveyCode": "code1"}]`
	e := echo.New()
	req := httptest.NewRequest(http.MethodPost, "/", strings.NewReader(notesJSON))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	c.SetPath("/survey/:surveyCode/addNotes")
	c.SetParamNames("surveyCode")
	c.SetParamValues(survey1.Code)

	// Assertions
	if assert.NoError(t, services.AddNotesToSurvey(c)) {
		json.NewDecoder(io.Reader(rec.Body)).Decode(&survey2)
		assert.Equal(t, http.StatusOK, rec.Code)
		assert.Equal(t, len(survey2.Notes), 2)
	}

	// clean databse
	TeamRepo.DeleteTeam(team1.Name)
	SurveyRepo.DeleteSurvey(survey2.Code)

}

func TestGetResultSurvey(t *testing.T) { // Post a new team
	team1, _ := TeamRepo.CreateTeam(&entities.Team{Name: "team1", StartDate: time.Date(2016, time.August, 15, 0, 0, 0, 0, time.UTC), Num_mumbers: 6, Frequency: 14})
	assert.Equal(t, team1.Name, "team1")
	// Post a servey with some notes
	survey1, _ := SurveyRepo.CreateSurvey(&entities.Survey{StartDate: time.Date(2016, time.August, 15, 0, 0, 0, 0, time.UTC), EndDate: time.Date(2016, time.August, 30, 0, 0, 0, 0, time.UTC), Code: "code1", TeamName: "team1"})
	assert.Equal(t, survey1.Code, "code1")
	survey1.Notes = []entities.Note{{User: "user 1", Number: 1, Note: 10, SurveyCode: "code1"}, {User: "user 1", Number: 2, Note: 2, SurveyCode: "code1"}}
	assert.Equal(t, survey1.Notes[0].Note, float64(10))
	assert.Equal(t, survey1.Notes[1].Note, float64(2))

	survey2, _ := SurveyRepo.UpdateSurvey(survey1.Code, survey1)
	assert.Equal(t, survey2.Notes[0].Note, float64(10))
	assert.Equal(t, survey2.Notes[1].Note, float64(2))
	// Create a new Request
	e := echo.New()
	req := httptest.NewRequest(http.MethodGet, "/", nil)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	c.SetPath("/survey/result/:teamName")
	c.SetParamNames("teamName")
	c.SetParamValues(team1.Name)

	// Assertions
	if assert.NoError(t, services.GetResultSurvey(c)) {
		var result *dto.Result
		json.NewDecoder(io.Reader(rec.Body)).Decode(&result)
		assert.Equal(t, http.StatusOK, rec.Code)
		assert.Equal(t, int(result.CurrentResult), 6)
	}

	// clean databse
	TeamRepo.DeleteTeam(team1.Name)
	SurveyRepo.DeleteSurvey(survey1.Code)
	SurveyRepo.DeleteSurvey(survey2.Code)
}

func TestSurveyCodeLength(t *testing.T) {
	randomString := services.GenerateSurveyCode(4)
	assert.Equal(t, len(randomString), 4)
}

func TestSurveyCodesNotEqual(t *testing.T) {
	randomString1 := services.GenerateSurveyCode(4)
	randomString2 := services.GenerateSurveyCode(4)
	assert.NotEqual(t, randomString1, randomString2)
}

func TestBuildNextSurvey(t *testing.T) {
	// Post 1 team in the mock database

	team1, _ := TeamRepo.CreateTeam(&entities.Team{Name: "team1", StartDate: time.Date(2016, time.August, 15, 0, 0, 0, 0, time.UTC), Num_mumbers: 7, Frequency: 15})
	assert.Equal(t, team1.Name, "team1")

	// Post 1 survey in the mock database

	team1.Surveys = []entities.Survey{{StartDate: time.Now().Add(time.Duration(10) * 24 * time.Hour * -1), EndDate: time.Now().Add(time.Duration(team1.Frequency) * 24 * time.Hour), Code: "code1", TeamName: "team1"}}
	assert.Equal(t, team1.Surveys[0].Code, "code1")

	team2, _ := TeamRepo.UpdateTeam(team1.Name, team1)
	assert.Equal(t, team2.Surveys[0].Code, "code1")

	// build next survey
	nextSurvey := services.BuildNextSurvey(team2)
	nextSurveyCode := []rune(nextSurvey.Code)
	firstPartNextSurveyCode := string(nextSurveyCode[0:len(team2.Name)])
	assert.Equal(t, firstPartNextSurveyCode, team2.Name)
	assert.Equal(t, nextSurvey.TeamName, team2.Surveys[0].TeamName)
	assert.Equal(t, nextSurvey.StartDate, team2.Surveys[0].EndDate.Add(24*time.Hour))
	assert.Equal(t, nextSurvey.EndDate, nextSurvey.StartDate.Add(time.Duration(team2.Frequency)*24*time.Hour))
	// clean databse
	TeamRepo.DeleteTeam(team2.Name)
}

func TestGetHistoricSurveysByUsers(t *testing.T) {
	team1, _ := TeamRepo.CreateTeam(&entities.Team{
		Name:        "team1",
		StartDate:   time.Date(2016, time.August, 15, 0, 0, 0, 0, time.UTC),
		Num_mumbers: 5,
		Frequency:   15,
	})

	survey1, _ := SurveyRepo.CreateSurvey(&entities.Survey{
		StartDate: time.Date(2016, time.August, 01, 0, 0, 0, 0, time.UTC),
		EndDate:   time.Date(2016, time.August, 14, 0, 0, 0, 0, time.UTC),
		Code:      "code1",
		TeamName:  "team1",
		Notes: []entities.Note{
			{
				Number:     1,
				Note:       10,
				SurveyCode: "code1",
				User:       services.HashUser("user 1"),
			},
			{
				Number:     2,
				Note:       2,
				SurveyCode: "code1",
				User:       services.HashUser("user 1"),
			},
			{
				Number:     1,
				Note:       10,
				SurveyCode: "code1",
				User:       services.HashUser("user 2"),
			},
			{
				Number:     2,
				Note:       2,
				SurveyCode: "code1",
				User:       services.HashUser("user 2"),
			},
		},
	})

	survey2, _ := SurveyRepo.CreateSurvey(&entities.Survey{
		StartDate: time.Date(2016, time.August, 15, 0, 0, 0, 0, time.UTC),
		EndDate:   time.Now().Add(24 * time.Hour),
		Code:      "code2",
		TeamName:  "team1",
		Notes: []entities.Note{
			{
				Number:     1,
				Note:       10,
				SurveyCode: "code2",
				User:       services.HashUser("user 1"),
			},
			{
				Number:     2,
				Note:       8,
				SurveyCode: "code2",
				User:       services.HashUser("user 1"),
			},
			{
				Number:     1,
				Note:       6,
				SurveyCode: "code2",
				User:       services.HashUser("user 2"),
			},
			{
				Number:     2,
				Note:       4,
				SurveyCode: "code2",
				User:       services.HashUser("user 2"),
			},
		},
	})

	assert.Equal(t, team1.Name, "team1")
	assert.Equal(t, survey1.Code, "code1")
	assert.Equal(t, survey2.Code, "code2")

	e := echo.New()
	req := httptest.NewRequest(http.MethodGet, "/", nil)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	c.SetPath("/resultByUsers/:teamName")
	c.SetParamNames("teamName")
	c.SetParamValues(team1.Name)

	// Execute function and Assertions
	if assert.NoError(t, services.GetHistoricSurveysByusers(c)) {
		var result []dto.ResultByUsers
		json.NewDecoder(io.Reader(rec.Body)).Decode(&result)
		assert.Equal(t, http.StatusOK, rec.Code)
		assert.Equal(t, len(result), 2)
		assert.Equal(t, int(result[0].Average), 9)
		assert.Equal(t, int(result[1].Average), 5)
	}

	// Clean database
	SurveyRepo.DeleteSurvey(survey1.Code)
	SurveyRepo.DeleteSurvey(survey2.Code)
	TeamRepo.DeleteTeam(team1.Name)

}

func TestGetHistoricSurveysByQuestion(t *testing.T) {
	team1, _ := TeamRepo.CreateTeam(&entities.Team{
		Name:        "team1",
		StartDate:   time.Date(2016, time.August, 15, 0, 0, 0, 0, time.UTC),
		Num_mumbers: 5,
		Frequency:   15,
	})

	survey1, _ := SurveyRepo.CreateSurvey(&entities.Survey{
		StartDate: time.Date(2016, time.August, 01, 0, 0, 0, 0, time.UTC),
		EndDate:   time.Date(2016, time.August, 14, 0, 0, 0, 0, time.UTC),
		Code:      "code1",
		TeamName:  "team1",
		Notes: []entities.Note{
			{
				Number:     1,
				Note:       10,
				SurveyCode: "code1",
				User:       services.HashUser("user 1"),
			},
			{
				Number:     2,
				Note:       2,
				SurveyCode: "code1",
				User:       services.HashUser("user 1"),
			},
			{
				Number:     1,
				Note:       10,
				SurveyCode: "code1",
				User:       services.HashUser("user 2"),
			},
			{
				Number:     2,
				Note:       2,
				SurveyCode: "code1",
				User:       services.HashUser("user 2"),
			},
		},
	})

	survey2, _ := SurveyRepo.CreateSurvey(&entities.Survey{
		StartDate: time.Date(2016, time.August, 15, 0, 0, 0, 0, time.UTC),
		EndDate:   time.Now().Add(24 * time.Hour),
		Code:      "code2",
		TeamName:  "team1",
		Notes: []entities.Note{
			{
				Number:     1,
				Note:       10,
				SurveyCode: "code2",
				User:       services.HashUser("user 1"),
			},
			{
				Number:     2,
				Note:       8,
				SurveyCode: "code2",
				User:       services.HashUser("user 1"),
			},
			{
				Number:     1,
				Note:       6,
				SurveyCode: "code2",
				User:       services.HashUser("user 2"),
			},
			{
				Number:     2,
				Note:       4,
				SurveyCode: "code2",
				User:       services.HashUser("user 2"),
			},
		},
	})

	assert.Equal(t, team1.Name, "team1")
	assert.Equal(t, survey1.Code, "code1")
	assert.Equal(t, survey2.Code, "code2")

	e := echo.New()
	req := httptest.NewRequest(http.MethodGet, "/", nil)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	c.SetPath("/resultByQuestions/:teamName")
	c.SetParamNames("teamName")
	c.SetParamValues(team1.Name)

	// Execute function and Assertions
	if assert.NoError(t, services.GetHistoricSurveysByQuestions(c)) {
		var result []dto.ResultByQuestions
		json.NewDecoder(io.Reader(rec.Body)).Decode(&result)
		assert.Equal(t, http.StatusOK, rec.Code)
		assert.Equal(t, len(result), 2)
		assert.Equal(t, int(result[0].Average), 8)
		assert.Equal(t, int(result[1].Average), 6)
	}

	// Clean database
	TeamRepo.DeleteTeam("team1")

}
