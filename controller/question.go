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
		c.JSON(http.StatusForbidden, nil)
	}

	result := model.GetAllQuestion()
	c.JSON(http.StatusOK, result)
}

func GetQuestionDetail(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("question_id"))

	result := model.GetQuestionDetail(id)
	c.JSON(http.StatusOK, result)
}

func PostQuestion(c *gin.Context) {
	id, _ := strconv.Atoi(c.PostForm("student_id"))
	questionTitle := c.PostForm("question_title")
	questionBody := c.PostForm("body")
	questionGenre := c.PostForm("genre")
	questionTags := c.PostFormArray("tags")

	jwtToken := c.PostForm("jwt")
	_, err := jwt.Decode(jwtToken)
	if err != nil {
		c.JSON(http.StatusForbidden, nil)
	}

	fmt.Println(id, questionTitle, questionBody, questionGenre, questionTags, jwtToken)
}
