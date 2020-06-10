package entities

import "time"

type Team struct {
	Name        string `gorm:"primary_key";"size:255;unique"`
	Num_mumbers int
	StartDate   time.Time
	Frequency   int
	Surveys     []Survey `gorm:"foreignkey:TeamName"`
	Users       []*User  `gorm:"many2many:teams_users;"`
}
