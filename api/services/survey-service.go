package services

import (
	"crypto/sha256"
	"encoding/csv"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"math/rand"
	"net/http"
	"strconv"
	"time"

	"github.com/jinzhu/gorm"

	"capgemini.com/gorn/team-spirit/constants"
	"capgemini.com/gorn/team-spirit/dto"
	"capgemini.com/gorn/team-spirit/entities"
	"capgemini.com/gorn/team-spirit/repositories"
	"github.com/labstack/echo/v4"
	_ "github.com/mattn/go-sqlite3"
	"github.com/robfig/cron"
	_ "golang.org/x/crypto/bcrypt"
)

var (
	SurveyRepo repositories.SurveyRepository = repositories.NewSurveyRepository()
)

// @Summary Get all surveys
// @Description returns all surveys
// @Tags Surveys
// @Accept json
// @Produce json
// @Success 200 {object} []entities.Survey
// @Failure 500 {object} dto.Error
// @Router /survies [Get]
func GetSurvies(c echo.Context) error {

	survies, err := SurveyRepo.GetSurvies()

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, constants.GETS_GETSURVEYS)
	}

	return c.JSON(http.StatusOK, survies)
}

// @Summary Get survey by it code
// @Description returns survey by it code
// @Tags Surveys
// @Accept json
// @Produce json
// @Param surveyCode path string true "survey Code"
// @Success 200 {object} entities.Survey
// @Failure 500 {object} dto.Error
// @Failure 404 {object} dto.Error
// @Router /survey/:surveyCode [Get]
func GetSurvey(c echo.Context) error {

	surveyCode := c.Param("surveyCode")
	survey, err := SurveyRepo.GetSurvey(surveyCode)

	if gorm.IsRecordNotFoundError(err) {
		return echo.NewHTTPError(http.StatusNotFound, constants.NOTFOUND_GETSURVEY)
	}

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, constants.GET_GETSURVEY)
	}

	return c.JSON(http.StatusOK, survey)
}

// @Summary Create a new survey
// @Description returns the survey created
// @Tags Surveys
// @Accept json
// @Produce json
// @Param SurveyDTO body entities.Survey true "SurveyDTO"
// @Success 200 {object} entities.Survey
// @Failure 500 {object} dto.Error
// @Failure 400 {object} dto.Error
// @Router /survey/create [post]
func CreateSurvey(c echo.Context) error {

	var newSurvey = &entities.Survey{}
	json.NewDecoder(c.Request().Body).Decode(&newSurvey)

	if newSurvey.Code == "" {
		return echo.NewHTTPError(http.StatusBadRequest, constants.CREATE_CREATESURVEY_EMPTY_FIELD)
	}

	if newSurvey.TeamName == "" {
		return echo.NewHTTPError(http.StatusBadRequest, constants.CREATE_CREATESURVEY_EMPTY_FIELD)
	}

	if newSurvey.StartDate.IsZero() {
		return echo.NewHTTPError(http.StatusBadRequest, constants.CREATE_CREATESURVEY_EMPTY_FIELD)
	}

	if newSurvey.EndDate.IsZero() {
		return echo.NewHTTPError(http.StatusBadRequest, constants.CREATE_CREATESURVEY_EMPTY_FIELD)
	}

	if newSurvey.EndDate.Before(newSurvey.StartDate) {
		return echo.NewHTTPError(http.StatusBadRequest, constants.CREATE_CREATESURVEY_DATE_ERROR)
	}

	survey, err := SurveyRepo.CreateSurvey(newSurvey)

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, constants.CREATE_CREATESURVEY)
	}

	return c.JSON(http.StatusOK, survey)
}

