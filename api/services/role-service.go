package services

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/callicoder/packer/entities"
	"github.com/callicoder/packer/repositories"
	"github.com/labstack/echo/v4"
	_ "github.com/mattn/go-sqlite3"
)

var (
	RoleRepo repositories.RoleRepository = repositories.NewRoleRepository()
)

func GetRoles(c echo.Context) error {

	roles, _ := RoleRepo.GetRoles()
	return c.JSON(http.StatusOK, roles)
}

func GetRole(c echo.Context) error {

	roleID, _ := strconv.Atoi(c.Param("id"))
	role, _ := RoleRepo.GetRole(roleID)
	return c.JSON(http.StatusOK, role)
}

func CreateRole(c echo.Context) error {

	var newRole = &entities.Role{}
	json.NewDecoder(c.Request().Body).Decode(&newRole)

	role, _ := RoleRepo.CreateRole(newRole)
	return c.JSON(http.StatusOK, role)
}

func UpdateRole(c echo.Context) error {

	roleID, _ := strconv.Atoi(c.Param("id"))
	var updatedRole = &entities.Role{}
	json.NewDecoder(c.Request().Body).Decode(&updatedRole)

	role, _ := RoleRepo.UpdateRole(roleID, updatedRole)
	return c.JSON(http.StatusOK, role)
}

func DeleteRole(c echo.Context) error {

	roleID, _ := strconv.Atoi(c.Param("id"))
	role, _ := RoleRepo.DeleteRole(roleID)
	return c.JSON(http.StatusOK, role)
}
