package router

import (
	"github.com/gin-gonic/gin"
	"github.com/wanted/controller"
)

func questionRouter(question *gin.RouterGroup) {
	//質問一覧
	question.GET("/all", controller.GetAllQuestion)
	//質問一覧(特定ユーザー)
	question.GET("/student/:student_id", controller.GetStudentQuestion)
	//回答した質問一覧(特定ユーザー)
	question.GET("/answer/student/:student_id", controller.GetStudentAnswer)
	//質問詳細
	question.GET("/detail/:question_id", controller.GetQuestionDetail)

	//質問投稿
	question.POST("/post", controller.PostQuestion)

	//回答投稿
	question.POST("/answer/post", controller.PostAnswer)

	//回答更新
	question.PUT("", nil)
}