// @Summary Update a survey
// @Description returns the survey updated
// @Tags Surveys
// @Accept json
// @Produce json
// @Param surveyCode path string true "survey Code"
// @Param SurveyDTO body entities.Survey true "SurveyDTO"
// @Success 200 {object} entities.Survey
// @Failure 500 {object} dto.Error
// @Failure 400 {object} dto.Error
// @Router /survey/:surveyCode [put]
func UpdateSurvey(c echo.Context) error {

	surveyCode := c.Param("surveyCode")
	var updatedSurvey = &entities.Survey{}
	json.NewDecoder(c.Request().Body).Decode(&updatedSurvey)

	if updatedSurvey.Code == "" {
		return echo.NewHTTPError(http.StatusBadRequest, constants.UPDATE_UPDATESURVEY_EMPTY_FIELD)
	}

	if updatedSurvey.TeamName == "" {
		return echo.NewHTTPError(http.StatusBadRequest, constants.UPDATE_UPDATESURVEY_EMPTY_FIELD)
	}

	if updatedSurvey.StartDate.IsZero() {
		return echo.NewHTTPError(http.StatusBadRequest, constants.UPDATE_UPDATESURVEY_EMPTY_FIELD)
	}

	if updatedSurvey.EndDate.IsZero() {
		return echo.NewHTTPError(http.StatusBadRequest, constants.UPDATE_UPDATESURVEY_EMPTY_FIELD)
	}

	if updatedSurvey.EndDate.Before(updatedSurvey.StartDate) {
		return echo.NewHTTPError(http.StatusBadRequest, constants.UPDATE_UPDATESURVEY_DATE_ERROR)
	}

	survey, err := SurveyRepo.UpdateSurvey(surveyCode, updatedSurvey)

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, constants.UPDATE_UPDATESURVEY)
	}

	return c.JSON(http.StatusOK, survey)
}

// @Summary Delete a survey
// @Description returns a empty survey
// @Tags Surveys
// @Accept json
// @Produce json
// @Param surveyCode path string true "survey Code"
// @Success 200 {object} entities.Survey
// @Failure 500 {object} dto.Error
// @Router /survey/:surveyCode [delete]
func DeleteSurvey(c echo.Context) error {

	surveyCode := c.Param("surveyCode")
	survey, err := SurveyRepo.DeleteSurvey(surveyCode)

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, constants.DELETE_DELETESURVEY)
	}

	return c.JSON(http.StatusOK, survey)
}

// @Summary Reset a survey
// @Description returns a empty survey
// @Tags Surveys
// @Accept json
// @Produce json
// @Param surveyCode path string true "survey Code"
// @Success 200 {object} entities.Survey
// @Failure 404 {object} dto.Error
// @Failure 500 {object} dto.Error
// @Router /survey/resetSurvey/:surveyCode [put]
func ResetSurvey(c echo.Context) error {

	surveyCode := c.Param("surveyCode")
	var notes = &entities.Note{}
	_, err := SurveyRepo.GetSurvey(surveyCode)

	if gorm.IsRecordNotFoundError(err) {
		return echo.NewHTTPError(http.StatusNotFound, constants.NOTFOUND_GETNOTES)
	}

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, constants.GET_GETSURVEY)
	}

	note, err := SurveyRepo.ResetSurvey(surveyCode, notes)

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, constants.RESET_DELETENOTES)
	}

	return c.JSON(http.StatusOK, note)
}

// @Summary Add notes to survey
// @Description you should send an array of Notes. Those will be saved in the survey with code provided.
// @Tags Surveys
// @Accept json
// @Produce json
// @Param surveyCode path string true "survey Code"
// @Param []Notes body []entities.Note true "[]Notes"
// @Success 200 {object} entities.Survey
// @Failure 500 {object} dto.Error
// @Failure 404 {object} dto.Error
// @Router /survey/:surveyCode/addNotes [post]
func AddNotesToSurvey(c echo.Context) error {

	surveyCode := c.Param("surveyCode")
	var notes []entities.Note

	json.NewDecoder(c.Request().Body).Decode(&notes)

	notes = hashAndSaltUser(notes)

	survey, err := SurveyRepo.GetSurvey(surveyCode)

	if gorm.IsRecordNotFoundError(err) {
		return echo.NewHTTPError(http.StatusNotFound, constants.NOTFOUND_GETSURVEY)
	}

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, constants.GET_ADDNOTES)
	}

	survey.Notes = notes

	surveyUpdated, err := SurveyRepo.UpdateSurvey(surveyCode, survey)

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, constants.UPDATE_ADDNOTES)
	}

	return c.JSON(http.StatusOK, surveyUpdated)
}

