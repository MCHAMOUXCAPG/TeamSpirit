package entities

type User struct {
	Id        int     `gorm:"primary_key";"AUTO_INCREMENT"`
	Full_name string  `gorm:"size:255;unique;not null;default:null"`
	Email     string  `gorm:"size:255;unique;not null;default:null"`
	Password  string  `gorm:"size:255;not null;default:null"`
	Role      Role    `gorm:"foreignkey:RoleID"`
	RoleID    int     `json:"RoleID,omitempty"`
	Teams     []*Team `gorm:"many2many:team_users;"foreignkey:Name""`
}
