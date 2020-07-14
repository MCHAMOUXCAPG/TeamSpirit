package entities

import "time"

type Survey struct {
	StartDate time.Time
	EndDate   time.Time
	Code      string `gorm:"size:255;unique"`
	Notes     []Note `gorm:"foreignkey:SurveyCode"`
	TeamName  string `sql:"type:carchar REFERENCES teams(name) on update cascade on delete cascade"`
}

type Note struct {
	User       string `json:"User,omitempty"`
	Number     int    `json:"Number,omitempty"`
	Note       float64
	SurveyCode string `sql:"type:varchar REFERENCES surveys(code) on update cascade on delete cascade" json:"SurveyCode,omitempty"`
}
