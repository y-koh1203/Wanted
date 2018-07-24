package model

import (
	"fmt"
	"sync"

	"github.com/wanted/analysis"
)

type Question struct {
	QuestionId    int
	StudentId     int
	GenreId       int
	QuestionTitle string
	QuestionBody  string
}

type ResultQuestion struct {
	QuestionId          int      `json:"question_id"`
	StudentName         string   `json:"post_user"`
	GenreName           string   `json:"genre"`
	QuestionTitle       string   `json:"question_title"`
	QuestionBody        string   `json:"question_body"`
	StudentProfileImage string   `json:"icon"`
	CreateAt            string   `json:"question_date"`
	Tags                []Tag    `json:"question_tags"`
	Answer              []Answer `json:"answers"`
}

type Tag struct {
	TagId      int    `json:"tag_id"`
	QuestionId int    `json:"tag_question_id"`
	TagName    string `json:"tag_name"`
}

type Answer struct {
	AnswerId    int    `json:"answer_id"`
	StudentName string `json:"post_user"`
	AnswerBody  string `json:"answer_body"`
	AnswerLike  int    `json:"like"`
	CreateAt    string `json:"answer_date"`
}

var questions []ResultQuestion
var question1 ResultQuestion
var question Question
var answers []Answer
var tags []Tag
var tag Tag

func GetAllQuestion() *[]ResultQuestion {
	db := GormConnect()

	questionColumn := "questions.question_id, students.student_name, questions.question_title, questions.question_body, questions.create_at, students.student_profile_image, genres.genre_name"

	db.Table("questions").
		Select(questionColumn).
		Joins("INNER JOIN students ON (questions.student_id = students.student_id)").
		Joins("INNER JOIN genres ON questions.genre_id = genres.genre_id").
		Find(&questions)

	for i, question := range questions {
		db.Model(&question).Where("question_id = ?", question.QuestionId).Find(&tags)
		questions[i].Tags = tags
	}

	db.Close()
	fmt.Println(questions)
	return &questions
}

func GetQuestionDetail(id int) *ResultQuestion {
	db := GormConnect()
	c1 := make(chan []Tag)
	c2 := make(chan []Answer)

	questionColumn := "questions.question_id, students.student_name, questions.question_title, questions.question_body, questions.create_at, students.student_profile_image, genres.genre_name"
	answerColumn := "answers.answer_id,answers.answer_body,answers.answer_like,answers.create_at,students.student_name"

	db.Table("questions").
		Select(questionColumn).
		Joins("INNER JOIN students ON (questions.student_id = students.student_id)").
		Joins("INNER JOIN genres ON questions.genre_id = genres.genre_id").
		Where("questions.question_id = ?", id).
		Find(&question1)

	go func() {
		db.Model(&question1).Where("question_id = ?", question1.QuestionId).Find(&tags)
		c1 <- tags
		close(c1)
	}()

	go func() {
		db.Model(&question1).Table("answers").Select(answerColumn).
			Joins("INNER JOIN students ON (answers.student_id = students.student_id)").
			Where("question_id = ?", question1.QuestionId).
			Find(&answers)
		c2 <- answers
		close(c2)
	}()

	tags := <-c1
	answers := <-c2

	question1.Tags = tags
	question1.Answer = answers

	db.Close()
	return &question1
}

func GetMyQuestions(id int) *[]ResultQuestion {
	db := GormConnect()

	questionColumn := "questions.question_id, students.student_name, questions.question_title, questions.question_body, questions.create_at, students.student_profile_image, genres.genre_name"

	db.Table("questions").
		Select(questionColumn).
		Joins("INNER JOIN students ON (questions.student_id = students.student_id)").
		Joins("INNER JOIN genres ON questions.genre_id = genres.genre_id").
		Where("questions.student_id = ?", id).
		Find(&questions)

	for i, question := range questions {
		db.Model(&question).Where("question_id = ?", question.QuestionId).Find(&tags)
		questions[i].Tags = tags
	}

	db.Close()
	return &questions
}

func GetMyAnswers(id int) *[]ResultQuestion {
	db := GormConnect()

	questionColumn := "questions.question_id, students.student_name, questions.question_title, questions.question_body, questions.create_at, students.student_profile_image, genres.genre_name"

	db.Table("questions").
		Select(questionColumn).
		Joins("INNER JOIN students ON (questions.student_id = students.student_id)").
		Joins("INNER JOIN genres ON questions.genre_id = genres.genre_id").
		Joins("INNER JOIN answers ON (questions.question_id = answers.question_id)").
		Where("answers.student_id = ?", id).
		Find(&questions)

	for i, question := range questions {
		db.Model(&question).Where("question_id = ?", question.QuestionId).Find(&tags)
		questions[i].Tags = tags
	}

	db.Close()
	return &questions
}

func CreateQuestion(questionTitle, questionBody, jwtToken string, studentId, questionGenre int) bool {
	mutex := new(sync.Mutex)
	mutex.Lock()
	db := GormConnect()

	question.StudentId = studentId
	question.GenreId = questionGenre
	question.QuestionTitle = questionTitle
	question.QuestionBody = questionBody
	db.Create(&question).Last(&question)

	fmt.Println(question.QuestionId)

	tags := analysis.MorphologicalAnalysis(questionBody)
	for _, val := range tags {
		tag.TagName = val
		tag.QuestionId = question.QuestionId
		db.Create(&tag)
	}

	db.Close()
	mutex.Unlock()

	return true
}
