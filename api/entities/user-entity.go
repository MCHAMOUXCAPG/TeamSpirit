package entities

type User struct {
	Id        int     `gorm:"primary_key";"AUTO_INCREMENT"`
	Full_name string  `gorm:"size:255;unique"`
	Email     string  `gorm:"size:255;unique"`
	Password  string  `gorm:"size:255"`
	Roles     []Role  `gorm:"foreignkey:UserID"`
	Teams     []*Team `gorm:"many2many:teams_users;"`
}
