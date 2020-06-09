package services

import (
	"encoding/json"
	"math/rand"
	"net/http"
	"time"

	"github.com/callicoder/packer/entities"
	"github.com/callicoder/packer/repositories"
	"github.com/labstack/echo/v4"
	_ "github.com/mattn/go-sqlite3"
)

var (
	SurveyRepo repositories.SurveyRepository = repositories.NewSurveyRepository()
)

// @Summary Get all survies
// @Description returns all survies
// @Tags Survies
// @Accept json
// @Produce json
// @Success 200 {object} entities.Survey
// @Router /survies [Get]
func GetSurvies(c echo.Context) error {

	survies, _ := SurveyRepo.GetSurvies()
	return c.JSON(http.StatusOK, survies)
}

// @Summary Get survey by it code
// @Description returns survey by it code
// @Tags Survies
// @Accept json
// @Produce json
// @Success 200 {object} entities.Survey
// @Router /survey/:surveyCode [Get]
func GetSurvey(c echo.Context) error {

	surveyCode := c.Param("surveyCode")
	survey, _ := SurveyRepo.GetSurvey(surveyCode)
	return c.JSON(http.StatusOK, survey)
}

// @Summary Create a new survey
// @Description returns the survey created
// @Tags Survies
// @Accept json
// @Produce json
// @Param StartDate body entities.Survey true "Date"
// @Param EndDate body entities.Survey true "Date"
// @Param Code body entities.Survey true "String"
// @Param TeamName body entities.Survey true "String"
// @Success 200 {object} entities.Survey
// @Router /survey/create [post]
func CreateSurvey(c echo.Context) error {

	var newSurvey = &entities.Survey{}
	json.NewDecoder(c.Request().Body).Decode(&newSurvey)

	survey, _ := SurveyRepo.CreateSurvey(newSurvey)
	return c.JSON(http.StatusOK, survey)
}

// @Summary Update a survey
// @Description returns the survey updated
// @Tags Survies
// @Accept json
// @Produce json
// @Param StartDate body entities.Survey true "Date"
// @Param EndDate body entities.Survey true "Date"
// @Param Code body entities.Survey true "String"
// @Param TeamName body entities.Survey true "String"
// @Success 200 {object} entities.Survey
// @Router /survey/:surveyCode [put]
func UpdateSurvey(c echo.Context) error {

	surveyCode := c.Param("surveyCode")
	var updatedSurvey = &entities.Survey{}
	json.NewDecoder(c.Request().Body).Decode(&updatedSurvey)

	survey, _ := SurveyRepo.UpdateSurvey(surveyCode, updatedSurvey)
	return c.JSON(http.StatusOK, survey)
}

// @Summary Delete a survey
// @Description returns a empty survey
// @Tags Survies
// @Accept json
// @Produce json
// @Success 200 {object} entities.Survey
// @Router /survey/:surveyCode [delete]
func DeleteSurvey(c echo.Context) error {

	surveyCode := c.Param("surveyCode")
	survey, _ := SurveyRepo.DeleteSurvey(surveyCode)
	return c.JSON(http.StatusOK, survey)
}

// @Summary Add notes to survey
// @Description you should send an array of Notes. Those will be saved in the survey with code provided.
// @Tags Survies
// @Accept json
// @Produce json
// @Param Number body entities.Note true "int"
// @Param Note body entities.Note true "int"
// @Param surveyCode body entities.Note true "string"
// @Success 200 {object} entities.Survey
// @Router /survey/:surveyCode/addNotes [post]
func AddNotesToSurvey(c echo.Context) error {

	surveyCode := c.Param("surveyCode")
	var notes []entities.Note

	json.NewDecoder(c.Request().Body).Decode(&notes)

	survey, _ := SurveyRepo.GetSurvey(surveyCode)

	survey.Notes = notes

	SurveyRepo.UpdateSurvey(surveyCode, survey)

	return c.JSON(http.StatusOK, survey)
}

// @Summary Survey result
// @Description returns the average of all the survey notes
// @Tags Survies
// @Accept json
// @Produce json
// @Success 200 "int"
// @Router /survey/result/:surveyCode [get]
func GetResultSurvey(c echo.Context) error {
	surveyCode := c.Param("surveyCode")
	result, _ := SurveyRepo.GetResultSurvey(surveyCode)
	return c.JSON(http.StatusOK, result)
}

func CreateSurveyAtEndOfSprint() {

	teams, _ := TeamRepo.GetTeams()
	for _, team := range teams {
		if len(team.Surveys) != 0 {
			daysbeforeEndSprint := 4
			durationSinceStartLastSprint := int(time.Since(team.Surveys[len(team.Surveys)-1].StartDate).Hours() / 24)
			if durationSinceStartLastSprint == (team.Frequency - daysbeforeEndSprint) {
				nextSurvey := buildNextSurvey(team)
				SurveyRepo.CreateSurvey(nextSurvey)
			}
		}
	}
}

func buildNextSurvey(team *entities.Team) *entities.Survey {
	nextSurveyStartDay := team.Surveys[len(team.Surveys)-1].EndDate.Add(24 * time.Hour)
	nextSurveyEndDay := nextSurveyStartDay.Add(time.Duration(team.Frequency) * 24 * time.Hour)
	nextSurveyCode := team.Name + "-" + generateSurveyCode(5)
	nextSurveyTeamName := team.Name
	nextSurvey := &entities.Survey{StartDate: nextSurveyStartDay, EndDate: nextSurveyEndDay, Code: nextSurveyCode, TeamName: nextSurveyTeamName}
	return nextSurvey
}

func generateSurveyCode(n int) string {
	var letters = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")

	s := make([]rune, n)
	for i := range s {
		s[i] = letters[rand.Intn(len(letters))]
	}
	return string(s)
}