func hashAndSaltUser(notes []entities.Note) []entities.Note {
	var result []entities.Note

	for _, note := range notes {
		hash := sha256.Sum256([]byte(note.User))
		hashSlice := hash[:]
		hashToString := hex.EncodeToString(hashSlice)
		note.User = hashToString
		result = append(result, note)
	}

	return result
}

// @Summary Survey result
// @Description returns the result survey
// @Tags Surveys
// @Accept json
// @Produce json
// @Param teamName path string true "Team name"
// @Success 200 {object} dto.Result
// @Failure 500 {object} dto.Error
// @Router /survey/result/:teamName [get]
func GetResultSurvey(c echo.Context) error {
	teamName := c.Param("teamName")
	lastSurvey, err := SurveyRepo.GetLastSurvey(teamName)

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, constants.GETLASTSURVEY_GETRESULTSURVEY)
	}

	team, err := TeamRepo.GetTeam(lastSurvey.TeamName)

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, constants.GETTEAM_GETRESULTSURVEY)
	}

	return c.JSON(http.StatusOK, mapResult(team, lastSurvey))
}

// @Summary Survey resultByQuestions
// @Description returns the result survey grouped by users
// @Tags Surveys
// @Accept json
// @Produce json
// @Param teamName path string true "Team name"
// @Success 200 {object} []dto.ResultByQuestions
// @Failure 500 {object} dto.Error
// @Router /resultByQuestions/:teamName [get]
func GetHistoricSurveysByQuestions(c echo.Context) error {
	teamName := c.Param("teamName")
	lastSurvey, err := SurveyRepo.GetLastSurvey(teamName)

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, constants.GETLASTSURVEY_GETHISTORICSURVEYSBYQUESTIONS)
	}

	notes, err := SurveyRepo.GetNotesGroupByQuestions(lastSurvey.Code)

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, constants.NOTESBYQUESTIONS_GETHISTORICSURVEYSBYQUESTIONS)
	}

	result, err := mapQuestionNotes(notes, lastSurvey.Code)

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, constants.QUESTIONNOTES_GETHISTORICSURVEYSBYQUESTIONS)
	}

	return c.JSON(http.StatusOK, result)
}

func mapQuestionNotes(notes []*dto.ResultByQuestions, surveyCode string) ([]*dto.ResultByQuestions, error) {
	var result []*dto.ResultByQuestions
	for _, note := range notes {
		notes, err := SurveyRepo.GetNotesBySurveyAndQuestion(note.QuestionNumber, surveyCode)

		if err != nil {
			return nil, err
		}

		result = append(result, &dto.ResultByQuestions{
			QuestionNumber: note.QuestionNumber,
			Average:        note.Average,
			Notes:          notes,
		})
	}
	return result, nil
}

// @Summary Survey resultByUsers
// @Description returns the result survey grouped by users
// @Tags Surveys
// @Accept json
// @Produce json
// @Param teamName path string true "Team name"
// @Success 200 {object} []dto.ResultByUsers
// @Failure 500 {object} dto.Error
// @Router /resultByUsers/:teamName [get]
func GetHistoricSurveysByusers(c echo.Context) error {
	teamName := c.Param("teamName")
	lastSurvey, err := SurveyRepo.GetLastSurvey(teamName)

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, constants.GETLASTSURVEY_GETHISTORICSURVEYSBYUSERS)
	}

	notes, err := SurveyRepo.GetNotesGroupByUsers(lastSurvey.Code)

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, constants.NOTESBYUSERS_GETHISTORICSURVEYSBYUSERS)
	}

	result, err := mapNotes(notes, lastSurvey.Code)

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, constants.MAPNOTES_GETHISTORICSURVEYSBYUSERS)
	}

	return c.JSON(http.StatusOK, result)
}

