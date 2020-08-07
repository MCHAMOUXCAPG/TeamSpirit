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
	UserRepo repositories.UserRepository = repositories.NewUserRepository()
)

// @Summary Get all users
// @Description returns all users
// @Tags Users
// @Accept json
// @Produce json
// @Success 200 {object} []entities.User
// @Failure 500 {object} dto.Error
// @Router /users [Get]
func GetUsers(c echo.Context) error {

	err := CheckUserAuthority(c)

	if err != nil {
		return echo.NewHTTPError(http.StatusUnauthorized, constants.UNATHORIZED_USER_GETEUSER)
	}

	users, err := UserRepo.GetUsers()

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, constants.GETS_GETUSERS)
	}

	return c.JSON(http.StatusOK, users)
}

// @Summary Get one users
// @Description returns one
// @Tags Users
// @Accept json
// @Produce json
// @Param id path string true "id"
// @Success 200 {object} entities.User
// @Failure 404 {object} dto.Error
// @Failure 500 {object} dto.Error
// @Router /user/:id [Get]
func GetUser(c echo.Context) error {

	err := CheckUserAuthority(c)

	if err != nil {
		return echo.NewHTTPError(http.StatusUnauthorized, constants.UNATHORIZED_USER_GETEUSER)
	}

	userID, err := strconv.Atoi(c.Param("id"))

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, constants.CONVERTPARAM_GETUSER)
	}

	user, err := UserRepo.GetUser(userID)

	if gorm.IsRecordNotFoundError(err) {
		return echo.NewHTTPError(http.StatusNotFound, constants.NOTFOUND_GETUSER)
	}

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, constants.GET_GETUSER)
	}

	return c.JSON(http.StatusOK, user)
}

// @Summary Create a new user
// @Description returns the user created
// @Tags Users
// @Accept json
// @Produce json
// @Param UserDTO body entities.User  true "UserDTO"
// @Success 200 {object} entities.User
// @Failure 500 {object} dto.Error
// @Failure 406 {object} dto.Error
// @Failure 400 {object} dto.Error
// @Failure 401 {object} dto.Error
// @Router /user/create [post]
func CreateUser(c echo.Context) error {

	var newUser = &entities.User{}
	err := CheckUserAuthority(c)

	if err != nil {
		return echo.NewHTTPError(http.StatusUnauthorized, constants.UNATHORIZED_USER_CREATEUSER)
	}
	json.NewDecoder(c.Request().Body).Decode(&newUser)

	if newUser.Full_name == "" || newUser.Email == "" || newUser.Password == "" {
		return echo.NewHTTPError(http.StatusBadRequest, constants.CANNOT_BE_EMPTY_CREATEUSER)
	}

	if newUser.Role.Name == "TeamLeader" && (newUser.Teams == nil || len(newUser.Teams) == 0) {
		return echo.NewHTTPError(http.StatusNotAcceptable, constants.VERIFY_ROLE)
	}

	if newUser.Password != "" {
		newUser.Password, _ = HashAndSalt(newUser.Password)
	}

	UserRepo.UpdateSuperUser(newUser)

	user, err := UserRepo.CreateUser(newUser)

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, constants.CREATE_CREATEUSER)
	}

	return c.JSON(http.StatusOK, user)
}

// @Summary Update a new user
// @Description returns the user updated
// @Tags Users
// @Accept json
// @Produce json
// @Param id path string true "id"
// @Param UserDTO body entities.User true "UserDTO"
// @Success 200 {object} entities.User
// @Failure 500 {object} dto.Error
// @Failure 400 {object} dto.Error
// @Router /user/:id [put]
func UpdateUser(c echo.Context) error {

	err := CheckUserAuthority(c)

	if err != nil {
		return echo.NewHTTPError(http.StatusUnauthorized, constants.UNATHORIZED_USER_UPDATEUSER)
	}

	userID, err := strconv.Atoi(c.Param("id"))

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, constants.CONVERTPARAM_UPDATEUSER)
	}

	var updatedUser = &entities.User{}
	json.NewDecoder(c.Request().Body).Decode(&updatedUser)
	updatedUser.Id = userID

	if updatedUser.Full_name == "" || updatedUser.Email == "" || updatedUser.Password == "" {
		return echo.NewHTTPError(http.StatusBadRequest, constants.CANNOT_BE_EMPTY_UPDATEUSER)
	}

	if updatedUser.Password != "" {
		updatedUser.Password, err = updateHashPassword(userID, updatedUser.Password)

		if err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, constants.HASHPASSWORD_UPDATEUSER)
		}
	}
	UserRepo.UpdateSuperUser(updatedUser)

	user, err := UserRepo.UpdateUser(userID, updatedUser)

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, constants.UPDATE_UPDATEUSER)
	}

	return c.JSON(http.StatusOK, user)
}

// @Summary Delete a user
// @Description returns a empty user
// @Tags Users
// @Accept json
// @Produce json
// @Param id path string true "id"
// @Success 200 {object} entities.User
// @Failure 401 {object} dto.Error
// @Failure 500 {object} dto.Error
// @Router /user/:id [delete]
func DeleteUser(c echo.Context) error {

	err := CheckUserAuthority(c)

	if err != nil {
		return echo.NewHTTPError(http.StatusUnauthorized, constants.UNATHORIZED_USER_DELETEUSER)
	}

	userID, err := strconv.Atoi(c.Param("id"))

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, constants.CONVERTPARAM_DELETEUSER)
	}

	_, err = UserRepo.DeleteUser(userID)

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, constants.DELETE_DELETEUSER)
	}

	return c.JSON(http.StatusOK, err)
}

func updateHashPassword(userID int, password string) (string, error) {
	user, err := UserRepo.GetUser(userID)

	if err != nil {
		return "", err
	}

	if user.Password == password {
		return password, nil
	}

	return HashAndSalt(password)
}

func CreateDefaultAdmin() {

	var newUser = &entities.User{Full_name: "DefaultAdmin", Email: "adminTeamSpirit@capgemini.com", Password: "TeamSpiritAdmin!", RoleID: 1}
	var adminPowerBoard = &entities.User{Full_name: "PowerBoardAPI", Email: "superAdminTeamSpirit@capgemini.com", Password: "TeamSpiritSuperAdmin!", RoleID: 3}

	_, errAdmin := UserRepo.GetUserByAdminRole()

	if errAdmin != nil && !gorm.IsRecordNotFoundError(errAdmin) {
		panic("Error adding default Admin")
	}

	if gorm.IsRecordNotFoundError(errAdmin) {
		newUser.Password, _ = HashAndSalt(newUser.Password)
		_, errAddAdmin := UserRepo.CreateUser(newUser)
		if errAddAdmin != nil {
			panic("Error creating default Admin")
		}
	}

	_, errSuperAdmin := UserRepo.GetUserBySuperAdminRole()

	if errSuperAdmin != nil && !gorm.IsRecordNotFoundError(errSuperAdmin) {
		panic("Error adding default Admin")
	}

	if gorm.IsRecordNotFoundError(errSuperAdmin) {
		adminPowerBoard.Password, _ = HashAndSalt(adminPowerBoard.Password)
		_, errAddSuperAdmin := UserRepo.CreateUser(adminPowerBoard)
		if errAddSuperAdmin != nil {
			panic("Error creating default SuperAdmin")
		}
	}

}
