package services

import (
	"encoding/json"
	"net/http"

	"github.com/dgrijalva/jwt-go"
	"github.com/jinzhu/gorm"

	"capgemini.com/gorn/team-spirit/constants"
	"capgemini.com/gorn/team-spirit/dto"
	"capgemini.com/gorn/team-spirit/entities"
	"capgemini.com/gorn/team-spirit/repositories"
	"github.com/labstack/echo/v4"
	_ "github.com/mattn/go-sqlite3"
)

var (
	TeamRepo repositories.TeamRepository = repositories.NewTeamRepository()
)

// @Summary Get all teams
// @Description returns all teams
// @Tags Teams
// @Accept json
// @Produce json
// @Success 200 {object} []entities.Team
// @Failure 500 {object} dto.Error
// @Router /teams [Get]
func GetTeams(c echo.Context) error {

	teams, err := TeamRepo.GetTeams()

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, constants.GETS_GETTEAMS)
	}

	return c.JSON(http.StatusOK, teams)
}

// @Summary Get one team
// @Description returns one team by teamName
// @Tags Teams
// @Accept json
// @Produce json
// @Param teamName path string true "Team name"
// @Success 200 {object} entities.Team
// @Failure 500 {object} dto.Error
// @Failure 404 {object} dto.Error
// @Router /team/:teamName [Get]
func GetTeam(c echo.Context) error {

	teamName := c.Param("teamName")
	team, err := TeamRepo.GetTeam(teamName)

	if gorm.IsRecordNotFoundError(err) {
		return echo.NewHTTPError(http.StatusNotFound, constants.NOTFOUND_GETTEAM)
	}

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, constants.GET_GETTEAM)
	}

	return c.JSON(http.StatusOK, team)
}

// @Summary Create a new team
// @Description returns a team created
// @Tags Teams
// @Accept json
// @Produce json
// @Param TeamDTO body entities.Team true "TeamDTO"
// @Success 200 {object} entities.Team
// @Failure 500 {object} dto.Error
// @Failure 400 {object} dto.Error
// @Router /team/create [post]
func CreateTeam(c echo.Context) error {

	var newTeam = &entities.Team{}
	json.NewDecoder(c.Request().Body).Decode(&newTeam)
	err := CheckUserAuthority(c)

	if err != nil {
		return echo.NewHTTPError(http.StatusUnauthorized, constants.UNATHORIZED_USER_CREATETEAM)
	}

	if newTeam.Name == "" || newTeam.Num_mumbers <= 0 || newTeam.StartDate.IsZero() || newTeam.Frequency <= 0 {
		return echo.NewHTTPError(http.StatusBadRequest, constants.CANNOT_BE_EMPTY_CREATETEAM)
	}

	err = TeamRepo.UpdateSuperUser(newTeam)
	team, err := TeamRepo.CreateTeam(newTeam)

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, constants.CREATE_CREATETEAM)
	}

	GetNewSurvey(team)

	return c.JSON(http.StatusOK, team)
}

// @Summary Update a team
// @Description returns a team updated
// @Tags Teams
// @Accept json
// @Produce json
// @Param teamName path string true "Team name"
// @Param TeamDTO body entities.Team true "TeamDTO"
// @Success 200 {object} entities.Team
// @Failure 500 {object} dto.Error
// @Failure 400 {object} dto.Error
// @Router /team/:teamName [put]
func UpdateTeam(c echo.Context) error {

	teamName := c.Param("teamName")
	var updatedTeam = &entities.Team{}
	json.NewDecoder(c.Request().Body).Decode(&updatedTeam)

	if updatedTeam.Name == "" || updatedTeam.Num_mumbers <= 0 || updatedTeam.StartDate.IsZero() || updatedTeam.Frequency <= 0 {
		return echo.NewHTTPError(http.StatusBadRequest, constants.CANNOT_BE_EMPTY_UPDATETEAM)
	}

	team, err := TeamRepo.UpdateTeam(teamName, updatedTeam)

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, constants.UPDATE_UPDATETEAM)
	}

	return c.JSON(http.StatusOK, team)
}

// @Summary Update a team
// @Description returns a team updated
// @Tags Teams
// @Accept json
// @Produce json
// @Param teamName path string true "Team name"
// @Success 200 {object} entities.Team
// @Failure 500 {object} dto.Error
// @Router /team/:teamName [delete]
func DeleteTeam(c echo.Context) error {

	teamName := c.Param("teamName")
	err := CheckUserAuthority(c)

	if err != nil {
		return echo.NewHTTPError(http.StatusUnauthorized, constants.UNATHORIZED_USER_DELETETEAM)
	}

	team, err := TeamRepo.DeleteTeam(teamName)

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, constants.DELETE_DELETETEAM)
	}

	return c.JSON(http.StatusOK, team)
}

func CheckUserAuthority(c echo.Context) error {
	token := c.Get("user").(*jwt.Token)
	claims := token.Claims.(*dto.JwtCustomClaims)
	currentUser, err := AuthRepo.GetUserByEmail(claims.Email)

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, constants.GETUSERBYEMAIL_CURRENTUSER)
	}
	roleId := currentUser.RoleID
	if roleId != 2 {
		return nil
	}
	return echo.NewHTTPError(http.StatusUnauthorized, constants.UNATHORIZED_USER_CREATETEAM)
}
