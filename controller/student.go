package controller

import "github.com/Wanted/model"

type Student struct {
}

func NewStudent() Student {
	return Student{}
}

//教師の追加
func (c Student) CreateStudent(studentName string, studentGrade int, studentClass string, studentClassNumber int, studentLoginId string, studentLoginPassword string) bool {
	repo := model.NewStudentRepository()
	student := repo.CreateStudent(studentName, studentGrade, studentClass, studentClassNumber, studentLoginId, studentLoginPassword)
	return student
}
