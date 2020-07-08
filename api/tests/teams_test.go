package tests

import (
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"

	"capgemini.com/gorn/team-spirit/entities"
	"capgemini.com/gorn/team-spirit/repositories"
	"capgemini.com/gorn/team-spirit/services"
	"github.com/labstack/echo/v4"
	"github.com/stretchr/testify/assert"
)

var (
	TeamRepo repositories.TeamRepository = repositories.NewTeamRepository()
)

func TestGetTeams(t *testing.T) {

	// Post 2 teams in the mock database
	team1, _ := TeamRepo.CreateTeam(&entities.Team{Name: "team1", StartDate: time.Date(2016, time.August, 15, 0, 0, 0, 0, time.UTC), Num_mumbers: 5, Frequency: 14})
	team2, _ := TeamRepo.CreateTeam(&entities.Team{Name: "team2", StartDate: time.Date(2016, time.August, 15, 0, 0, 0, 0, time.UTC), Num_mumbers: 5, Frequency: 14})
	assert.Equal(t, team1.Name, "team1")
	assert.Equal(t, team2.Name, "team2")

	// Create a new Request
	e := echo.New()
	req := httptest.NewRequest(http.MethodGet, "/teams", nil)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)

	// Execute a function and assertions
	if assert.NoError(t, services.GetTeams(c)) {
		var teams []*entities.Team
		json.NewDecoder(rec.Body).Decode(&teams)
		assert.Equal(t, http.StatusOK, rec.Code)
		assert.Equal(t, len(teams), 2)
	}

	// clean databse
	TeamRepo.DeleteTeam(team1.Name)
	TeamRepo.DeleteTeam(team2.Name)
}

func TestGetTeam(t *testing.T) {

	// Post a team in the mock database
	team1, _ := TeamRepo.CreateTeam(&entities.Team{Name: "team1", StartDate: time.Date(2016, time.August, 15, 0, 0, 0, 0, time.UTC), Num_mumbers: 5, Frequency: 14})
	assert.Equal(t, team1.Name, "team1")

	// Create a new Request
	e := echo.New()
	req := httptest.NewRequest(http.MethodGet, "/", nil)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	c.SetPath("/team/:teamName")
	c.SetParamNames("teamName")
	c.SetParamValues(team1.Name)

	// Execute function and Assertions
	if assert.NoError(t, services.GetTeam(c)) {
		var team entities.Team
		json.NewDecoder(io.Reader(rec.Body)).Decode(&team)
		assert.Equal(t, http.StatusOK, rec.Code)
		assert.Equal(t, team.Name, team.Name)
	}

	// clean databse
	TeamRepo.DeleteTeam(team1.Name)
}

func TestCreateTeam(t *testing.T) {

	// Create a new Request
	var team entities.Team
	teamJSON := `{"Name": "team1"}`
	e := echo.New()
	req := httptest.NewRequest(http.MethodPost, "/team/create", strings.NewReader(teamJSON))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)

	// Assertions
	if assert.NoError(t, services.CreateTeam(c)) {
		json.NewDecoder(io.Reader(rec.Body)).Decode(&team)
		assert.Equal(t, http.StatusOK, rec.Code)
		assert.Equal(t, team.Name, "team1")
	}

	// clean databse
	TeamRepo.DeleteTeam(team.Name)
}

func TestUpdateTeam(t *testing.T) {
	// Post a new team
	team1, _ := TeamRepo.CreateTeam(&entities.Team{Name: "team1", StartDate: time.Date(2016, time.August, 15, 0, 0, 0, 0, time.UTC), Num_mumbers: 5, Frequency: 14})
	assert.Equal(t, team1.Name, "team1")

	// Create a new Request
	var team entities.Team
	teamJSON := `{"Name": "team1"}`
	e := echo.New()
	req := httptest.NewRequest(http.MethodPut, "/", strings.NewReader(teamJSON))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	c.SetPath("/team/:teamName")
	c.SetParamNames("teamName")
	c.SetParamValues(team.Name)

	// Assertions
	if assert.NoError(t, services.UpdateTeam(c)) {
		json.NewDecoder(io.Reader(rec.Body)).Decode(&team)
		assert.Equal(t, http.StatusOK, rec.Code)
		assert.Equal(t, team.Name, "team1")
	}

	// clean database
	TeamRepo.DeleteTeam(team.Name)
}

func TestDeleteTeam(t *testing.T) {

	// Post a new team
	team1, _ := TeamRepo.CreateTeam(&entities.Team{Name: "team1", StartDate: time.Date(2016, time.August, 15, 0, 0, 0, 0, time.UTC), Num_mumbers: 5, Frequency: 14})
	assert.Equal(t, team1.Name, "team1")

	// Create a new Request
	var team entities.Team
	e := echo.New()
	req := httptest.NewRequest(http.MethodDelete, "/", nil)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	c.SetPath("/team/:teamName")
	c.SetParamNames("teamName")
	c.SetParamValues(team1.Name)

	// Assertions
	if assert.NoError(t, services.DeleteTeam(c)) {
		json.NewDecoder(io.Reader(rec.Body)).Decode(&team)
		assert.Equal(t, http.StatusOK, rec.Code)
		assert.Equal(t, team.Name, "")
	}
}
