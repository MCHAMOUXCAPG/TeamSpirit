package tests

import (
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"

	"github.com/callicoder/packer/entities"
	"github.com/callicoder/packer/repositories"
	"github.com/callicoder/packer/services"
	"github.com/labstack/echo/v4"
	"github.com/stretchr/testify/assert"
)

var (
	SurveyRepo repositories.SurveyRepository = repositories.NewSurveyRepository()
)

func TestGetSurvies(t *testing.T) {

	// Post 2 Survies in the mock database
	survey1, _ := SurveyRepo.CreateSurvey(&entities.Survey{StartDate: time.Date(2016, time.August, 15, 0, 0, 0, 0, time.UTC), EndDate: time.Date(2016, time.August, 30, 0, 0, 0, 0, time.UTC), Code: "code1", TeamName: "team1"})
	survey2, _ := SurveyRepo.CreateSurvey(&entities.Survey{StartDate: time.Date(2016, time.August, 15, 0, 0, 0, 0, time.UTC), EndDate: time.Date(2016, time.August, 30, 0, 0, 0, 0, time.UTC), Code: "code2", TeamName: "team2"})
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
	SurveyRepo.DeleteSurvey(survey1.Code)
	SurveyRepo.DeleteSurvey(survey2.Code)
}

func TestGetSurvey(t *testing.T) {

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
	SurveyRepo.DeleteSurvey(survey1.Code)
}

func TestCreateSurvey(t *testing.T) {

	// Create a new Request
	var survey entities.Survey
	surveyJSON := `{"Code": "code1", "TeamName": "team1"}`
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

	SurveyRepo.DeleteSurvey(survey.Code)
}

func TestUpdateSurvey(t *testing.T) {
	// Post a new survey
	survey1, _ := SurveyRepo.CreateSurvey(&entities.Survey{StartDate: time.Date(2016, time.August, 15, 0, 0, 0, 0, time.UTC), EndDate: time.Date(2016, time.August, 30, 0, 0, 0, 0, time.UTC), Code: "code1", TeamName: "team1"})
	assert.Equal(t, survey1.Code, "code1")

	// Create a new Request
	var survey entities.Survey
	surveyJSON := `{"Code": "code2", "TeamName": "team1"}`
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
}

func TestDeleteSurvey(t *testing.T) {

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
}

func TestAddNotesToSurvey(t *testing.T) {

	// Post 1 survey in the mock database
	survey1, _ := SurveyRepo.CreateSurvey(&entities.Survey{StartDate: time.Date(2016, time.August, 15, 0, 0, 0, 0, time.UTC), EndDate: time.Date(2016, time.August, 30, 0, 0, 0, 0, time.UTC), Code: "code1", TeamName: "team1"})
	assert.Equal(t, survey1.Code, "code1")

	// Create a new Request
	survey2 := &entities.Survey{}
	notesJSON := `[{"Number": 0, "Note": 10, "SurveyCode": "code1"},{"Number": 1, "Note": 5, "SurveyCode": "code1"}]`
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
	SurveyRepo.DeleteSurvey(survey1.Code)

}

func TestGetResultSurvey(t *testing.T) {
	// Post a servey with some notes
	survey1, _ := SurveyRepo.CreateSurvey(&entities.Survey{StartDate: time.Date(2016, time.August, 15, 0, 0, 0, 0, time.UTC), EndDate: time.Date(2016, time.August, 30, 0, 0, 0, 0, time.UTC), Code: "code1", TeamName: "team1"})
	assert.Equal(t, survey1.Code, "code1")

	survey1.Notes = []entities.Note{{Number: 0, Note: 10, SurveyCode: "code1"}, {Number: 1, Note: 2, SurveyCode: "code1"}}
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
	c.SetPath("/survey/result/:surveyCode")
	c.SetParamNames("surveyCode")
	c.SetParamValues(survey1.Code)

	// Assertions
	if assert.NoError(t, services.GetResultSurvey(c)) {
		var result float64
		json.NewDecoder(io.Reader(rec.Body)).Decode(&result)
		assert.Equal(t, http.StatusOK, rec.Code)
		assert.Equal(t, int(result), 6)
	}

	// clean databse
	SurveyRepo.DeleteSurvey(survey1.Code)
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

	team1, _ := TeamRepo.CreateTeam(&entities.Team{Name: "team1", StartDate: time.Date(2016, time.August, 15, 0, 0, 0, 0, time.UTC), Num_mumbers: 5, Frequency: 15})
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
	SurveyRepo.DeleteSurvey(nextSurvey.Code)
	SurveyRepo.DeleteSurvey(team2.Surveys[0].Code)
	TeamRepo.DeleteTeam(team2.Name)
}
