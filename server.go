package main

import (
	"fmt"
	"net/http"

	//"github.com/Wanted/analysis"
	"github.com/gin-gonic/gin"
	"github.com/makki0205/gojwt"
)

func main() {
	router := gin.Default()

	//形態素解析
	// analysisText := "人魚は、南の方の海にばかり棲んでいるのではありません。北の海にも棲んでいたのであります。" +
	// 	"北方の海うみの色は、青うございました。あるとき、岩の上に、女の人魚があがって、あたりの景色をながめながら休んでいました。" +
	// 	"小川未明作 赤い蝋燭と人魚より"
	// analysis.Morphological_analysis(analysisText)

	//ユーザ認証
	jwt.SetSalt("null")

	//ルーティング
	router.Static("/assets", "./assets")
	router.LoadHTMLGlob("./templates/*")

	router.GET("/get", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", gin.H{})
	})

	//ログイン処理 受け取り
	router.POST("/login/user", func(c *gin.Context) {
		//入力フィールドの値をtextに格納
		status := c.PostForm("student_class")
		fmt.Println(status)

		c.HTML(http.StatusOK, "index.html", gin.H{})
	})

	router.GET("/admin", func(c *gin.Context) {
		c.HTML(http.StatusOK, "admin.html", gin.H{})
	})

	router.POST("/admin/post", func(c *gin.Context) {
		//入力フィールドの値をtextに格納
		text := c.PostForm("student_class")
		fmt.Println(text)

		c.HTML(http.StatusOK, "index.html", gin.H{})
	})

	router.NoRoute(func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", nil)
	})

	router.Run(":5000")
}
