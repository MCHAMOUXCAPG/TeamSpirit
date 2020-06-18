package dto

import "github.com/dgrijalva/jwt-go"

type JwtCustomClaims struct {
	Email    string `json:"Email"`
	Password string `json:"Password"`
	jwt.StandardClaims
}
