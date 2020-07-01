package services

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"math/rand"
	"net/http"
	"strconv"
	"time"

	"capgemini.com/gorn/team-spirit/dto"
	"capgemini.com/gorn/team-spirit/entities"
	"capgemini.com/gorn/team-spirit/repositories"
	"github.com/labstack/echo/v4"
	_ "github.com/mattn/go-sqlite3"
	"github.com/robfig/cron"
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
// @Description returns the result survey
// @Tags Survies
// @Accept json
// @Produce json
// @Success 200 {object} dto.Result
// @Router /survey/result/:teamName [get]
func GetResultSurvey(c echo.Context) error {
	teamName := c.Param("teamName")
	lastSurvey, _ := SurveyRepo.GetLastSurvey(teamName)
	team, _ := TeamRepo.GetTeam(lastSurvey.TeamName)
	return c.JSON(http.StatusOK, mapResult(team, lastSurvey))
}

// @Summary Survey resultByQuestions
// @Description returns the result survey grouped by users
// @Tags Survies
// @Accept json
// @Produce json
// @Success 200 {object} []dto.ResultByQuestions
// @Router /resultByQuestions/:teamName [get]
func GetHistoricSurveysByQuestions(c echo.Context) error {
	teamName := c.Param("teamName")
	lastSurvey, _ := SurveyRepo.GetLastSurvey(teamName)
	notes, _ := SurveyRepo.GetNotesGroupByQuestions(lastSurvey.Code)
	result := mapQuestionNotes(notes, lastSurvey.Code)
	return c.JSON(http.StatusOK, result)
}

func mapQuestionNotes(notes []*dto.ResultByQuestions, surveyCode string) []*dto.ResultByQuestions {
	var result []*dto.ResultByQuestions
	for _, note := range notes {
		notes, _ := SurveyRepo.GetNotesBySurveyAndQuestion(note.QuestionNumber, surveyCode)
		result = append(result, &dto.ResultByQuestions{
			QuestionNumber: note.QuestionNumber,
			Average:        note.Average,
			Notes:          notes,
		})
	}
	return result
}

// @Summary Survey resultByUsers
// @Description returns the result survey grouped by users
// @Tags Survies
// @Accept json
// @Produce json
// @Success 200 {object} []dto.ResultByUsers
// @Router /resultByUsers/:teamName [get]
func GetHistoricSurveysByusers(c echo.Context) error {
	teamName := c.Param("teamName")
	lastSurvey, _ := SurveyRepo.GetLastSurvey(teamName)
	notes, _ := SurveyRepo.GetNotesGroupByUsers(lastSurvey.Code)
	result := mapNotes(notes, lastSurvey.Code)
	return c.JSON(http.StatusOK, result)
}

func mapNotes(notes []*dto.ResultByUsers, surveyCode string) []*dto.ResultByUsers {
	var result []*dto.ResultByUsers
	for i, note := range notes {
		notes, _ := SurveyRepo.GetNotesBySurveyAndUser(surveyCode, note.User)
		result = append(result, &dto.ResultByUsers{
			User:    "User " + strconv.Itoa(i+1),
			Average: note.Average,
			Notes:   notes,
		})
	}
	return result
}

func mapResult(team *entities.Team, currentSurvey *entities.Survey) *dto.Result {
	var result = &dto.Result{}
	result.Period.StartDate = currentSurvey.StartDate
	result.Period.EndDate = currentSurvey.EndDate
	result.Completed = calculateCompleted(team.Num_mumbers, currentSurvey.Notes)
	result.CurrentResult, _ = SurveyRepo.GetResultSurvey(currentSurvey.Code)
	result.HistoricResult, _ = SurveyRepo.GetHistoricResult(team.Name)
	return result
}

func calculateCompleted(membersTeam int, notes []entities.Note) string {
	membersVote := len(notes) / 6
	return strconv.Itoa(membersVote) + "/" + strconv.Itoa(membersTeam)
}

func CreateSurveyAtEndOfSprint() {

	teams, _ := TeamRepo.GetTeams()
	for _, team := range teams {
		if len(team.Surveys) != 0 {
			daysbeforeEndSprint := 4
			durationSinceStartLastSprint := int(time.Since(team.Surveys[len(team.Surveys)-1].StartDate).Hours() / 24)
			if durationSinceStartLastSprint == (team.Frequency - daysbeforeEndSprint) {
				nextSurvey := BuildNextSurvey(team)
				SurveyRepo.CreateSurvey(nextSurvey)
			}
		}
	}
}

func BuildNextSurvey(team *entities.Team) *entities.Survey {
	nextSurveyStartDay := team.Surveys[len(team.Surveys)-1].EndDate.Add(24 * time.Hour)
	nextSurveyEndDay := nextSurveyStartDay.Add(time.Duration(team.Frequency) * 24 * time.Hour)
	nextSurveyCode := team.Name + "-" + GenerateSurveyCode(5)
	nextSurveyTeamName := team.Name
	nextSurvey := &entities.Survey{StartDate: nextSurveyStartDay, EndDate: nextSurveyEndDay, Code: nextSurveyCode, TeamName: nextSurveyTeamName}
	return nextSurvey
}

// TODO: Review logic for surveycode generation: Only on teamleader consult

func GenerateSurveyCode(n int) string {
	var letters = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")

	s := make([]rune, n)
	for i := range s {
		s[i] = letters[rand.Intn(len(letters))]
	}
	return string(s)
}

func CreateSurveyAutomatically() {
	c := cron.New()
	c.AddFunc("* * * 1 * *", CreateSurveyAtEndOfSprint)
	c.Start()
}

// @Summary Surveys export
// @Description returns surveys export on csv stream
// @Tags Survies
// @Produce octet-stream
// @Param startDate query string false "start date"
// @Param endDate query string false "end date"
// @Router /survey/exportCsv [get]
func ExportSurveysCsv(c echo.Context) (err error) {

	startDate := c.QueryParam("startDate")
	endDate := c.QueryParam("endDate")
	var headerCsv = []string{"StartDate", "EndDate", "Q.Number", "Note", "Code", "TeamName"}
	surveys, _ := SurveyRepo.GetSurviesByPeriod(startDate, endDate)
	res := c.Response()
	w := csv.NewWriter(res)
	w.Comma = ';'
	fileName := "Surveys_Export_" + startDate + "_" + endDate + ".csv"
	header := res.Header()
	header.Set(echo.HeaderContentType, echo.MIMEOctetStream)
	header.Set(echo.HeaderContentDisposition, "attachment; filename="+fileName)
	header.Set("Content-Transfer-Encoding", "binary")
	header.Set("Expires", "0")
	res.WriteHeader(http.StatusOK)

	if err = w.Write(headerCsv); err != nil {
		return
	}

	for _, survey := range surveys {
		surveyStartDate := survey.StartDate.String()
		surveyEndDate := survey.EndDate.String()
		surveyTeamName := survey.TeamName
		surveyCode := survey.Code

		for _, note := range survey.Notes {
			line := []string{surveyStartDate, surveyEndDate, strconv.Itoa(note.Number), fmt.Sprintf("%g", note.Note), surveyCode, surveyTeamName}
			if err = w.Write(line); err != nil {
				return
			}
			w.Flush()
		}

	}

	return
}
