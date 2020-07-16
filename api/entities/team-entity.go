package entities

import "time"

type Team struct {
	Name        string    `gorm:"primary_key";"size:255;unique;not null;default:null"`
	Num_mumbers int       `gorm:"not null;default:null"`
	StartDate   time.Time `gorm:"not null;default:null"`
	Frequency   int       `gorm:"not null;default:null"`
	Surveys     []Survey  `gorm:"foreignkey:TeamName"`
	Users       []*User   `gorm:"many2many:team_users;"foreignkey:Id"`
}
