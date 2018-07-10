package model

import "fmt"

// Studentテーブルの構造体
type StudentTable struct {
	StudentId            int
	StudentName          string
	StudentGrade         int
	StudentClass         string
	StudentClassNumber   int
	StudentLoginId       string
	StudentLoginPassword string
	StudentNickName      string
	StudentProfileImage  string
	DeleteFlg            int
}

// 生徒のプロフィール用構造体
type Student struct {
	StudentId           int    `json:"student_id"`
	StudentName         string `json:"student_name"`
	StudentGrade        int    `json:"student_grade"`
	StudentClass        string `json:"student_class"`
	StudentClassNumber  int    `json:"student_class_number"`
	StudentNickName     string `json:"student_nick_name"`
	StudentProfileImage string `json:"student_profile_image"`
}

var studentTable StudentTable
var student Student
var students []Student

func GetByStudentId(id int) *Student {
	db := GormConnect()
	defer db.Close()
	fmt.Println(id)

	db.Where("student_id = ?", id).First(&student)
	return &student
}

func CreateStudent(studentName string, studentGrade int, studentClass string, studentClassNumber int, studentLoginId string, studentLoginPassword string) bool {
	db := GormConnect()

	studentTable.StudentName = studentName

	db.Create(&student)
	defer db.Close()
	return true
}
