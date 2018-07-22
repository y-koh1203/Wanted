package model

// 教師テーブルの構造体
type Teacher struct {
	TeacherId            int    `json:"teacher_id"`
	TeacherName          string `json:"teacher_name"`
	TeacherGradeHomeroom int    `json:"teacher_grade_homeroom"`
	TeacherHomeroom      string `json:"teacher_homeroom"`
	TeacherPassword      string `json:"teacher_password"`
	DeleteFlg            int    `json:"delete_flf"`
}

var teacher Teacher
var teachers []Teacher

func CreateTeacher(teacherName, teacherPassword, teacherHomeroom string, teacherGradeHomeroom int) bool {
	db := GormConnect()
	teacher.TeacherName = teacherName
	teacher.TeacherPassword = teacherPassword
	teacher.TeacherHomeroom = teacherHomeroom
	teacher.TeacherGradeHomeroom = teacherGradeHomeroom
	teacher.DeleteFlg = 1
	db.Create(&teacher)

	defer db.Close()
	return true
}
