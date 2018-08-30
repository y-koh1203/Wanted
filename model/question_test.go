package model

import (
	"fmt"
	"testing"
)

func TestGetNotification(t *testing.T) {
	result := GetNotification(1)
	fmt.Println(result)
}

func TestGetMyQuestions(t *testing.T) {
	result := GetMyQuestions(1)
	fmt.Println(result)
}
