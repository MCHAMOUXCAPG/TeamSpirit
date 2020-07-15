package services

import (
	"encoding/json"
	"net/http"

	"github.com/jinzhu/gorm"

	"capgemini.com/gorn/team-spirit/constants"
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
// @Param TeamDTO body dto.TeamDTO true "TeamDTO"
// @Success 200 {object} entities.Team
// @Failure 500 {object} dto.Error
// @Router /team/create [post]
func CreateTeam(c echo.Context) error {

	var newTeam = &entities.Team{}
	json.NewDecoder(c.Request().Body).Decode(&newTeam)

	team, err := TeamRepo.CreateTeam(newTeam)

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, constants.CREATE_CREATETEAM)
	}

	return c.JSON(http.StatusOK, team)
}

// @Summary Update a team
// @Description returns a team updated
// @Tags Teams
// @Accept json
// @Produce json
// @Param teamName path string true "Team name"
// @Param TeamDTO body dto.TeamDTO true "TeamDTO"
// @Success 200 {object} entities.Team
// @Failure 500 {object} dto.Error
// @Router /team/:teamName [put]
func UpdateTeam(c echo.Context) error {

	teamName := c.Param("teamName")
	var updatedTeam = &entities.Team{}
	json.NewDecoder(c.Request().Body).Decode(&updatedTeam)

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
	team, err := TeamRepo.DeleteTeam(teamName)

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, constants.DELETE_DELETETEAM)
	}

	return c.JSON(http.StatusOK, team)
}
