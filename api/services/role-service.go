package services

import (
	"encoding/json"
	"net/http"
	"strconv"

	"capgemini.com/gorn/team-spirit/entities"
	"capgemini.com/gorn/team-spirit/repositories"
	"github.com/labstack/echo/v4"
	_ "github.com/mattn/go-sqlite3"
)

var (
	RoleRepo repositories.RoleRepository = repositories.NewRoleRepository()
)

// @Summary Get all roles
// @Description returns all roles
// @Tags Roles
// @Accept json
// @Produce json
// @Success 200 {object} []entities.Role
// @Router /roles [Get]
func GetRoles(c echo.Context) error {

	roles, _ := RoleRepo.GetRoles()
	return c.JSON(http.StatusOK, roles)
}

// @Summary Get one role
// @Description returns one role by id
// @Tags Roles
// @Accept json
// @Produce json
// @Param id path string true "id"
// @Success 200 {object} entities.Role
// @Router /role/:id [Get]
func GetRole(c echo.Context) error {

	roleID, _ := strconv.Atoi(c.Param("id"))
	role, _ := RoleRepo.GetRole(roleID)
	return c.JSON(http.StatusOK, role)
}

// @Summary Create a new role
// @Description returns the role created
// @Tags Roles
// @Accept json
// @Produce json
// @Param RoleDTO body entities.Role true "RoleDTO"
// @Success 200 {object} entities.Role
// @Router /role/create [post]
func CreateRole(c echo.Context) error {

	var newRole = &entities.Role{}
	json.NewDecoder(c.Request().Body).Decode(&newRole)

	role, _ := RoleRepo.CreateRole(newRole)
	return c.JSON(http.StatusOK, role)
}

// @Summary Update a new role
// @Description returns the role updated
// @Tags Roles
// @Accept json
// @Produce json
// @Param id path string true "id"
// @Param RoleDTO body entities.Role true "RoleDTO"
// @Success 200 {object} entities.Role
// @Router /role/:id [put]
func UpdateRole(c echo.Context) error {

	roleID, _ := strconv.Atoi(c.Param("id"))
	var updatedRole = &entities.Role{}
	json.NewDecoder(c.Request().Body).Decode(&updatedRole)

	role, _ := RoleRepo.UpdateRole(roleID, updatedRole)
	return c.JSON(http.StatusOK, role)
}

// @Summary Delete a role
// @Description returns a empty role
// @Tags Roles
// @Accept json
// @Produce json
// @Param id path string true "id"
// @Success 200 {object} entities.Role
// @Router /role/:id [delete]
func DeleteRole(c echo.Context) error {

	roleID, _ := strconv.Atoi(c.Param("id"))
	role, _ := RoleRepo.DeleteRole(roleID)
	return c.JSON(http.StatusOK, role)
}
