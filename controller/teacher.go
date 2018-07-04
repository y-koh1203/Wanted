package controller

import "github.com/Wanted/model"

type Teacher struct {
}

func NewTeacher() Teacher {
	return Teacher{}
}

//教師の追加
func (c Teacher) CreateTask(teacherName string, teacherPassword string, teacherHomeroom string, teacherGradeHomeroom int) bool {
	repo := model.NewTeacherRepository()
	teacher := repo.CreateTeacher(teacherName, teacherPassword, teacherHomeroom, teacherGradeHomeroom)
	return teacher
}
