package controller

import (
	"github.com/gin-gonic/gin"
	"strconv"
	"fmt"
	"net/http"
	"github.com/wanted/model"
)

func PostTeacher(c *gin.Context) {
	teacherName := c.PostForm("teacher_name")
	teacherPassword := c.PostForm("teacher_password")
	teacherHomeroom := c.PostForm("teacher_homeroom")
	TeacherGradeHomeroom := c.PostForm("teacher_grade_homeroom")
	intTeacherGradeHomeroom, _ := strconv.Atoi(TeacherGradeHomeroom)

	post := model.CreateTeacher(teacherName, teacherPassword, teacherHomeroom, intTeacherGradeHomeroom)
	if !post {
		fmt.Println("作成失敗")
	}

	fmt.Println(teacherName, teacherPassword, teacherHomeroom, intTeacherGradeHomeroom)
	c.HTML(http.StatusOK, "add_teacher.html", nil)
}
