package services

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/callicoder/packer/dto"
	"github.com/callicoder/packer/entities"
	"github.com/callicoder/packer/repositories"
	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo/v4"
	_ "github.com/mattn/go-sqlite3"
	"golang.org/x/crypto/bcrypt"
)

var (
	AuthRepo repositories.AuthRepository = repositories.NewAuthRepository()
)

// @Summary Access to survey
// @Description you should send a survey code to access
// @Tags Authentication
// @Accept json
// @Produce json
// @Param Code body dto.Access true "string"
// @Success 200 {object} entities.Survey
// @Router /access [post]
func AccessToSurvey(c echo.Context) error {
	access := &dto.Access{}

	json.NewDecoder(c.Request().Body).Decode(&access)
	survey, _ := SurveyRepo.GetSurvey(access.Code)

	if survey.Code == "" {
		return echo.NewHTTPError(http.StatusNotFound, "Invalid survey code, Please enter a valid code !")
	}

	team, _ := TeamRepo.GetTeam(survey.TeamName)

	if len(survey.Notes) >= (team.Num_mumbers * 6) {
		return echo.NewHTTPError(http.StatusUnauthorized, "Access not allowed! The maximum number of notes has been reached")
	}

	if time.Now().After(survey.EndDate) {
		return echo.NewHTTPError(http.StatusUnauthorized, "Acess not allowed! The deadline to complete the survey has passed")

	}

	return c.JSON(http.StatusOK, survey)
}

// Current User godoc
// @Summary Current User
// @Description Current user
// @Tags Authentication
// @Accept json
// @Produce json
// @Success 200 {object} entities.User
// @Router /me [Get]
func CurrentUser(c echo.Context) error {

	token := c.Get("user").(*jwt.Token)
	claims := token.Claims.(*dto.JwtCustomClaims)
	currentUser, _ := AuthRepo.GetUserByEmail(claims.Email)

	return c.JSON(http.StatusOK, currentUser)

}

// Login godoc
// @Summary Login
// @Description Login
// @Tags Authentication
// @Accept json
// @Produce json
// @Param Email body dto.JwtCustomClaims true "String"
// @Param Password body dto.JwtCustomClaims true "String"
// @Success 200 {object} dto.JwtCustomClaims
// @Router /login [post]
func Login(c echo.Context) error {

	var claims = &dto.JwtCustomClaims{}

	json.NewDecoder(c.Request().Body).Decode(&claims)

	user, _ := AuthRepo.GetUserByEmail(claims.Email)

	if user.Id == 0 {
		return c.JSON(http.StatusNotFound, echo.Map{"Error": "This email doesn't exist, please register"})
	}

	if passwordMatch(user.Password, []byte(claims.Password)) == false {
		return c.JSON(http.StatusNotFound, echo.Map{"Error": "Invalid credentials"})
	}

	claims.StandardClaims = jwt.StandardClaims{
		ExpiresAt: time.Now().Add(time.Hour * 72).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	t, err := token.SignedString([]byte("secret"))

	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, echo.Map{"token": t})
}

// Register godoc
// @Summary Register
// @Description Register
// @Tags Authentication
// @Accept json
// @Produce json
// @Param Full-name body entities.User true "string"
// @Param Email body entities.User true "string"
// @Param Password body entities.User true "string"
// @Param Phone body entities.User true "int"
// @Success 200 {object} entities.User
// @Router /register [post]
func Register(c echo.Context) error {

	var newUser = &entities.User{}

	json.NewDecoder(c.Request().Body).Decode(&newUser)

	foundUser, _ := AuthRepo.GetUserByEmail(newUser.Email)

	if foundUser.Id != 0 {
		return c.JSON(http.StatusNotFound, echo.Map{"Error": "This email already exist, please log in!"})
	}

	newUser.Password = hashAndSalt(newUser.Password)

	user, _ := UserRepo.CreateUser(newUser)
	return c.JSON(http.StatusOK, user)
}

func hashAndSalt(password string) string {
	pwd := []byte(password)
	hash, err := bcrypt.GenerateFromPassword(pwd, bcrypt.MinCost)
	if err != nil {
		log.Println(err)
	}

	return string(hash)
}

func passwordMatch(checkedPwd string, foundPwd []byte) bool {

	checkedPwdByte := []byte(checkedPwd)

	err := bcrypt.CompareHashAndPassword(checkedPwdByte, foundPwd)
	if err != nil {
		return false
	}

	return true
}
