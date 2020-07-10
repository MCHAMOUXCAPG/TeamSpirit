package constants

import (
	"capgemini.com/gorn/team-spirit/dto"
)

var GETSURVEY_ACCESS = &dto.Error{
	Status:   500,
	Message:  "Some error happened when calling the method SurveyRepo.GetSurvey",
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
	Message:  "Some error happened when calling the method AuthRepo.GetUserByEmail",
	Path:     "api/services/auth-service.go",
	Function: "CurrentUser",
}

var GETUSERBYEMAIL_LOGIN = &dto.Error{
	Status:   500,
	Message:  "Some error happened when calling the method AuthRepo.GetUserByEmail",
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
	Message:  "Some error happened when calling the method token.SignedString",
	Path:     "api/services/auth-service.go",
	Function: "Login",
}

var GETUSERBYEMAIL_REGISTER = &dto.Error{
	Status:   500,
	Message:  "Some error happened when calling the method AuthRepo.GetUserByEmail",
	Path:     "api/services/auth-service.go",
	Function: "Register",
}

var EMAILEXISTS_REGISTER = &dto.Error{
	Status:   404,
	Message:  "This email already exist, please log in!",
	Path:     "api/services/auth-service.go",
	Function: "Register",
}

var CREATEUSER_REGISTER = &dto.Error{
	Status:   500,
	Message:  "Some error happened when calling the method UserRepo.CreateUser",
	Path:     "api/services/auth-service.go",
	Function: "Register",
}

var HASHPASSWORD_REGISTER = &dto.Error{
	Status:   500,
	Message:  "Some error happened when calling the method bcrypt.GenerateFromPassword of HashAndSalt",
	Path:     "api/services/auth-service.go",
	Function: "Register",
}

var GETS_GETROLES = &dto.Error{
	Status:   500,
	Message:  "Some error happened when calling the method RoleRepo.GetRoles",
	Path:     "api/services/role-service.go",
	Function: "GetRoles",
}

var CONVERTPARAM_GETROLE = &dto.Error{
	Status:   500,
	Message:  "Some error happened when calling the method strconv.Atoi",
	Path:     "api/services/role-service.go",
	Function: "GetRole",
}

var GET_GETROLE = &dto.Error{
	Status:   500,
	Message:  "Some error happened when calling the method RoleRepo.GetRole",
	Path:     "api/services/role-service.go",
	Function: "GetRole",
}

var CREATE_CREATEROLE = &dto.Error{
	Status:   500,
	Message:  "Some error happened when calling the method RoleRepo.CreateRole",
	Path:     "api/services/role-service.go",
	Function: "CreateRole",
}

var CONVERTPARAM_UPDATEROLE = &dto.Error{
	Status:   500,
	Message:  "Some error happened when calling the method strconv.Atoi",
	Path:     "api/services/role-service.go",
	Function: "UpdateRole",
}

var UPDATE_UPDATEROLE = &dto.Error{
	Status:   500,
	Message:  "Some error happened when calling the method RoleRepo.UpdateRole",
	Path:     "api/services/role-service.go",
	Function: "UpdateRole",
}

var CONVERTPARAM_DELETEROLE = &dto.Error{
	Status:   500,
	Message:  "Some error happened when calling the method strconv.Atoi",
	Path:     "api/services/role-service.go",
	Function: "DeleteRole",
}

var DELETE_DELETEROLE = &dto.Error{
	Status:   500,
	Message:  "Some error happened when calling the method RoleRepo.DeleteRole",
	Path:     "api/services/role-service.go",
	Function: "DeleteRole",
}

var GETS_GETTEAMS = &dto.Error{
	Status:   500,
	Message:  "Some error happened when calling the method TeamRepo.GetTeams",
	Path:     "api/services/team-service.go",
	Function: "GetTeams",
}

var GET_GETTEAM = &dto.Error{
	Status:   500,
	Message:  "Some error happened when calling the method TeamRepo.GetTeam",
	Path:     "api/services/team-service.go",
	Function: "GetTeam",
}

var CREATE_CREATETEAM = &dto.Error{
	Status:   500,
	Message:  "Some error happened when calling the method TeamRepo.CreateTeam",
	Path:     "api/services/team-service.go",
	Function: "CreateRole",
}

var UPDATE_UPDATETEAM = &dto.Error{
	Status:   500,
	Message:  "Some error happened when calling the method TeamRepo.UpdateTeam",
	Path:     "api/services/team-service.go",
	Function: "UpdateTeam",
}

var DELETE_DELETETEAM = &dto.Error{
	Status:   500,
	Message:  "Some error happened when calling the method TeamRepo.DeleteTeam",
	Path:     "api/services/team-service.go",
	Function: "DeleteTeam",
}

var GETS_GETUSERS = &dto.Error{
	Status:   500,
	Message:  "Some error happened when calling the method UserRepo.GetUsers",
	Path:     "api/services/user-service.go",
	Function: "GetUsers",
}

var CONVERTPARAM_GETUSER = &dto.Error{
	Status:   500,
	Message:  "Some error happened when calling the method strconv.Atoi",
	Path:     "api/services/user-service.go",
	Function: "GetUser",
}

var GET_GETUSER = &dto.Error{
	Status:   500,
	Message:  "Some error happened when calling the method UserRepo.GetUser",
	Path:     "api/services/user-service.go",
	Function: "Getuser",
}

