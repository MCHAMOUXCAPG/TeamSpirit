package tests

import (
	"os"
	"testing"

	"campgemini.com/gorn/team-spirit/config"
)

func TestMain(m *testing.M) {
	config.GetConnection()
	code := m.Run()
	os.Exit(code)
}
