package tests

import (
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"strconv"
	"strings"
	"testing"

	"github.com/callicoder/packer/entities"
	"github.com/callicoder/packer/repositories"
	"github.com/callicoder/packer/services"
	"github.com/labstack/echo/v4"
	"github.com/stretchr/testify/assert"
)

var (
	UserRepo repositories.UserRepository = repositories.NewUserRepository()
)

func TestGetUsers(t *testing.T) {

	// Post 2 users in the mock database
	user1, _ := UserRepo.CreateUser(&entities.User{Full_name: "User1", Email: "user1@gmail.com"})
	user2, _ := UserRepo.CreateUser(&entities.User{Full_name: "User2", Email: "user2@gmail.com"})
	assert.Equal(t, user1.Full_name, "User1")
	assert.Equal(t, user2.Full_name, "User2")

	// Create a new Request
	e := echo.New()
	req := httptest.NewRequest(http.MethodGet, "/users", nil)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)

	// Execute a function and assertions
	if assert.NoError(t, services.GetUsers(c)) {
		var users []*entities.User
		json.NewDecoder(rec.Body).Decode(&users)
		assert.Equal(t, http.StatusOK, rec.Code)
		assert.Equal(t, len(users), 2)
	}

	// clean databse
	UserRepo.DeleteUser(user1.Id)
	UserRepo.DeleteUser(user2.Id)
}

func TestGetUser(t *testing.T) {

	// Post a user in the mock database
	user1, _ := UserRepo.CreateUser(&entities.User{Full_name: "User1", Email: "user1@gmail.com"})
	assert.Equal(t, user1.Full_name, "User1")
	// Create a new Request
	e := echo.New()
	req := httptest.NewRequest(http.MethodGet, "/", nil)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	c.SetPath("/user/:id")
	c.SetParamNames("id")
	c.SetParamValues(strconv.Itoa(user1.Id))

	// Execute function and Assertions
	if assert.NoError(t, services.GetUser(c)) {
		var user entities.User
		json.NewDecoder(io.Reader(rec.Body)).Decode(&user)
		assert.Equal(t, http.StatusOK, rec.Code)
		assert.Equal(t, user1.Full_name, user.Full_name)
	}

	// clean databse
	UserRepo.DeleteUser(user1.Id)
}

func TestCreateUser(t *testing.T) {

	// Create a new Request
	var user entities.User
	userJSON := `{"Full_name":"User1", "Email": "user1@gmail.com"}`
	e := echo.New()
	req := httptest.NewRequest(http.MethodPost, "/user/create", strings.NewReader(userJSON))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)

	// Assertions
	if assert.NoError(t, services.CreateUser(c)) {
		json.NewDecoder(io.Reader(rec.Body)).Decode(&user)
		assert.Equal(t, http.StatusOK, rec.Code)
		assert.Equal(t, user.Full_name, "User1")
	}

	UserRepo.DeleteUser(user.Id)
}

func TestUpdateUser(t *testing.T) {

	// Post a new user
	user1, _ := UserRepo.CreateUser(&entities.User{Full_name: "User1", Email: "user1@gmail.com"})
	assert.Equal(t, user1.Full_name, "User1")

	// Create a new Request
	var user entities.User
	userJSON := `{"Full_name":"User2", "Email": "user1@gmail.com"}`
	e := echo.New()
	req := httptest.NewRequest(http.MethodPut, "/", strings.NewReader(userJSON))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	c.SetPath("/user/:id")
	c.SetParamNames("id")
	c.SetParamValues(strconv.Itoa(user1.Id))

	// Assertions
	if assert.NoError(t, services.UpdateUser(c)) {
		json.NewDecoder(io.Reader(rec.Body)).Decode(&user)
		assert.Equal(t, http.StatusOK, rec.Code)
		assert.Equal(t, user.Full_name, "User2")
	}

	UserRepo.DeleteUser(user1.Id)
}

func TestDeleteUser(t *testing.T) {

	// Post a new user
	user1, _ := UserRepo.CreateUser(&entities.User{Full_name: "User1", Email: "user1@gmail.com"})
	assert.Equal(t, user1.Full_name, "User1")

	// Create a new Request
	var user entities.User
	e := echo.New()
	req := httptest.NewRequest(http.MethodDelete, "/", nil)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	c.SetPath("/user/:id")
	c.SetParamNames("id")
	c.SetParamValues(strconv.Itoa(user1.Id))

	// Assertions
	if assert.NoError(t, services.DeleteUser(c)) {
		json.NewDecoder(io.Reader(rec.Body)).Decode(&user)
		assert.Equal(t, http.StatusOK, rec.Code)
		assert.Equal(t, user.Id, 0)
	}
}
