package entities

type Role struct {
	Id     int    `gorm:"primary_key";"AUTO_INCREMENT"`
	Name   string `gorm:"size:255"`
	UserID int    `sql:"type:integer REFERENCES users(id) on update cascade on delete cascade"`
}
