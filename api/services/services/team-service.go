package services

import (
	"encoding/json"
	"net/http"

	"github.com/callicoder/packer/entities"
	"github.com/callicoder/packer/repositories"
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
// @Param Name body entities.Team true "String"
// @Param Num_members body entities.Team true "int"
// @Param Frequency body entities.Team true "int"
// @Param StartDate body entities.Team true "Date"
// @Success 200 {object} entities.Team
// @Router /teams [Get]
func GetTeams(c echo.Context) error {

	teams, _ := TeamRepo.GetTeams()
	return c.JSON(http.StatusOK, teams)
}

// @Summary Get one team
// @Description returns one team by teamName
// @Tags Teams
// @Accept json
// @Produce json
// @Success 200 {object} entities.Team
// @Router /team/:teamName [Get]
func GetTeam(c echo.Context) error {

	teamName := c.Param("teamName")
	team, _ := TeamRepo.GetTeam(teamName)
	return c.JSON(http.StatusOK, team)
}

// @Summary Create a new team
// @Description returns a team created
// @Tags Teams
// @Accept json
// @Produce json
// @Param Name body entities.Team true "String"
// @Param Num_members body entities.Team true "int"
// @Param Frequency body entities.Team true "int"
// @Param StartDate body entities.Team true "Date"
// @Success 200 {object} entities.Team
// @Router /team/create [post]
func CreateTeam(c echo.Context) error {

	var newTeam = &entities.Team{}
	json.NewDecoder(c.Request().Body).Decode(&newTeam)

	team, _ := TeamRepo.CreateTeam(newTeam)
	return c.JSON(http.StatusOK, team)
}

// @Summary Update a team
// @Description returns a team updated
// @Tags Teams
// @Accept json
// @Produce json
// @Param Name body entities.Team true "String"
// @Param Num_members body entities.Team true "int"
// @Param Frequency body entities.Team true "int"
// @Param StartDate body entities.Team true "Date"
// @Success 200 {object} entities.Team
// @Router /team/:teamName [put]
func UpdateTeam(c echo.Context) error {

	teamName := c.Param("teamName")
	var updatedTeam = &entities.Team{}
	json.NewDecoder(c.Request().Body).Decode(&updatedTeam)

	team, _ := TeamRepo.UpdateTeam(teamName, updatedTeam)
	return c.JSON(http.StatusOK, team)
}

// @Summary Update a team
// @Description returns a team updated
// @Tags Teams
// @Accept json
// @Produce json
// @Success 200 {object} entities.Team
// @Router /team/:teamName [delete]
func DeleteTeam(c echo.Context) error {

	teamName := c.Param("teamName")
	team, _ := TeamRepo.DeleteTeam(teamName)
	return c.JSON(http.StatusOK, team)
}
