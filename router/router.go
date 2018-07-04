package router

import (
	"fmt"
	"net/http"

	"strconv"

	"github.com/Wanted/controller"
	"github.com/gin-gonic/gin"
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
	c.HTML(http.StatusOK, "add_student.html", nil)
}

func GetAdminTeacher(c *gin.Context) {
	c.HTML(http.StatusOK, "add_teacher.html", nil)
}

/**********************	POST ******************************/
func PostTeacher(c *gin.Context) {
	teacherName := c.PostForm("teacher_name")
	teacherPassword := c.PostForm("teacher_password")
	teacherHomeroom := c.PostForm("teacher_homeroom")
	TeacherGradeHomeroom := c.PostForm("teacher_grade_homeroom")
	intTeacherGradeHomeroom, _ := strconv.Atoi(TeacherGradeHomeroom)

	ctrl := controller.NewTeacher()
	post := ctrl.CreateTask(teacherName, teacherPassword, teacherHomeroom, intTeacherGradeHomeroom)
	if post {
		fmt.Println("作成成功")
	}
	fmt.Println(teacherName, teacherPassword, teacherHomeroom, intTeacherGradeHomeroom)

	c.HTML(http.StatusOK, "add_teacher.html", nil)
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

	ctrl := controller.NewStudent()
	post := ctrl.CreateStudent(studentName, intStudentGrade, studentClass, intStudentClassNumber, studentLoginId, studentLoginPassword)
	if post {
		fmt.Println("作成成功")
	}
	fmt.Println(studentName, intStudentGrade, studentClass, intStudentClassNumber, studentLoginId, studentLoginPassword)

	c.HTML(http.StatusOK, "add_student.html", nil)
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
