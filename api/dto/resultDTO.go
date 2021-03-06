package dto

import (
	"time"

	"capgemini.com/gorn/team-spirit/entities"
)

type Result struct {
	Period         Period
	Completed      string
	CurrentResult  float64
	HistoricResult float64
}

type Period struct {
	StartDate time.Time
	EndDate   time.Time
}

type ResultByUsers struct {
	User    string
	Average float64
	Notes   []*entities.Note
}

type HistoricResult struct {
	StartDate    time.Time
	EndDate      time.Time
	TotalAverage float64
}

type ResultByQuestions struct {
	QuestionNumber int
	Average        float64
	Notes          []*entities.Note
}
