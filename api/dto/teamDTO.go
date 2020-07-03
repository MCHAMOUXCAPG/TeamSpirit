package dto

import "time"

type TeamDTO struct {
	Name        string
	Num_mumbers int
	StartDate   time.Time
	Frequency   int
}
