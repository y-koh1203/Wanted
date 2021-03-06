package model

import (
	"fmt"
	"sync"

	"sort"

	"github.com/makki0205/gojwt"
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
	QuestionId          int `json:"question_id"`
	StudentId           int
	StudentName         string         `json:"post_user"`
	GenreName           string         `json:"genre"`
	QuestionTitle       string         `json:"question_title"`
	QuestionBody        string         `json:"question_body"`
	StudentProfileImage string         `json:"icon"`
	CreateAt            string         `json:"question_date"`
	Tags                []Tag          `json:"question_tags"`
	Answer              []ResultAnswer `json:"answers"`
}

type Tag struct {
	TagId      int    `json:"tag_id"`
	QuestionId int    `json:"tag_question_id"`
	TagName    string `json:"tag_name"`
}

type Answer struct {
	AnswerId   int
	QuestionId int
	StudentId  int
	AnswerBody string
	AnswerLike int
}

type ResultAnswer struct {
	AnswerId    int    `json:"answer_id"`
	StudentName string `json:"post_user"`
	AnswerBody  string `json:"answer_body"`
	AnswerLike  int    `json:"like"`
	CreateAt    string `json:"answer_date"`
}

type sortApproximation struct {
	questionId    int
	approximation int
	StudentId     int
}

type Notification struct {
	NotificationId int
	QuestionId     int
	StudentId      int
	approximation  int
}

var questions []ResultQuestion
var question1 ResultQuestion
var answers []ResultAnswer
var tags []Tag
var tag Tag

func GetQuestion(searchStr string) *[]ResultQuestion {
	db := GormConnect()

	questionColumn := "questions.question_id, students.student_name, questions.question_title, questions.question_body, questions.create_at, students.student_profile_image, genres.genre_name"

	db.Table("questions").
		Select(questionColumn).
		Joins("INNER JOIN students ON (questions.student_id = students.student_id)").
		Joins("INNER JOIN genres ON questions.genre_id = genres.genre_id").
		Where("questions.question_body like ?", "%"+searchStr+"%").
		Find(&questions)

	for i, question := range questions {
		db.Model(&question).Where("question_id = ?", question.QuestionId).Find(&tags)
		questions[i].Tags = tags
	}

	db.Close()
	return &questions
}

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
	return &questions
}

func GetQuestionDetail(id int) *ResultQuestion {
	db := GormConnect()
	c1 := make(chan []Tag)
	c2 := make(chan []ResultAnswer)

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

func GetNotification(id int) *[]ResultQuestion {
	db := GormConnect()

	questionColumn := "questions.question_id, students.student_name, questions.question_title, questions.question_body, questions.create_at, students.student_profile_image, genres.genre_name"

	db.Table("notifications").
		Select(questionColumn).
		Joins("INNER JOIN questions ON (notifications.question_id = questions.question_id)").
		Joins("INNER JOIN students ON (notifications.student_id = students.student_id)").
		Joins("INNER JOIN genres ON (questions.genre_id = genres.genre_id)").
		Where("notifications.student_id = ?", id).
		Find(&questions)

	for i, question := range questions {
		db.Model(&question).Where("question_id = ?", question.QuestionId).Find(&tags)
		questions[i].Tags = tags
	}

	db.Close()
	return &questions
}

func CreateQuestion(questionTitle, questionBody, jwtToken string, studentId, questionGenre int) (int, error) {
	db := GormConnect()
	mutex := new(sync.Mutex)
	mutex.Lock()
	defer mutex.Unlock()
	defer db.Close()

	question := Question{}
	question.StudentId = studentId
	question.GenreId = questionGenre
	question.QuestionTitle = questionTitle
	question.QuestionBody = questionBody

	_, err := jwt.Decode(jwtToken)
	if err != nil {
		return 0, err
	} else {
		if err := db.Create(&question).Error; err != nil {
			return 0, err
		} else {
			db.Raw("SELECT question_id FROM questions ORDER BY question_id DESC").First(&question)

			tags := analysis.MorphologicalAnalysis(questionBody)
			for _, item := range tags {
				tag.TagName = item
				tag.QuestionId = question.QuestionId
				db.Create(&tag)
			}

			questionColumn := "questions.question_id, students.student_id, students.student_name, questions.question_title, questions.question_body, questions.create_at, students.student_profile_image, genres.genre_name"

			db.Table("questions").
				Select(questionColumn).
				Joins("INNER JOIN students ON (questions.student_id = students.student_id)").
				Joins("INNER JOIN genres ON questions.genre_id = genres.genre_id").
				Where("questions.genre_id = ?", question.GenreId).
				Not("questions.question_id = ?", question.QuestionId).
				Find(&questions)

			standard := 50
			var ss []sortApproximation
			for _, question := range questions {
				fmt.Println(questionBody, question.QuestionBody)
				approximation := analysis.LevenshteinDistance(questionBody, question.QuestionBody)
				if standard >= approximation {
					ss = append(ss, sortApproximation{question.QuestionId, approximation, question.StudentId})
				}
			}

			if ss != nil {
				sort.Slice(ss, func(i, j int) bool {
					return ss[i].approximation < ss[j].approximation
				})

				notification := Notification{}
				notification.QuestionId = ss[0].questionId
				notification.StudentId = ss[0].StudentId
				notification.approximation = ss[0].approximation

				db.Create(&notification)
			}

			return question.QuestionId, err
		}

	}
}

func CreateAnswer(questionBody, jwtToken string, studentId, questionId int) (int, bool, error) {
	db := GormConnect()
	mutex := new(sync.Mutex)
	mutex.Lock()
	defer mutex.Unlock()
	defer db.Close()

	answer := Answer{}
	answer.QuestionId = questionId
	answer.StudentId = studentId
	answer.AnswerBody = questionBody

	state := false
	_, err := jwt.Decode(jwtToken)
	if err != nil {
		return 0, state, err
	} else {
		count := 0
		db.Where("question_id = ? AND student_id = ?", questionId, studentId).Find(&answer).Count(&count)
		switch count {
		case 0:
			if err := db.Create(&answer).Error; err != nil {
				return 0, state, err
			} else {
				state = true
				return questionId, state, err
			}
		}
		return 0, state, err
	}
}
