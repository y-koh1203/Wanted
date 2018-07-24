package controller

import (
	"net/http"

	"strconv"

	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/wanted/model"
)

func GetAllQuestion(c *gin.Context) {
	//jwtToken := c.Query("jwt")

	result := model.GetAllQuestion()
	c.JSON(http.StatusOK, result)

}

func GetQuestionDetail(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("question_id"))
	//jwtToken := c.Query("jwt")

	result := model.GetQuestionDetail(id)
	c.JSON(http.StatusOK, result)

}

func PostQuestion(c *gin.Context) {
	studentId, _ := strconv.Atoi(c.PostForm("student_id"))
	questionTitle := c.PostForm("question_title")
	questionBody := c.PostForm("body")
	questionGenre, _ := strconv.Atoi(c.PostForm("genre"))
	jwtToken := c.PostForm("jwt")

	fmt.Printf("student_id: %d; question_title: %s; body: %s; genre: %d; jwtToken: %s; analysis: %s;", studentId, questionTitle, questionBody, questionGenre, jwtToken)
	fmt.Println("")

	post := model.CreateQuestion(questionTitle, questionBody, jwtToken, studentId, questionGenre)
	fmt.Println(post)
}
