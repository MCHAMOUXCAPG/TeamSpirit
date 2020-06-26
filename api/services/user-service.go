package services

import (
	"encoding/json"
	"net/http"
	"strconv"

	"campgemini.com/gorn/team-spirit/entities"
	"campgemini.com/gorn/team-spirit/repositories"
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
// @Success 200 {object} entities.User
// @Router /users [Get]
func GetUsers(c echo.Context) error {

	users, _ := UserRepo.GetUsers()
	return c.JSON(http.StatusOK, users)
}

// @Summary Get one users
// @Description returns one
// @Tags Users
// @Accept json
// @Produce json
// @Success 200 {object} entities.User
// @Router /user/:id [Get]
func GetUser(c echo.Context) error {

	userID, _ := strconv.Atoi(c.Param("id"))
	user, _ := UserRepo.GetUser(userID)
	return c.JSON(http.StatusOK, user)
}

// @Summary Create a new user
// @Description returns the user created
// @Tags Users
// @Accept json
// @Produce json
// @Param Full_name body entities.User true "String"
// @Param Email body entities.User true "String"
// @Param Password body entities.User true "String"
// @Success 200 {object} entities.User
// @Router /user/create [post]
func CreateUser(c echo.Context) error {

	var newUser = &entities.User{}
	json.NewDecoder(c.Request().Body).Decode(&newUser)

	user, _ := UserRepo.CreateUser(newUser)
	return c.JSON(http.StatusOK, user)
}

// @Summary Update a new user
// @Description returns the user updated
// @Tags Users
// @Accept json
// @Produce json
// @Param Full_name body entities.User true "String"
// @Param Email body entities.User true "String"
// @Param Password body entities.User true "String"
// @Success 200 {object} entities.User
// @Router /user/:id [put]
func UpdateUser(c echo.Context) error {

	userID, _ := strconv.Atoi(c.Param("id"))
	var updatedUser = &entities.User{}
	json.NewDecoder(c.Request().Body).Decode(&updatedUser)

	user, _ := UserRepo.UpdateUser(userID, updatedUser)
	return c.JSON(http.StatusOK, user)
}

// @Summary Delete a user
// @Description returns a empty user
// @Tags Users
// @Accept json
// @Produce json
// @Success 200 {object} entities.User
// @Router /user/:id [delete]
func DeleteUser(c echo.Context) error {

	userID, _ := strconv.Atoi(c.Param("id"))
	user, _ := UserRepo.DeleteUser(userID)
	return c.JSON(http.StatusOK, user)
}
