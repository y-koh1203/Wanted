package main

import (
	"fmt"
	"net/http"
	"github.com/gin-gonic/gin"
)

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello, World")
}

func main() {
	router := gin.Default()
	router.GET("/",func(c *gin.Context){
		c.JSON(200,gin.H{"id":"1"})
	})
	
	router.Run(":5000")
	// http.HandleFunc("/", handler) // ハンドラを登録してウェブページを表示させる
	// http.ListenAndServe(":8080", nil)
}