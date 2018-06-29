package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/makki0205/gojwt"
)

func main() {
	jwt.SetSalt("foo1")
	router := gin.Default()

	router.Static("/assets", "./assets")
	router.LoadHTMLGlob("./templates/*")

	router.NoRoute(func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", gin.H{})
	})

	//router.POST("/", func(c *gin.Context) {
	//	//入力フィールドの値をtextに格納
	//	text := c.PostForm("text")
	//	fmt.Print(text)
	//
	//	c.HTML(http.StatusOK, "index.html", gin.H{})
	//})

	router.Run(":5000")
}
