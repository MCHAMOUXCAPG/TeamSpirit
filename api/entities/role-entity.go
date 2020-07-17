package entities

type Role struct {
	Id   int    `gorm:"primary_key";"AUTO_INCREMENT"`
	Name string `gorm:"size:255;unique;not null"`
}
