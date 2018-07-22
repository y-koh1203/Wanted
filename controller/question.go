package controller

import (
	"net/http"

	"strconv"

	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/makki0205/gojwt"
	"github.com/wanted/model"
)

func GetAllQuestion(c *gin.Context) {
	fmt.Println(c.Query("jwt"))
	jwtToken := c.Query("jwt")
	_, err := jwt.Decode(jwtToken)
	if err != nil {
		c.JSON(http.StatusNotFound, nil)
	}

	result := model.GetAllQuestion()
	c.JSON(http.StatusOK, result)
}

func GetQuestionDetail(c *gin.Context) {
	n := c.Param("question_id")
	id, _ := strconv.Atoi(n)

	fmt.Println(id)

	result := model.GetQuestionDetail(id)
	c.JSON(http.StatusOK, result)
}

func PostQuestion(c *gin.Context) {
	studentId := c.Query("student_id")
	questionTitle := c.Query("question_title")
	questionBody := c.Query("body")
	questionGenre := c.PostFormArray("genre")

	fmt.Println(c.PostFormArray("tags"))

	jwtToken := c.Query("jwt")
	_, err := jwt.Decode(jwtToken)
	if err != nil {
		c.JSON(http.StatusNotFound, nil)
	}

	fmt.Println(studentId, questionTitle, questionBody, questionGenre, jwtToken)
}
