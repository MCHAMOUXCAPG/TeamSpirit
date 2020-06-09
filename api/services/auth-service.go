package services

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/callicoder/packer/entities"
	"github.com/labstack/echo/v4"
	_ "github.com/mattn/go-sqlite3"
)

// @Summary Access to survey
// @Description you should send a survey code to access
// @Tags Autentication
// @Accept json
// @Produce json
// @Param Code body entities.Access true "string"
// @Success 200 {object} entities.Survey
// @Router /access [post]
func AccessToSurvey(c echo.Context) error {
	access := &entities.Access{}

	json.NewDecoder(c.Request().Body).Decode(&access)
	survey, _ := SurveyRepo.GetSurvey(access.Code)

	if survey.Code == "" {
		return echo.NewHTTPError(http.StatusNotFound, "Invalid survey code, Please enter a valid code !")
	}

	team, _ := TeamRepo.GetTeam(survey.TeamName)

	if len(survey.Notes) >= (team.Num_mumbers * 6) {
		return echo.NewHTTPError(http.StatusUnauthorized, "Access not allowed! The maximum number of notes has been reached")
	}

	if time.Now().After(survey.EndDate) {
		return echo.NewHTTPError(http.StatusUnauthorized, "Acess not allowed! The deadline to complete the survey has passed")

	}

	return c.JSON(http.StatusOK, survey)
}
