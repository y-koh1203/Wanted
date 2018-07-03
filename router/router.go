package router

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"fmt"
)

/**********************	GET	******************************/
func GetSample(c *gin.Context) {
}

func GetIndex(c *gin.Context) {
	c.HTML(http.StatusOK, "index.html", nil)
}

func GetAdmin(c *gin.Context) {
	c.HTML(http.StatusOK, "admin.html", nil)
}

func GetAdminStudent(c *gin.Context) {
	c.HTML(http.StatusOK,"add_student.html", nil)
}

func GetAdminTeacher(c *gin.Context) {
	c.HTML(http.StatusOK, "add_teacher.html", nil)
}

/**********************	POST ******************************/
func PostTeacher(c *gin.Context) {
	teacherName := c.PostForm("teacher_name")
	teacherPassword := c.PostForm("teacher_password")
	teacherGradeHomeroom := c.PostForm("teacher_grade_homeroom")
	teacherHomeroom := c.PostForm("teacher_class")

	fmt.Println(teacherName)
	fmt.Println(teacherPassword)
	fmt.Println(teacherGradeHomeroom)
	fmt.Println(teacherHomeroom)

	//c.JSON(http.StatusOK,
}

func PostAdmin(c *gin.Context) {
	//入力フィールドの値をtextに格納
	text := c.PostForm("student_class")
	c.JSON(http.StatusOK, gin.H{
		"json": text,
	})
}

func PostLogin(c *gin.Context) {
	//入力フィールドの値をtextに格納
	id := c.PostForm("student_class")

	c.JSON(http.StatusOK, gin.H{
		"id":    id,
		"token": "WCVBNSKJBBJBDJB",
	})
}

/**********************	PUT ******************************/
/**********************	DELETE ******************************/
/**********************	NOROUTE ******************************/
func NoRoute(c *gin.Context) {
	c.HTML(http.StatusOK, "index.html", nil)
}
