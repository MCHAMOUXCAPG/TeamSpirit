package services

import (
	"encoding/json"
	"net/http"
	"strconv"

	"capgemini.com/gorn/team-spirit/constants"
	"capgemini.com/gorn/team-spirit/entities"
	"capgemini.com/gorn/team-spirit/repositories"
	"github.com/jinzhu/gorm"
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
// @Failure 500 {object} dto.Error
// @Router /roles [Get]
func GetRoles(c echo.Context) error {

	roles, err := RoleRepo.GetRoles()

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, constants.GETS_GETROLES)
	}

	return c.JSON(http.StatusOK, roles)
}

// @Summary Get one role
// @Description returns one role by id
// @Tags Roles
// @Accept json
// @Produce json
// @Param id path string true "id"
// @Success 200 {object} entities.Role
// @Failure 500 {object} dto.Error
// @Failure 404 {object} dto.Error
// @Router /role/:id [Get]
func GetRole(c echo.Context) error {

	roleID, err := strconv.Atoi(c.Param("id"))

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, constants.CONVERTPARAM_GETROLE)
	}

	role, err := RoleRepo.GetRole(roleID)

	if gorm.IsRecordNotFoundError(err) {
		return echo.NewHTTPError(http.StatusNotFound, constants.NOTFOUND_GETROLE)
	}

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, constants.GET_GETROLE)
	}

	return c.JSON(http.StatusOK, role)
}

// @Summary Create a new role
// @Description returns the role created
// @Tags Roles
// @Accept json
// @Produce json
// @Param RoleDTO body entities.Role true "RoleDTO"
// @Success 200 {object} entities.Role
// @Failure 500 {object} dto.Error
// @Failure 400 {object} dto.Error
// @Router /role/create [post]
func CreateRole(c echo.Context) error {

	var newRole = &entities.Role{}

	err := CheckUserAuthority(c)

	if err != nil {
		return echo.NewHTTPError(http.StatusUnauthorized, constants.UNATHORIZED_CREATE_CREATEROLE)
	}

	json.NewDecoder(c.Request().Body).Decode(&newRole)

	if newRole.Name == "" {
		return echo.NewHTTPError(http.StatusBadRequest, constants.CREATE_CREATEROLE_NAME_EMPTY)
	}

	role, err := RoleRepo.CreateRole(newRole)

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, constants.CREATE_CREATEROLE)
	}
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
// @Failure 500 {object} dto.Error
// @Failure 400 {object} dto.Error
// @Router /role/:id [put]
func UpdateRole(c echo.Context) error {

	err := CheckUserAuthority(c)

	if err != nil {
		return echo.NewHTTPError(http.StatusUnauthorized, constants.UNATHORIZED_UPDATE_UPDATEROLE)
	}

	roleID, err := strconv.Atoi(c.Param("id"))

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, constants.CONVERTPARAM_UPDATEROLE)
	}

	var updatedRole = &entities.Role{}
	json.NewDecoder(c.Request().Body).Decode(&updatedRole)

	if updatedRole.Name == "" {
		return echo.NewHTTPError(http.StatusBadRequest, constants.CREATE_UPDATEROLE_NAME_EMPTY)
	}

	role, err := RoleRepo.UpdateRole(roleID, updatedRole)

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, constants.UPDATE_UPDATEROLE)
	}

	return c.JSON(http.StatusOK, role)
}

// @Summary Delete a role
// @Description returns a empty role
// @Tags Roles
// @Accept json
// @Produce json
// @Param id path string true "id"
// @Success 200 {object} entities.Role
// @Failure 401 {object} dto.Error
// @Failure 500 {object} dto.Error
// @Router /role/:id [delete]
func DeleteRole(c echo.Context) error {

	err := CheckUserAuthority(c)

	if err != nil {
		return echo.NewHTTPError(http.StatusUnauthorized, constants.UNATHORIZED_DELETE_DELETEROLE)
	}

	roleID, err := strconv.Atoi(c.Param("id"))

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, constants.CONVERTPARAM_DELETEROLE)
	}

	role, err := RoleRepo.DeleteRole(roleID)

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, constants.DELETE_DELETEROLE)
	}

	return c.JSON(http.StatusOK, role)
}

func VerifyRole() {
	var newRoleAdmin = &entities.Role{Name: "Admin"}
	var newRoleTeamLeader = &entities.Role{Name: "TeamLeader"}
	var newRoleSuperAdmin = &entities.Role{Name: "PWBRDAPI"}

	_, errAdmin := RoleRepo.GetRoleByName("Admin")

	if errAdmin != nil && !gorm.IsRecordNotFoundError(errAdmin) {
		panic("Error adding Admin role")
	}

	_, errTeamleader := RoleRepo.GetRoleByName("TeamLeader")

	if errTeamleader != nil && !gorm.IsRecordNotFoundError(errTeamleader) {
		panic("Error adding TeamLeader role")
	}

	_, errSuperAdmin := RoleRepo.GetRoleByName("PWBRDAPI")

	if errSuperAdmin != nil && !gorm.IsRecordNotFoundError(errSuperAdmin) {
		panic("Error adding Admin role")
	}

	if gorm.IsRecordNotFoundError(errAdmin) {
		_, err := RoleRepo.CreateRole(newRoleAdmin)
		if err != nil {
			panic("Error creating Admin role")
		}
	}
	if gorm.IsRecordNotFoundError(errTeamleader) {
		_, err := RoleRepo.CreateRole(newRoleTeamLeader)
		if err != nil {
			panic("Error creating TeamLeader role")
		}
	}

	if gorm.IsRecordNotFoundError(errSuperAdmin) {
		_, err := RoleRepo.CreateRole(newRoleSuperAdmin)
		if err != nil {
			panic("Error creating SuperAdmin role")
		}
	}
}
