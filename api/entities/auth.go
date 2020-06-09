package entities

import "github.com/dgrijalva/jwt-go"

type JwtCustomClaims struct {
	Email    string `json:"Email"`
	Password string `json:"Password"`
	jwt.StandardClaims
}

type Access struct {
	Code string
}
