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
	UserRepo repositories.UserRepository = repositories.NewUserRepository()
)

func GetUsers(c echo.Context) error {

	users, _ := UserRepo.GetUsers()
	return c.JSON(http.StatusOK, users)
}

func GetUser(c echo.Context) error {

	userID, _ := strconv.Atoi(c.Param("id"))
	user, _ := UserRepo.GetUser(userID)
	return c.JSON(http.StatusOK, user)
}

func CreateUser(c echo.Context) error {

	var newUser = &entities.User{}
	json.NewDecoder(c.Request().Body).Decode(&newUser)

	user, _ := UserRepo.CreateUser(newUser)
	return c.JSON(http.StatusOK, user)
}

func UpdateUser(c echo.Context) error {

	userID, _ := strconv.Atoi(c.Param("id"))
	var updatedUser = &entities.User{}
	json.NewDecoder(c.Request().Body).Decode(&updatedUser)

	user, _ := UserRepo.UpdateUser(userID, updatedUser)
	return c.JSON(http.StatusOK, user)
}

func DeleteUser(c echo.Context) error {

	userID, _ := strconv.Atoi(c.Param("id"))
	user, _ := UserRepo.DeleteUser(userID)
	return c.JSON(http.StatusOK, user)
}
