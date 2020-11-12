package config

import (
	"fmt"
	"log"
	"net/url"
	"os"

	"capgemini.com/gorn/team-spirit/entities"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"github.com/joho/godotenv"
)

var DB *gorm.DB

// var ERR error
// var server = Server{}

func init() {

}

func GetConnection() {

	if er := godotenv.Load(); er != nil {
		log.Print("bad .env file found")
	}

	var err error
	err = godotenv.Load()
	if err != nil {
		log.Fatalf("Error getting env, %v", err)
	} else {
		fmt.Println("We are getting the env values")
	}

	Initialize(os.Getenv("DB_DRIVER"), os.Getenv("DB_USER"), os.Getenv("DB_PASSWORD"), os.Getenv("DB_PORT"), os.Getenv("DB_HOST"), os.Getenv("DB_NAME"))

	// DB, ERR = gorm.Open("sqlite3", "./database.db")

	// if ERR != nil {
	// 	panic("failed to connect database")
	// }

	DB.DB()
	DB.AutoMigrate(&entities.Team{}, &entities.Survey{}, &entities.Note{}, &entities.Role{}, &entities.User{})
	DB.LogMode(true)

}

func Initialize(Dbdriver, DbUser, DbPassword, DbPort, DbHost, DbName string) {

	var err error

	if Dbdriver == "mysql" {
		DBURL := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8&parseTime=True&loc=Local", DbUser, DbPassword, DbHost, DbPort, DbName)
		DB, err = gorm.Open(Dbdriver, DBURL)
		if err != nil {
			fmt.Printf("Cannot connect to %s database", Dbdriver)
			log.Fatal("This is the error:", err)
		} else {
			fmt.Printf("We are connected to the %s database", Dbdriver)
		}
	}
	if Dbdriver == "postgres" {
		// DBURL := fmt.Sprintf("host=\"%s\" port=%s user=\"%s\" dbname=\"%s\" sslmode=disable password=\"%s\"", DbHost, DbPort, DbUser, DbName, DbPassword)
		DBURL := url.URL{
			User:     url.UserPassword(DbUser, DbPassword),
			Scheme:   "postgres",
			Host:     fmt.Sprintf(DbHost + ":" + DbPort),
			Path:     DbName,
			RawQuery: (&url.Values{"sslmode": []string{"disable"}}).Encode(),
		}

		DB, err = gorm.Open("postgres", DBURL.String())
		if err != nil {
			fmt.Printf("Cannot connect to %s database", Dbdriver)
			log.Fatal("This is the error:", err)
		} else {
			fmt.Printf("We are connected to the %s database", Dbdriver)
		}
	}
	if Dbdriver == "sqlite3" {
		//DBURL := fmt.Sprintf("host=%s port=%s user=%s dbname=%s sslmode=disable password=%s", DbHost, DbPort, DbUser, DbName, DbPassword)
		DB, err = gorm.Open(Dbdriver, DbName)
		if err != nil {
			fmt.Printf("Cannot connect to %s database\n", Dbdriver)
			log.Fatal("This is the error:", err)
		} else {
			fmt.Printf("We are connected to the %s database\n", Dbdriver)
		}
		DB.Exec("PRAGMA foreign_keys = ON")
	}

	//DB.AutoMigrate(&entities.Survey{}, &entities.Note{}, &entities.User{}, &entities.Role{}, &entities.Team{}) //database migration
	//DB.LogMode(true)

	// server.Router = mux.NewRouter()

	// server.initializeRoutes()
}
