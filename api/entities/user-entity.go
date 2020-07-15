package entities

type User struct {
	Id        int     `gorm:"primary_key";"AUTO_INCREMENT"`
	Full_name string  `gorm:"size:255;uniquenot null;default:null"`
	Email     string  `gorm:"size:255;unique;not null;default:null"`
	Password  string  `gorm:"size:255;not null;default:null"`
	Roles     []Role  `gorm:"foreignkey:UserID"`
	Teams     []*Team `gorm:"many2many:teams_users;"foreignkey:Name""`
}
