package constants

import (
	"capgemini.com/gorn/team-spirit/dto"
)

var GETSURVEY_ACCESS = &dto.Error{
	Status:   500,
	Message:  "Some error hapenned when calling the method SurveyRepo.GetSurvey",
	Path:     "api/services/auth-service.go",
	Function: "AccessToSurvey",
}

var INVALID_CODE_ACCESS = &dto.Error{
	Status:   404,
	Message:  "Invalid code",
	Path:     "api/services/auth-service.go",
	Function: "AccessToSurvey",
}

var SURVEY_COMPLETED_ACCESS = &dto.Error{
	Status:   406,
	Message:  "You have already completed the survey",
	Path:     "api/services/auth-service.go",
	Function: "AccessToSurvey",
}

var MAX_REACHED_ACCESS = &dto.Error{
	Status:   401,
	Message:  "The maximum number of notes has been reached",
	Path:     "api/services/auth-service.go",
	Function: "AccessToSurvey",
}

var DEADLINE_PASSED_ACCESS = &dto.Error{
	Status:   401,
	Message:  "The deadline to complete the survey has passed",
	Path:     "api/services/auth-service.go",
	Function: "AccessToSurvey",
}

var GETUSERBYEMAIL_CURRENTUSER = &dto.Error{
	Status:   500,
	Message:  "Some error hapenned when calling the method AuthRepo.GetUserByEmail",
	Path:     "api/services/auth-service.go",
	Function: "CurrentUser",
}

var GETUSERBYEMAIL_LOGIN = &dto.Error{
	Status:   500,
	Message:  "Some error hapenned when calling the method AuthRepo.GetUserByEmail",
	Path:     "api/services/auth-service.go",
	Function: "Login",
}

var EMAILNOTEXISTS_LOGIN = &dto.Error{
	Status:   404,
	Message:  "This email doesn't exist, please register",
	Path:     "api/services/auth-service.go",
	Function: "Login",
}

var INVALID_CREDENTIALS_LOGIN = &dto.Error{
	Status:   404,
	Message:  "Invalid credentials",
	Path:     "api/services/auth-service.go",
	Function: "Login",
}

var TOKEN_SIGNED_LOGIN = &dto.Error{
	Status:   500,
	Message:  "Some error hapenned when calling the method token.SignedString",
	Path:     "api/services/auth-service.go",
	Function: "Login",
}

var GETUSERBYEMAIL_REGISTER = &dto.Error{
	Status:   500,
	Message:  "Some error hapenned when calling the method AuthRepo.GetUserByEmail",
	Path:     "api/services/auth-service.go",
	Function: "Register",
}

var EMAILNOTEXISTS_REGISTER = &dto.Error{
	Status:   404,
	Message:  "This email already exist, please log in!",
	Path:     "api/services/auth-service.go",
	Function: "Register",
}

var CREATEUSER_REGISTER = &dto.Error{
	Status:   500,
	Message:  "Some error hapenned when calling the method UserRepo.CreateUser",
	Path:     "api/services/auth-service.go",
	Function: "Register",
}

var HASHPASSWORD_REGISTER = &dto.Error{
	Status:   500,
	Message:  "Some error hapenned when calling the method bcrypt.GenerateFromPassword",
	Path:     "api/services/auth-service.go",
	Function: "HashAndSalt",
}
