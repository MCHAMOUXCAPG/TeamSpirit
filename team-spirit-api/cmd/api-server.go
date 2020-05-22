package main

import (
	"fmt"
	"log"
	"net/http"
)

// StorageType defines available storage types
type Type int

const (
	// JSON will store data in JSON files saved on disk
	DB Type = iota
	// Memory will store data in memory
	Memory
)

func main() {

	// set up storage
	storageType := Memory // this could be a flag; hardcoded here for simplicity

	var surveyor surveys.Service
	var projectmgr projects.Service

	switch storageType {
	case Memory:
		s := new(memory.Storage)

		surveyor = surveys.NewService(s)
		projectmgr = projects.NewService(s)

	case JSON:
		// error handling omitted for simplicity
		s := new(memory.Storage)

		surveyor = surveys.NewService(s)
		projectmgr = projects.NewService(s)
	}

	// set up the HTTP server
	router := rest.Handler(surveyor, projectmgr)

	fmt.Println("The Team Spirit API server is running on: http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", router))
}
