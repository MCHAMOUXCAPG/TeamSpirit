package main

import (
	"net/http"

	"github.com/callicoder/packer/docs"
	"github.com/callicoder/packer/entities"
	"github.com/callicoder/packer/services"
	"github.com/jinzhu/gorm"
	"github.com/labstack/echo/v4"
	_ "github.com/mattn/go-sqlite3"
	"github.com/robfig/cron"
	echoSwagger "github.com/swaggo/echo-swagger"
)

func helloWorld(c echo.Context) error {
	return c.HTML(http.StatusOK, "<h1>Hello, this is the backend of TeamSpirit POC!</h1><h3>You can see actual API on : </h3><a href='http://localhost:3000/swagger/index.html'>Swagger index page</a><p>(As default for devs, if on another env. please check real path)</p>")}

func handleResquests() {
	e := echo.New()

	// init route
	e.GET("/", helloWorld)

	// Swagger

	e.GET("/swagger/*", echoSwagger.WrapHandler)

	// Autentication routes
	e.POST("/access", services.AccessToSurvey)

	// Servies routes

	e.GET("/survies", services.GetSurvies)
	e.GET("/survey/:surveyCode", services.GetSurvey)
	e.POST("/survey/create", services.CreateSurvey)
	e.PUT("/survey/:surveyCode", services.UpdateSurvey)
	e.DELETE("/survey/:surveyCode", services.DeleteSurvey)
	e.POST("/survey/:surveyCode/addNotes", services.AddNotesToSurvey)
	e.GET("/survey/result/:surveyCode", services.GetResultSurvey)

	// Temas routes
	e.GET("/teams", services.GetTeams)
	e.GET("/team/:teamName", services.GetTeam)
	e.POST("/team/create", services.CreateTeam)
	e.PUT("/team/:teamName", services.UpdateTeam)
	e.DELETE("/team/:teamName", services.DeleteTeam)

	// serve
	e.Logger.Fatal(e.Start(":3000"))
}

func configSwagger() {
	docs.SwaggerInfo.Title = " Team spirit Api"
	docs.SwaggerInfo.Description = " Team spirit Api"
	docs.SwaggerInfo.Version = "1.0"
	docs.SwaggerInfo.Host = "localhost:3000"
	docs.SwaggerInfo.BasePath = "/api/v1"
	docs.SwaggerInfo.Schemes = []string{"http"}
}

// @title Swagger Example API
// @version 1.0
// @description This is a sample server Petstore server.
// @termsOfService http://swagger.io/terms/

// @contact.name API Support
// @contact.url http://www.swagger.io/support
// @contact.email support@swagger.io

// @license.name Apache 2.0
// @license.url http://www.apache.org/licenses/LICENSE-2.0.html

// @host petstore.swagger.io
// @BasePath /v2
func main() {

	DB, ERR := gorm.Open("sqlite3", "./database.db")

	if ERR != nil {
		panic("failed to connect database")
	}

	defer DB.Close()

	DB.AutoMigrate(&entities.Survey{}, &entities.Note{}, &entities.Team{})

	c := cron.New()

	defer c.Stop()

	c.AddFunc("* * * 1 * *", services.CreateSurveyAtEndOfSprint)

	// Comenzar
	c.Start()

	configSwagger()

	handleResquests()
}
