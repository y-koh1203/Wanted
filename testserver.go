package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.Static("/views","./views/dest/")

	r.LoadHTMLGlob("./views/*.html") //ディレクトリの指定
	r.GET("/index", func(context *gin.Context) {
		  context.HTML(200,"index.html","")
	})

	r.Run(":5000")
}
