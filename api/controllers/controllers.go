package controllers

import (
	"net/http"

	"capgemini.com/gorn/team-spirit/dto"
	"capgemini.com/gorn/team-spirit/services"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	_ "github.com/mattn/go-sqlite3"
	echoSwagger "github.com/swaggo/echo-swagger"
)

// TODO: Extract constant text repeated
// TODO: Review for multiple controller solution
func HandleResquests() {
	e := echo.New()
	e.Use(middleware.CORS())

	// Public routes

	// Init
	e.GET("/", helloWorld)

	// Swagger

	e.GET("/swagger/*", echoSwagger.WrapHandler)

	// **** Autentication routes ****
	e.POST("/access", services.AccessToSurvey)

	// login
	e.POST("/login", services.Login)

	// Register
	e.POST("/register", services.Register)

	// Private routes

	// Config
	r := e.Group("")

	config := middleware.JWTConfig{
		Claims:     &dto.JwtCustomClaims{},
		SigningKey: []byte("secret"),
	}

	r.Use(middleware.JWTWithConfig(config))

	// Get the connected user
	r.GET("/me", services.CurrentUser)

	// **** users routes *****
	r.POST("/user/create", services.CreateUser)
	r.GET("/users", services.GetUsers)
	r.GET("/user/:id", services.GetUser)
	r.DELETE("/user/:id", services.DeleteUser)
	r.PUT("/user/:id", services.UpdateUser)

	// **** Roles routes *****
	r.GET("/role/:id", services.GetRole)
	r.GET("/roles", services.GetRoles)
	r.POST("/role/create", services.CreateRole)
	r.DELETE("/role/:id", services.DeleteRole)
	r.PUT("/role/:id", services.UpdateRole)

	// ***** Servies routes *****
	r.GET("/survies", services.GetSurvies)
	r.GET("/survey/:surveyCode", services.GetSurvey)
	r.POST("/survey/create", services.CreateSurvey)
	r.PUT("/survey/:surveyCode", services.UpdateSurvey)
	r.DELETE("/survey/:surveyCode", services.DeleteSurvey)
	r.PUT("/survey/resetSurvey/:surveyCode", services.ResetSurvey)
	r.GET("/survey/result/:teamName", services.GetResultSurvey)
	// Surveys CSV Export
	r.GET("/survey/exportCsv", services.ExportSurveysCsv)

	r.GET("/resultByUsers/:teamName", services.GetHistoricSurveysByusers)
	r.GET("/resultByQuestions/:teamName", services.GetHistoricSurveysByQuestions)
	r.GET("/resultBySurveys/:teamName", services.GetHistoricSurveys)
	r.GET("/newSurveyCode/:teamName", services.NextSurveyCode)

	e.POST("/survey/:surveyCode/addNotes", services.AddNotesToSurvey)

	// **** Teams routes *****
	r.GET("/teams", services.GetTeams)
	r.GET("/team/:teamName", services.GetTeam)
	r.POST("/team/create", services.CreateTeam)
	r.PUT("/team/:teamName", services.UpdateTeam)
	r.DELETE("/team/:teamName", services.DeleteTeam)

	// serve
	e.Logger.Fatal(e.Start(":3000"))
}

func helloWorld(c echo.Context) error {
	// TODO: Extract this html + Fix it!
	return c.HTML(http.StatusOK, "<h1>Hello, this is the backend of TeamSpirit POC!</h1><h3>You can see actual API on : </h3><a href='http://localhost:3000/swagger/index.html'>Swagger index page</a><p>(As default for devs, if on another env. please check real path)</p>")
}
