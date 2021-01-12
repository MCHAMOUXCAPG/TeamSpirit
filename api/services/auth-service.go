package services

import (
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"net/http"
	"time"

	"capgemini.com/gorn/team-spirit/constants"
	"capgemini.com/gorn/team-spirit/dto"
	"capgemini.com/gorn/team-spirit/entities"
	"capgemini.com/gorn/team-spirit/repositories"
	"github.com/dgrijalva/jwt-go"
	"github.com/jinzhu/gorm"
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
// @Param accessDTO body dto.Access true "accessDTO"
// @Success 200 {object} entities.Survey
// @Failure 500 {object} dto.Error
// @Failure 406 {object} dto.Error
// @Failure 401 {object} dto.Error
// @Failure 400 {object} dto.Error
// @Router /access [post]
func AccessToSurvey(c echo.Context) error {
	access := &dto.Access{}

	json.NewDecoder(c.Request().Body).Decode(&access)

	if access.Code == "" || access.User == "" {
		return echo.NewHTTPError(http.StatusBadRequest, constants.CANNOT_BE_EMPTY_ACCESS)
	}

	survey, err := SurveyRepo.GetSurvey(access.Code)

	// If code not found check if is a team name
	if gorm.IsRecordNotFoundError(err) {
		team, err := TeamRepo.GetTeam(access.Code)
		if err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, constants.GETTEAM_GETRESULTSURVEY)
		}
		teamName := team.Name
		survey, _ = SurveyRepo.GetLastSurvey(teamName)
		// Check if last survey is still active
		if survey.EndDate.Before(time.Now()) {
			nextSurvey := BuildNextSurvey(team)
			SurveyRepo.CreateSurvey(nextSurvey)
			survey, _ = SurveyRepo.GetLastSurvey(teamName)
		}
	}
	if isNotAllowedToVote(survey.Notes, HashUser(access.User)) {
		return echo.NewHTTPError(http.StatusNotAcceptable, constants.SURVEY_COMPLETED_ACCESS)
	}

	team, err := TeamRepo.GetTeam(survey.TeamName)

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, constants.GETTEAM_ACCESS)
	}

	if len(survey.Notes) >= (team.Num_mumbers * 6) {
		return echo.NewHTTPError(http.StatusUnauthorized, constants.MAX_REACHED_ACCESS)
	}

	if time.Now().After(survey.EndDate.Add(24 * time.Hour)) {
		return echo.NewHTTPError(http.StatusUnauthorized, constants.DEADLINE_PASSED_ACCESS)

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
// @Failure 500 {object} dto.Error
// @Router /me [Get]
func CurrentUser(c echo.Context) error {

	token := c.Get("user").(*jwt.Token)
	claims := token.Claims.(*dto.JwtCustomClaims)
	currentUser, err := AuthRepo.GetUserByEmail(claims.Email)

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, constants.GETUSERBYEMAIL_CURRENTUSER)
	}

	return c.JSON(http.StatusOK, currentUser)
}

// Login godoc
// @Summary Login
// @Description Login
// @Tags Authentication
// @Accept json
// @Produce json
// @Param JwtCustomClaims body dto.JwtCustomClaims true "JwtCustomClaims"
// @Success 200 {object} dto.AuthResponse
// @Failure 500 {object} dto.Error
// @Failure 404 {object} dto.Error
// @Router /login [post]
func Login(c echo.Context) error {

	var claims = &dto.JwtCustomClaims{}

	err := json.NewDecoder(c.Request().Body).Decode(&claims)

	user, err := AuthRepo.GetUserByEmail(claims.Email)

	if (err != nil && !gorm.IsRecordNotFoundError(err)) || (claims.Email == "" || claims.Password == "") {
		return echo.NewHTTPError(http.StatusInternalServerError, constants.GETUSERBYEMAIL_LOGIN)
	}

	if gorm.IsRecordNotFoundError(err) || !passwordMatch(user.Password, []byte(claims.Password)) {
		return echo.NewHTTPError(http.StatusNotFound, constants.INVALID_CREDENTIALS_LOGIN)
	}

	claims.StandardClaims = jwt.StandardClaims{
		ExpiresAt: time.Now().Add(time.Hour * 72).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	t, err := token.SignedString([]byte("secret"))

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, constants.TOKEN_SIGNED_LOGIN)
	}

	return c.JSON(http.StatusOK, echo.Map{"token": t})
}

// Register godoc
// @Summary Register
// @Description Register
// @Tags Authentication
// @Accept json
// @Produce json
// @Param RegisterDTO body dto.RegisterDTO true "RegisterDTO"
// @Success 200 {object} entities.User
// @Failure 500 {object} dto.Error
// @Failure 404 {object} dto.Error
// @Failure 400 {object} dto.Error
// @Router /register [post]
func Register(c echo.Context) error {

	var newUser = &entities.User{}

	json.NewDecoder(c.Request().Body).Decode(&newUser)

	if newUser.Full_name == "" || newUser.Password == "" || newUser.Email == "" {
		return echo.NewHTTPError(http.StatusBadRequest, constants.CANNOT_BE_EMPTY_REGISTER)
	}

	_, err := AuthRepo.GetUserByEmail(newUser.Email)

	if err != nil && !gorm.IsRecordNotFoundError(err) {
		return echo.NewHTTPError(http.StatusInternalServerError, constants.GETUSERBYEMAIL_REGISTER)
	}

	if !gorm.IsRecordNotFoundError(err) {
		return echo.NewHTTPError(http.StatusNotFound, constants.EMAILEXISTS_REGISTER)
	}

	newUser.Password, err = HashAndSalt(newUser.Password)

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, constants.HASHPASSWORD_REGISTER)
	}

	user, err := UserRepo.CreateUser(newUser)

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, constants.CREATEUSER_REGISTER)
	}

	return c.JSON(http.StatusOK, user)
}

func HashAndSalt(password string) (string, error) {
	pwd := []byte(password)
	hash, err := bcrypt.GenerateFromPassword(pwd, bcrypt.MinCost)
	if err != nil {
		return "", err
	}

	return string(hash), nil
}

func passwordMatch(checkedPwd string, foundPwd []byte) bool {

	checkedPwdByte := []byte(checkedPwd)

	err := bcrypt.CompareHashAndPassword(checkedPwdByte, foundPwd)
	if err != nil {
		return false
	}

	return true
}

func HashUser(user string) string {
	hash := sha256.Sum256([]byte(user))
	hashSlice := hash[:]
	return hex.EncodeToString(hashSlice)
}

func isNotAllowedToVote(surveyNotes []entities.Note, user string) bool {
	for _, note := range surveyNotes {
		if note.User == user {
			return true
		}
	}
	return false
}
