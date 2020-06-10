package main

import (
	"net/http"

	"github.com/callicoder/packer/config"
	"github.com/callicoder/packer/docs"
	"github.com/callicoder/packer/entities"
	"github.com/callicoder/packer/services"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	_ "github.com/mattn/go-sqlite3"
	"github.com/robfig/cron"
	echoSwagger "github.com/swaggo/echo-swagger"
)

func helloWorld(c echo.Context) error {
	return c.HTML(http.StatusOK, "<h1>Hello, this is the backend of TeamSpirit POC!</h1><h3>You can see actual API on : </h3><a href='http://localhost:3000/swagger/index.html'>Swagger index page</a><p>(As default for devs, if on another env. please check real path)</p>")
}

func handleResquests() {
	e := echo.New()

	// init route
	e.GET("/", helloWorld)

	// Swagger

	e.GET("/swagger/*", echoSwagger.WrapHandler)

	// **** Autentication routes ****
	e.POST("/access", services.AccessToSurvey)

	// login
	e.POST("/login", services.Login)

	// Register
	e.POST("/register", services.Register)

	// Guards Config
	r := e.Group("")

	config := middleware.JWTConfig{
		Claims:     &entities.JwtCustomClaims{},
		SigningKey: []byte("secret"),
	}

	r.Use(middleware.JWTWithConfig(config))

	// Get the connected user
	r.GET("/me", services.CurrentUser)

	// **** users routes *****
	e.POST("/user/create", services.CreateUser)
	e.GET("/users", services.GetUsers)
	e.GET("/user/:id", services.GetUser)
	e.DELETE("/user/:id", services.DeleteUser)
	e.PUT("/user/:id", services.UpdateUser)

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
	r.POST("/survey/:surveyCode/addNotes", services.AddNotesToSurvey)
	r.GET("/survey/result/:surveyCode", services.GetResultSurvey)

	// **** Temas routes *****
	r.GET("/teams", services.GetTeams)
	r.GET("/team/:teamName", services.GetTeam)
	r.POST("/team/create", services.CreateTeam)
	r.PUT("/team/:teamName", services.UpdateTeam)
	r.DELETE("/team/:teamName", services.DeleteTeam)

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

	config.GetConnection()

	c := cron.New()

	defer c.Stop()

	c.AddFunc("* * * 1 * *", services.CreateSurveyAtEndOfSprint)

	// Comenzar
	c.Start()

	configSwagger()

	handleResquests()
}
