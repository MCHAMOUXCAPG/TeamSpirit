package entities

import "time"

type Survey struct {
	StartDate time.Time
	EndDate   time.Time
	Code      string `gorm:"size:255;unique"`
	Notes     []Note `gorm:"foreignkey:SurveyCode"`
	TeamName  string `sql:"type:integer REFERENCES teams(name)"`
}

type Note struct {
	Number     int
	Note       int
	SurveyCode string `sql:"type:integer REFERENCES surveys(code)"`
}
