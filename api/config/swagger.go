package config

import (
	"github.com/callicoder/packer/docs"
)

func ConfigSwagger() {
	docs.SwaggerInfo.Title = " Team spirit Api"
	docs.SwaggerInfo.Description = " Team spirit Api"
	docs.SwaggerInfo.Version = "1.0"
	docs.SwaggerInfo.Host = "localhost:3000"
	docs.SwaggerInfo.BasePath = "/"
	docs.SwaggerInfo.Schemes = []string{"http"}
}
