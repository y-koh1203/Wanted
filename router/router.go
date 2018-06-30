package router

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

/**********************	GET	******************************/
func GetSample(c *gin.Context) {
	c.JSON(200, gin.H{
		"json": "hello",
	})
}

func GetIndex(c *gin.Context) {
	c.HTML(http.StatusOK, "index.html", nil)
}

func GetAdmin(c *gin.Context) {
	c.HTML(http.StatusOK, "admin.html", nil)
}

/**********************	POST ******************************/
func PostAdmin(c *gin.Context) {
	//入力フィールドの値をtextに格納
	text := c.PostForm("student_class")
	fmt.Println(text)

	c.HTML(http.StatusOK, "index.html", nil)
}

/**********************	PUT ******************************/
/**********************	DELETE ******************************/
/**********************	NOROUTE ******************************/
func NoRoute(c *gin.Context) {
	c.HTML(http.StatusOK, "index.html", nil)
}
