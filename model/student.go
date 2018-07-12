package model

import "github.com/Wanted/middleware"

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
	StudentGrade        int    `json:"grade"`
	StudentClass        string `json:"class"`
	StudentNickName     string `json:"nickname"`
	StudentProfileImage string `json:"path"`
}

var student Student
var students []Student
var studentProfile StudentProfile

func GetByStudentId(id int) *StudentProfile {
	db := GormConnect()

	db.Raw("SELECT student_id, student_name, student_grade, student_class, student_nick_name, student_profile_image FROM students WHERE student_id = ?", id).Scan(&studentProfile)
	db.Close()
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
	student.StudentNickName = "名無し"
	student.StudentProfileImage = "default.png"

	db.Create(&student)
	db.Close()
	return true
}

func LoginStudent(loginId string, loginPassWord string) (*StudentProfile, string, bool) {
	db := GormConnect()

	if not := db.Where("student_login_id = ? AND student_login_password = ?", loginId, loginPassWord).First(&student).Scan(&studentProfile).Error; not != nil {
		return nil, "", false
	}
	token := middleware.NewJwt(loginId, loginPassWord)

	db.Close()
	return &studentProfile, token, true
}
