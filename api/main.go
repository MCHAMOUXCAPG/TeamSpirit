package main

import (
	"capgemini.com/gorn/team-spirit/config"
	"capgemini.com/gorn/team-spirit/controllers"
	"capgemini.com/gorn/team-spirit/services"
)

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
// @BasePath /
func main() {

	config.GetConnection()

	services.VerifyRole()

	services.CreateDefaultAdmin()

	// services.CreateSurveyAutomatically()

	config.ConfigSwagger()

	controllers.HandleResquests()
}
