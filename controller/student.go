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
	studentGrade, _ := strconv.Atoi(c.PostForm("student_grade"))
	studentClass := c.PostForm("student_class")
	studentClassNumber := c.PostForm("student_class_number")
	studentLoginPassword := c.PostForm("student_login_password")
	studentLoginId := studentClass + studentClassNumber
	intStudentClassNumber, _ := strconv.Atoi(studentClassNumber)

	post := model.CreateStudent(studentName, studentClass, studentLoginId, studentLoginPassword, intStudentClassNumber, studentGrade)
	if !post {
		fmt.Println("作成失敗")
	}

	fmt.Println(studentName, studentClassNumber, studentClass, studentClassNumber, studentLoginId, studentLoginPassword)
	c.HTML(http.StatusOK, "add_student.html", nil)
}

func LoginStudent(c *gin.Context) {
	loginId := c.PostForm("login_id")
	loginPassWord := c.PostForm("pattern")

	studentProfile, token, ok := model.LoginStudent(loginId, loginPassWord)
	if !ok {
		c.JSON(http.StatusBadRequest, gin.H{"message": "IDまたはパスワードが正しくない"})
	} else {

		myQuestion := *model.GetMyQuestions(studentProfile.StudentId)
		myAnswer := *model.GetMyAnswers(studentProfile.StudentId)

		fmt.Println(studentProfile)
		fmt.Println(myQuestion)
		fmt.Println(myAnswer)
		fmt.Println(token)
		c.JSON(http.StatusOK, gin.H{
			"studentProfile": studentProfile,
			"myQuestion":     myQuestion,
			"myAnswer":       myAnswer,
			"jwtToken":       token,
		})
	}
}
