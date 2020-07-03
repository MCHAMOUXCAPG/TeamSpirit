package dto

import "time"

type SurveyDTO struct {
	StartDate time.Time
	EndDate   time.Time
	Code      string
	TeamName  string
}
