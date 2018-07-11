package router

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// GetRouter ルーターを設定してgin.Engineを返す
func GetRouter() *gin.Engine {
	r := gin.Default()
	r.Static("/assets", "./assets")
	r.LoadHTMLGlob("./templates/*")

	r.POST("/login", nil)
	r.NoRoute(func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", nil)
	})

	//質問グループ
	question := r.Group("/question")
	questionRouter(question)

	//生徒グループ
	student := r.Group("/student")
	studentRouter(student)

	//管理グループ
	admin := r.Group("/admin")
	adminRouter(admin)

	return r
}
