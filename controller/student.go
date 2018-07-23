package controller

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/wanted/model"
)

func GetByStudentId(c *gin.Context) {
	n := c.Param("student_id")
	id, _ := strconv.Atoi(n)

	result := model.GetByStudentId(id)
	c.JSON(http.StatusOK, result)
}

func PostStudent(c *gin.Context) {
	studentName := c.PostForm("student_name")
	studentGrade := c.PostForm("student_grade")
	studentClass := c.PostForm("student_class")
	studentClassNumber := c.PostForm("student_class_number")
	studentLoginPassword := c.PostForm("student_login_password")
	studentLoginId := studentClass + studentClassNumber

	intStudentGrade, _ := strconv.Atoi(studentGrade)
	intStudentClassNumber, _ := strconv.Atoi(studentClassNumber)

	post := model.CreateStudent(studentName, studentClass, studentLoginId, studentLoginPassword, intStudentClassNumber, intStudentGrade)
	if !post {
		fmt.Println("作成失敗")
	}

	fmt.Println(studentName, intStudentGrade, studentClass, intStudentClassNumber, studentLoginId, studentLoginPassword)
	c.HTML(http.StatusOK, "add_student.html", nil)
}

func LoginStudent(c *gin.Context) {
	loginId := c.PostForm("login_id")
	loginPassWord := c.PostForm("pattern")

	c1 := make(chan []model.Question)
	c2 := make(chan []model.Question)

	studentProfile, token, nil := model.LoginStudent(loginId, loginPassWord)
	if !nil {
		c.JSON(http.StatusNotFound, nil)
	}

	go func() {
		myQuestion := model.GetMyQuestions(studentProfile.StudentId)
		c1 <- *myQuestion
		close(c1)
	}()

	go func() {
		myAnswer := model.GetMyAnswers(studentProfile.StudentId)
		c2 <- *myAnswer
		close(c2)
	}()

	myQuestion := <-c1
	myAnswer := <-c2

	c.JSON(http.StatusOK, gin.H{
		"studentProfile": studentProfile,
		"myQuestion":     myQuestion,
		"myAnswer":       myAnswer,
		"jwtToken":       token,
	})
}
