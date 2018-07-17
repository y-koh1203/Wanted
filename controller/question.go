package controller

import (
	"net/http"

	"strconv"

	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/wanted/model"
)

func GetAllQuestion(c *gin.Context) {
	result := model.GetAllQuestion()
	c.JSON(http.StatusOK, result)
}

func GetQuestionDetail(c *gin.Context) {
	n := c.Param("question_id")
	id, _ := strconv.Atoi(n)

	fmt.Println(id)

	result := model.GetQuestionDetail(id)
	c.JSON(http.StatusOK, result)
}
