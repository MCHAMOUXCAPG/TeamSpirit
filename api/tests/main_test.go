package tests

import (
	"os"
	"testing"

	"capgemini.com/gorn/team-spirit/config"
)

func TestMain(m *testing.M) {
	config.GetConnection()
	code := m.Run()
	os.Exit(code)
}
