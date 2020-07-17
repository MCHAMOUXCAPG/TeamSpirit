package entities

import "time"

type Survey struct {
	Code      string    `gorm:"primary_key";"size:255;unique;not null"`
	StartDate time.Time `gorm:"not null;default:null"`
	EndDate   time.Time `gorm:"not null;default:null"`
	Notes     []Note    `gorm:"foreignkey:SurveyCode"`
	TeamName  string    `sql:"type:varchar REFERENCES teams(name) on update cascade on delete cascade" json:"TeamName,omitempty"`
}

type Note struct {
	User       string `gorm:"not null;default:null" json:"User,omitempty"`
	Number     int    `gorm:"not null;default:null" json:"Number,omitempty"`
	Note       float64
	SurveyCode string `sql:"type:varchar REFERENCES surveys(code) on update cascade on delete cascade" json:"SurveyCode,omitempty"`
}
