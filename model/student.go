package model

// 教師テーブルの構造体
type Student struct {
	StudentId            int    `json:"student_id"`
	StudentName          string `json:"student_name""`
	StudentGrade         int    `json:"student_grade""`
	StudentClass         string `json:"student_class""`
	StudentClassNumber   int    `json:"student_class_number""`
	StudentLoginId       string `json:"student_login_id"`
	StudentLoginPassword string `json:"student_login_password"`
	DeleteFlg            int    `json:"delete_flf"`
}

type StudentRepository struct{}

func NewStudentRepository() StudentRepository {
	return StudentRepository{}
}

var student Student
var students []Student

//生徒の追加
func (m StudentRepository) CreateStudent(studentName string, studentGrade int, studentClass string, studentClassNumber int, studentLoginId string, studentLoginPassword string) bool {
	db := GormConnect()
	student.StudentName = studentName
	student.StudentGrade = studentGrade
	student.StudentClass = studentClass
	student.StudentClassNumber = studentClassNumber
	student.StudentLoginId = studentLoginId
	student.StudentLoginPassword = studentLoginPassword
	student.DeleteFlg = 1
	db.Create(&student)
	return true
}
