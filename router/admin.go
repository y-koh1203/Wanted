package router

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/wanted/controller"
)

func adminRouter(admin *gin.RouterGroup) {
	admin.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "admin.html", nil)
	})

	admin.GET("/student", func(c *gin.Context) {
		c.HTML(http.StatusOK, "add_student.html", nil)
	})

	admin.GET("/teacher", func(c *gin.Context) {
		c.HTML(http.StatusOK, "add_teacher.html", nil)
	})

	admin.POST("/teacher/post", controller.PostTeacher)
	admin.POST("/student/post", controller.PostStudent)
}
