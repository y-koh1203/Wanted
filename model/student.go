package model

import "fmt"

// Studentテーブルの構造体
type Student struct {
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
type StudentProfile struct {
	StudentId           int    `json:"student_id"`
	StudentName         string `json:"student_name"`
	StudentGrade        int    `json:"student_grade"`
	StudentClass        string `json:"student_class"`
	StudentClassNumber  int    `json:"student_class_number"`
	StudentNickName     string `json:"student_nick_name"`
	StudentProfileImage string `json:"student_profile_image"`
}

var student Student
var students []Student
var studentProfile StudentProfile

func GetByStudentId(id int) *StudentProfile {
	db := GormConnect()
	defer db.Close()
	fmt.Println(id)

	db.Raw("SELECT student_id, student_name, student_grade, student_class, student_class_number, student_nick_name, student_profile_image FROM students WHERE student_id = ?", id).Scan(&studentProfile)
	return &studentProfile
}

func CreateStudent(studentName string, studentGrade int, studentClass string, studentClassNumber int, studentLoginId string, studentLoginPassword string) bool {
	db := GormConnect()
	defer db.Close()

	student.StudentName = studentName
	student.StudentGrade = studentGrade
	student.StudentClass = studentClass
	student.StudentClassNumber = studentClassNumber
	student.StudentLoginId = studentLoginId
	student.StudentLoginPassword = studentLoginPassword
	student.StudentNickName = "ななし"
	student.StudentProfileImage = "default.png"

	db.Create(&student)
	return true
}
