package tests

import (
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"strconv"
	"strings"
	"testing"

	"capgemini.com/gorn/team-spirit/dto"
	"capgemini.com/gorn/team-spirit/entities"
	"capgemini.com/gorn/team-spirit/repositories"
	"capgemini.com/gorn/team-spirit/services"
	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo/v4"
	"github.com/stretchr/testify/assert"
)

var (
	RoleRepo repositories.RoleRepository = repositories.NewRoleRepository()
)

func TestGetRoles(t *testing.T) {

	// Post 2 roles in the mock database
	role1, _ := RoleRepo.CreateRole(&entities.Role{Name: "Role1"})
	role2, _ := RoleRepo.CreateRole(&entities.Role{Name: "Role2"})
	assert.Equal(t, role1.Name, "Role1")
	assert.Equal(t, role2.Name, "Role2")

	// Create a new Request
	e := echo.New()
	req := httptest.NewRequest(http.MethodGet, "/roles", nil)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)

	// Execute a function and assertions
	if assert.NoError(t, services.GetRoles(c)) {
		var roles []*entities.Role
		json.NewDecoder(rec.Body).Decode(&roles)
		assert.Equal(t, http.StatusOK, rec.Code)
		assert.Equal(t, len(roles), 2)
	}

	// clean databse
	RoleRepo.DeleteRole(role1.Id)
	RoleRepo.DeleteRole(role2.Id)
}

func TestGetRole(t *testing.T) {

	// Post a role in the mock database
	role1, _ := RoleRepo.CreateRole(&entities.Role{Name: "Role1"})
	assert.Equal(t, role1.Name, "Role1")

	// Create a new Request
	e := echo.New()
	req := httptest.NewRequest(http.MethodGet, "/", nil)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	c.SetPath("/role/:id")
	c.SetParamNames("id")
	c.SetParamValues(strconv.Itoa(role1.Id))

	// Execute function and Assertions
	if assert.NoError(t, services.GetRole(c)) {
		var role entities.Role
		json.NewDecoder(io.Reader(rec.Body)).Decode(&role)
		assert.Equal(t, http.StatusOK, rec.Code)
		assert.Equal(t, role1.Name, role.Name)
	}

	// clean databse
	RoleRepo.DeleteRole(role1.Id)
}

func TestCreateRole(t *testing.T) {

	createdUser, _ := UserRepo.CreateUser(&entities.User{Id: 1, Email: "user1@gmail.com", Full_name: "user1", Password: "pwd1", RoleID: 1})
	assert.Equal(t, createdUser.Id, 1)

	var role entities.Role
	roleJSON := `{"Name":"Role4"}`
	e := echo.New()
	req := httptest.NewRequest(http.MethodPost, "/role/create", strings.NewReader(roleJSON))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	var jwtToken = &jwt.Token{}
	jwtToken.Claims = &dto.JwtCustomClaims{Email: "user1@gmail.com", Password: "pwd1"}
	c.Set("user", jwtToken)

	// Assertions
	if assert.NoError(t, services.CreateRole(c)) {
		json.NewDecoder(io.Reader(rec.Body)).Decode(&role)
		assert.Equal(t, http.StatusOK, rec.Code)
		assert.Equal(t, role.Name, "Role4")
	}

	// Clean database
	RoleRepo.DeleteRole(role.Id)
	UserRepo.DeleteUser(1)
}

func TestUpdateRole(t *testing.T) {

	// Post a new user and role
	createdUser, _ := UserRepo.CreateUser(&entities.User{Id: 1, Email: "user1@gmail.com", Full_name: "user1", Password: "pwd1", RoleID: 1})
	assert.Equal(t, createdUser.Id, 1)
	role1, _ := RoleRepo.CreateRole(&entities.Role{Name: "Role1"})
	assert.Equal(t, role1.Name, "Role1")

	// Create a new Request
	var role entities.Role
	roleJSON := `{"Name":"Role2"}`
	e := echo.New()
	req := httptest.NewRequest(http.MethodPut, "/", strings.NewReader(roleJSON))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	c.SetPath("/role/:id")
	c.SetParamNames("id")
	c.SetParamValues(strconv.Itoa(role1.Id))
	var jwtToken = &jwt.Token{}
	jwtToken.Claims = &dto.JwtCustomClaims{Email: "user1@gmail.com", Password: "pwd1"}
	c.Set("user", jwtToken)

	// Assertions
	if assert.NoError(t, services.UpdateRole(c)) {
		json.NewDecoder(io.Reader(rec.Body)).Decode(&role)
		assert.Equal(t, http.StatusOK, rec.Code)
		assert.Equal(t, role.Name, "Role2")
	}

	RoleRepo.DeleteRole(role1.Id)
	UserRepo.DeleteUser(1)
}

func TestDeleteRole(t *testing.T) {

	// Post a new user and role
	createdUser, _ := UserRepo.CreateUser(&entities.User{Id: 1, Email: "user1@gmail.com", Full_name: "user1", Password: "pwd1", RoleID: 1})
	assert.Equal(t, createdUser.Id, 1)
	role1, _ := RoleRepo.CreateRole(&entities.Role{Name: "Role1"})
	assert.Equal(t, role1.Name, "Role1")

	// Create a new Request
	var role entities.Role
	e := echo.New()
	req := httptest.NewRequest(http.MethodDelete, "/", nil)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	c.SetPath("/role/:id")
	c.SetParamNames("id")
	c.SetParamValues(strconv.Itoa(role1.Id))
	var jwtToken = &jwt.Token{}
	jwtToken.Claims = &dto.JwtCustomClaims{Email: "user1@gmail.com", Password: "pwd1"}
	c.Set("user", jwtToken)

	// Assertions
	if assert.NoError(t, services.DeleteRole(c)) {
		json.NewDecoder(io.Reader(rec.Body)).Decode(&role)
		assert.Equal(t, http.StatusOK, rec.Code)
		assert.Equal(t, role.Id, 0)
	}

	UserRepo.DeleteUser(1)
}