var CREATE_CREATEUSER = &dto.Error{
	Status:   500,
	Message:  "Some error happened when calling the method UserRepo.CreateUser",
	Path:     "api/services/user-service.go",
	Function: "CreateUser",
}

var CONVERTPARAM_UPDATEUSER = &dto.Error{
	Status:   500,
	Message:  "Some error happened when calling the method strconv.Atoi",
	Path:     "api/services/user-service.go",
	Function: "UpdateUser",
}

var UPDATE_UPDATEUSER = &dto.Error{
	Status:   500,
	Message:  "Some error happened when calling the method Userepo.UpdateUser",
	Path:     "api/services/user-service.go",
	Function: "UpdateUser",
}

var CONVERTPARAM_DELETEUSER = &dto.Error{
	Status:   500,
	Message:  "Some error happened when calling the method strconv.Atoi",
	Path:     "api/services/role-service.go",
	Function: "DeleteUser",
}

var DELETE_DELETEUSER = &dto.Error{
	Status:   500,
	Message:  "Some error happened when calling the method UserRepo.DeleteUser",
	Path:     "api/services/user-service.go",
	Function: "DeleteUser",
}

var GETS_GETSURVEYS = &dto.Error{
	Status:   500,
	Message:  "Some error happened when calling the method SurveyRepo.GetSurveys",
	Path:     "api/services/survey-service.go",
	Function: "GetSurveys",
}

var GET_GETSURVEY = &dto.Error{
	Status:   500,
	Message:  "Some error happened when calling the method SurveyRepo.GetSurvey",
	Path:     "api/services/survey-service.go",
	Function: "GetSurvey",
}

var CREATE_CREATESURVEY = &dto.Error{
	Status:   500,
	Message:  "Some error happened when calling the method SurveyRepo.CreateSurvey",
	Path:     "api/services/survey-service.go",
	Function: "CreateSurvey",
}

var UPDATE_UPDATESURVEY = &dto.Error{
	Status:   500,
	Message:  "Some error happened when calling the method SurveyRepo.UpdateSurvey",
	Path:     "api/services/survey-service.go",
	Function: "UpdateSurvey",
}

var DELETE_DELETESURVEY = &dto.Error{
	Status:   500,
	Message:  "Some error happened when calling the method SurveyRepo.DeleteSurvey",
	Path:     "api/services/survey-service.go",
	Function: "DeleteSurvey",
}

var GET_ADDNOTES = &dto.Error{
	Status:   500,
	Message:  "Some error happened when calling the method SurveyRepo.GetSurvey",
	Path:     "api/services/survey-service.go",
	Function: "AddNotesToSurvey",
}

var UPDATE_ADDNOTES = &dto.Error{
	Status:   500,
	Message:  "Some error happened when calling the method SurveyRepo.UpdateSurvey",
	Path:     "api/services/survey-service.go",
	Function: "AddNotesToSurvey",
}

var GETLASTSURVEY_GETRESULTSURVEY = &dto.Error{
	Status:   500,
	Message:  "Some error happened when calling the method SurveyRepo.GetLastSurvey",
	Path:     "api/services/survey-service.go",
	Function: "GetResultSurvey",
}

var GETTEAM_GETRESULTSURVEY = &dto.Error{
	Status:   500,
	Message:  "Some error happened when calling the method TeamRepo.GetTeam",
	Path:     "api/services/survey-service.go",
	Function: "GetResultSurvey",
}

var GETLASTSURVEY_GETHISTORICSURVEYSBYQUESTIONS = &dto.Error{
	Status:   500,
	Message:  "Some error happened when calling the method SurveyRepo.GetLastSurvey",
	Path:     "api/services/survey-service.go",
	Function: "GetHistoricSurveysByQuestions",
}

var NOTESBYQUESTIONS_GETHISTORICSURVEYSBYQUESTIONS = &dto.Error{
	Status:   500,
	Message:  "Some error happened when calling the method SurveyRepo.GetNotesGroupByQuestions",
	Path:     "api/services/survey-service.go",
	Function: "GetHistoricSurveysByQuestions",
}

var QUESTIONNOTES_GETHISTORICSURVEYSBYQUESTIONS = &dto.Error{
	Status:   500,
	Message:  "Some error happened when calling the method mapQuestionNotes",
	Path:     "api/services/survey-service.go",
	Function: "GetHistoricSurveysByQuestions",
}

var GETLASTSURVEY_GETHISTORICSURVEYSBYUSERS = &dto.Error{
	Status:   500,
	Message:  "Some error happened when calling the method SurveyRepo.GetLastSurvey",
	Path:     "api/services/survey-service.go",
	Function: "GetHistoricSurveysByusers",
}

var NOTESBYUSERS_GETHISTORICSURVEYSBYUSERS = &dto.Error{
	Status:   500,
	Message:  "Some error happened when calling the method SurveyRepo.GetNotesGroupByUsers",
	Path:     "api/services/survey-service.go",
	Function: "GetHistoricSurveysByusers",
}

var MAPNOTES_GETHISTORICSURVEYSBYUSERS = &dto.Error{
	Status:   500,
	Message:  "Some error happened when calling the method mapNotes",
	Path:     "api/services/survey-service.go",
	Function: "GetHistoricSurveysByusers",
}

var GETSURVEYS_EXPORTSURVEYSCSV = &dto.Error{
	Status:   500,
	Message:  "Some error happened when calling the method SurveyRepo.GetSurviesByPeriod",
	Path:     "api/services/survey-service.go",
	Function: "ExportSurveysCsv",
}
