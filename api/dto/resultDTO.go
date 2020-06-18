package dto

import "time"

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
