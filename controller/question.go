package controller

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/wanted/model"
)

func GetQuestion(c *gin.Context) {
	searchStr := "数学" // c.PostForm("")
	result := model.GetQuestion(searchStr)
	c.JSON(http.StatusOK, result)
}

func GetAllQuestion(c *gin.Context) {
	result := model.GetAllQuestion()
	c.JSON(http.StatusOK, result)
}

func GetQuestionDetail(c *gin.Context) {
	id, ok := strconv.Atoi(c.Param("question_id"))
	if ok != nil {
		c.JSON(http.StatusNotFound, nil)
	} else {
		result := model.GetQuestionDetail(id)
		c.JSON(http.StatusOK, result)
	}
}

func GetStudentQuestion(c *gin.Context) {
	id, ok := strconv.Atoi(c.Param("student_id"))
	if ok != nil {
		c.JSON(http.StatusNotFound, nil)
	} else {
		result := model.GetMyQuestions(id)
		c.JSON(http.StatusOK, result)
	}
}

func GetStudentAnswer(c *gin.Context) {
	id, ok := strconv.Atoi(c.Param("student_id"))
	if ok != nil {
		c.JSON(http.StatusNotFound, nil)
	} else {
		result := model.GetMyAnswers(id)
		c.JSON(http.StatusOK, result)
	}
}

func PostQuestion(c *gin.Context) {
	studentId, _ := strconv.Atoi(c.PostForm("student_id"))
	questionTitle := c.PostForm("question_title")
	questionBody := c.PostForm("body")
	questionGenre, _ := strconv.Atoi(c.PostForm("genre"))
	jwtToken := c.PostForm("jwt")

	questionId, err := model.CreateQuestion(questionTitle, questionBody, jwtToken, studentId, questionGenre)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "入力が正しくない"})
	}
	c.JSON(http.StatusOK, gin.H{
		"questionId": questionId,
	})
}

func PostAnswer(c *gin.Context) {
	studentId, _ := strconv.Atoi(c.PostForm("student_id"))
	questionId, _ := strconv.Atoi(c.PostForm("question_id"))
	questionBody := c.PostForm("body")
	jwtToken := c.PostForm("jwt")

	questionId, state, err := model.CreateAnswer(questionBody, jwtToken, studentId, questionId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "入力が正しくない"})
	}
	c.JSON(http.StatusOK, gin.H{
		"questionId": questionId,
		"state":      state,
	})

}