func mapNotes(notes []*dto.ResultByUsers, surveyCode string) ([]*dto.ResultByUsers, error) {
	var result []*dto.ResultByUsers
	for i, note := range notes {
		notes, err := SurveyRepo.GetNotesBySurveyAndUser(surveyCode, note.User)
		if err != nil {
			return nil, err
		}
		result = append(result, &dto.ResultByUsers{
			User:    "User " + strconv.Itoa(i+1),
			Average: note.Average,
			Notes:   notes,
		})
	}
	return result, nil
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

// @Summary Survey resultByPeriod
// @Description returns the result survey grouped by Period of startDate and EndDate
// @Tags Surveys
// @Accept json
// @Produce json
// @Param teamName path string true "Team name"
// @Success 200 {object} []dto.HistoricResult
// @Failure 400 {object} dto.Error
// @Failure 500 {object} dto.Error
// @Router /resultBySurveys/:teamName [get]
func GetHistoricSurveys(c echo.Context) error {
	teamName := c.Param("teamName")
	var result []*dto.HistoricResult
	count := 1
	allSurveysTeam, err := SurveyRepo.GetSurveys(teamName)

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, constants.GETLASTSURVEY_GETHISTORICSURVEYS)
	}

	for _, eachSurvey := range allSurveysTeam {
		surveyCode := eachSurvey.Code
		startDate := eachSurvey.StartDate
		endDate := eachSurvey.EndDate
		averageSurvey, err := SurveyRepo.GetHistoricResult(surveyCode)

		if err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, constants.GETLASTSURVEY_GETHISTORICRESULT)
		}
		result = append(result, &dto.HistoricResult{
			StartDate:    startDate,
			EndDate:      endDate,
			TotalAverage: averageSurvey,
		})
		count++
		// max of 5 historic results
		if count > 5 {
			/* terminate the loop using break statement */
			break
		}
	}

	return c.JSON(http.StatusOK, result)
}

// func mapResultHIstoric() *dto.HistoricResult{

// }
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
// @Tags Surveys
// @Produce octet-stream
// @Param startDate query string true "start date"
// @Param endDate query string true "end date"
// @Param teamName query string true "team name"
// @Failure 500 {object} dto.Error
// @Failure 400 {object} dto.Error
// @Router /survey/exportCsv [get]
func ExportSurveysCsv(c echo.Context) (err error) {

	startDate := c.QueryParam("startDate")
	endDate := c.QueryParam("endDate")
	teamName := c.QueryParam("teamName")

	layoutISO := "2006-01-02"
	startDateParsed, _ := time.Parse(layoutISO, startDate)
	endDateParsed, _ := time.Parse(layoutISO, endDate)

	if teamName == "" {
		return echo.NewHTTPError(http.StatusBadRequest, constants.EXPORT_EXPORTSURVEY_EMPTY_FIELD)
	}

	if startDateParsed.IsZero() {
		return echo.NewHTTPError(http.StatusBadRequest, constants.EXPORT_EXPORTSURVEY_EMPTY_FIELD)
	}

	if endDateParsed.IsZero() {
		return echo.NewHTTPError(http.StatusBadRequest, constants.EXPORT_EXPORTSURVEY_EMPTY_FIELD)
	}

	if endDateParsed.Before(startDateParsed) {
		return echo.NewHTTPError(http.StatusBadRequest, constants.EXPORT_EXPORTSURVEY_DATE_ERROR)
	}

	var headerCsv = []string{"StartDate", "EndDate", "Q.Number", "User", "Note", "Code", "TeamName"}

	surveys, err := SurveyRepo.GetSurviesByPeriodAndTeamName(startDate, endDate, teamName)

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, constants.GETSURVEYS_EXPORTSURVEYSCSV)
	}

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
		count := 1
		surveyCode := survey.Code
		hashFirstUser := survey.Notes[0].User

		for _, note := range survey.Notes {
			hashUser := note.User
			if hashUser == hashFirstUser {
				normalizedUser := "User" + strconv.Itoa(count)
				line := []string{surveyStartDate, surveyEndDate, strconv.Itoa(note.Number), normalizedUser, fmt.Sprintf("%g", note.Note), surveyCode, surveyTeamName}
				if err = w.Write(line); err != nil {
					return
				}
				// w.Flush()
			} else {
				count++
				hashFirstUser = note.User
				normalizedUser := "User" + strconv.Itoa(count)
				line := []string{surveyStartDate, surveyEndDate, strconv.Itoa(note.Number), normalizedUser, fmt.Sprintf("%g", note.Note), surveyCode, surveyTeamName}
				if err = w.Write(line); err != nil {
					return
				}
				// w.Flush()
			}
			w.Flush()
		}

	}

	return
}
