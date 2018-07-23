package model

type Question struct {
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

var questions []Question
var question Question
var answers []Answer
var tags []Tag

func GetAllQuestion() *[]Question {
	db := GormConnect()

	questionColumn := "questions.question_id, students.student_name, questions.question_title, questions.question_body, questions.create_at, students.student_profile_image, genres.genre_name"

	db.Table("questions").
		Select(questionColumn).
		Joins("INNER JOIN students ON (questions.student_id = students.student_id)").
		Joins("INNER JOIN genres ON questions.question_id = genres.question_id").
		Find(&questions)

	for i, question := range questions {
		db.Model(&question).Where("question_id = ?", question.QuestionId).Find(&tags)
		questions[i].Tags = tags
	}

	db.Close()
	return &questions
}

func GetQuestionDetail(id int) *Question {
	db := GormConnect()
	c1 := make(chan []Tag)
	c2 := make(chan []Answer)

	questionColumn := "questions.question_id, students.student_name, questions.question_title, questions.question_body, questions.create_at, students.student_profile_image, genres.genre_name"
	answerColumn := "answers.answer_id,answers.answer_body,answers.answer_like,answers.create_at,students.student_name"

	db.Table("questions").
		Select(questionColumn).
		Joins("INNER JOIN students ON (questions.student_id = students.student_id)").
		Joins("INNER JOIN genres ON questions.question_id = genres.question_id").
		Where("questions.question_id = ?", id).
		Find(&question)

	go func() {
		db.Model(&question).Where("question_id = ?", question.QuestionId).Find(&tags)
		c1 <- tags
		close(c1)
	}()

	go func() {
		db.Model(&question).Table("answers").Select(answerColumn).
			Joins("INNER JOIN students ON (answers.student_id = students.student_id)").
			Where("question_id = ?", question.QuestionId).
			Find(&answers)
		c2 <- answers
		close(c2)
	}()

	tags := <-c1
	answers := <-c2

	question.Tags = tags
	question.Answer = answers

	db.Close()
	return &question
}

func GetMyQuestions(id int) *[]Question {
	db := GormConnect()

	questionColumn := "questions.question_id, students.student_name, questions.question_title, questions.question_body, questions.create_at, students.student_profile_image, genres.genre_name"

	db.Table("questions").
		Select(questionColumn).
		Joins("INNER JOIN students ON (questions.student_id = students.student_id)").
		Joins("INNER JOIN genres ON questions.question_id = genres.question_id").
		Where("questions.student_id = ?", id).
		Find(&questions)

	for i, question := range questions {
		db.Model(&question).Where("question_id = ?", question.QuestionId).Find(&tags)
		questions[i].Tags = tags
	}

	db.Close()
	return &questions
}

func GetMyAnswers(id int) *[]Question {
	db := GormConnect()

	questionColumn := "questions.question_id, students.student_name, questions.question_title, questions.question_body, questions.create_at, students.student_profile_image, genres.genre_name"

	db.Table("questions").
		Select(questionColumn).
		Joins("INNER JOIN students ON (questions.student_id = students.student_id)").
		Joins("INNER JOIN genres ON questions.question_id = genres.question_id").
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
