package router

import (
	"github.com/gin-gonic/gin"
	"github.com/wanted/controller"
)

func questionRouter(question *gin.RouterGroup) {
	//質問一覧
	question.GET("/all", controller.GetAllQuestion)
	//質問一覧(特定ユーザー)
	question.GET("/user/:student_id", nil)
	//回答した質問一覧(特定ユーザー)
	question.GET("/answer/user/:student_id", nil)
	//質問詳細
	question.GET("/answer/detail/:question_id", controller.GetQuestionDetail)

	//質問投稿
	question.POST("/post", nil)
	//回答投稿
	question.POST("/answer/post", nil)
}
