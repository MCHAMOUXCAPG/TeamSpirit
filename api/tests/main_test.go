package tests

import (
	"os"
	"testing"

	"github.com/callicoder/packer/config"
)

func TestMain(m *testing.M) {
	config.GetConnection()
	code := m.Run()
	os.Exit(code)
}
