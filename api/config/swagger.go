package config

import (
	"capgemini.com/gorn/team-spirit/docs"
)

func ConfigSwagger() {
	docs.SwaggerInfo.Title = " Team spirit Api"
	docs.SwaggerInfo.Description = " Team spirit Api"
	docs.SwaggerInfo.Version = "1.0"
	docs.SwaggerInfo.Host = "localhost:3000"
	docs.SwaggerInfo.BasePath = "/"
	docs.SwaggerInfo.Schemes = []string{"http"}
}
