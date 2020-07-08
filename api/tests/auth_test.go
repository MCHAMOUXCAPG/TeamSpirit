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
	"capgemini.com/gorn/team-spirit/services"
	"github.com/labstack/echo/v4"
	"github.com/stretchr/testify/assert"
)

func TestAccessToSurvey(t *testing.T) {
	// Post 1 team in the mock database

	team1, _ := TeamRepo.CreateTeam(&entities.Team{
		Name:        "team1",
		StartDate:   time.Date(2016, time.August, 15, 0, 0, 0, 0, time.UTC),
		Num_mumbers: 5, Frequency: 15,
		Surveys: []entities.Survey{
			{
				StartDate: time.Date(2016, time.August, 15, 0, 0, 0, 0, time.UTC),
				EndDate:   time.Now().Add(24 * time.Hour),
				Code:      "code1",
				TeamName:  "team1"}}})
	assert.Equal(t, team1.Name, "team1")
	assert.Equal(t, team1.Surveys[0].Code, "code1")

	// Create a new Request
	survey2 := &entities.Survey{}
	accessCodeJSON := `{"Code":"code1"}`
	e := echo.New()
	req := httptest.NewRequest(http.MethodPost, "/access", strings.NewReader(accessCodeJSON))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)

	// Assertions
	if assert.NoError(t, services.AccessToSurvey(c)) {
		json.NewDecoder(io.Reader(rec.Body)).Decode(&survey2)
		assert.Equal(t, http.StatusOK, rec.Code)
		assert.Equal(t, survey2.Code, "code1")
	}

	// clean databse
	SurveyRepo.DeleteSurvey(team1.Surveys[0].Code)
	TeamRepo.DeleteTeam(team1.Name)
}

func TestRegister(t *testing.T) {
	userBody := `{"Email":"user1@gmail.com","Full_name":"user1", "Password":"pwd1"}`
	e := echo.New()
	req := httptest.NewRequest(http.MethodPost, "/register", strings.NewReader(userBody))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	var user = &entities.User{}
	// Assertions
	if assert.NoError(t, services.Register(c)) {
		json.NewDecoder(io.Reader(rec.Body)).Decode(&user)
		assert.Equal(t, http.StatusOK, rec.Code)
		assert.Equal(t, user.Full_name, "user1")
	}

	// Clean database
	UserRepo.DeleteUser(user.Id)
}

func TestLogin(t *testing.T) {
	user, _ := UserRepo.CreateUser(&entities.User{Email: "user1@gmail.com", Full_name: "user1", Password: services.HashAndSalt("pwd1")})
	assert.Equal(t, user.Full_name, "user1")
	loginBody := `{"Email":"user1@gmail.com","Password":"pwd1"}`
	e := echo.New()
	req := httptest.NewRequest(http.MethodPost, "/login", strings.NewReader(loginBody))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	var response = &dto.Response{}
	// Assertions
	if assert.NoError(t, services.Login(c)) {
		json.NewDecoder(io.Reader(rec.Body)).Decode(&response)
		assert.Equal(t, http.StatusOK, rec.Code)
		assert.NotEqual(t, response.Token, "")
	}

	// Clean database
	UserRepo.DeleteUser(user.Id)

}
