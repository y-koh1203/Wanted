package model

// 教師テーブルの構造体
type Teacher struct {
	TeacherId   			int    	`json:"teacher_id"`
	TeacherName 			string 	`json:"teacher_name"`
	TeacherGradeHomeroom 	int 	`json:"teacher_grade_homeroom"`
	TeacherHomeroom 		string 	`json:"teacher_homeroom"`
	TeacherPassword 		string 	`json:"teacher_password"`
}

type TeacherRepository struct{}

func NewTeacherRepository() TeacherRepository {
	return TeacherRepository{}
}

var teacher Teacher
var teachers []Teacher

// 指定したIDの教師情報
func (m TeacherRepository) GetByTeacherID(id int) *Teacher {
	db := GormConnect()
	teacher.TeacherId = id
	db.Find(&teacher)
	return &teacher
}

// 全ての教師情報
func (m TeacherRepository) GetAllTeacher() []Teacher {
	db := GormConnect()
	db.Find(&teachers)
	return teachers
}

// 教師の追加
//func (m TeacherRepository) CreateTeacher(text string) bool {
//	db := GormConnect()
//	db.Create(&Teacher{TeacherName: text,TeacherGradeHomeroom: ,TeacherHomeroom: ,TeacherPassword: ,})
//	return true
//}

