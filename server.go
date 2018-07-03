package main

import (
	"github.com/Wanted/router"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.Static("/assets", "./assets")
	r.LoadHTMLGlob("./templates/*")

	/**********************	ルーティング ******************************/
	r.GET("/", router.GetIndex)
	r.GET("/get", router.GetIndex)
	r.GET("/admin", router.GetAdmin)
	r.GET("/admin/teacher", router.GetAdminTeacher)
	r.POST("/login/user", router.PostLogin)
	r.POST("/admin/post", router.PostAdmin)
	r.NoRoute(router.NoRoute)

	/**********************	サーバ起動 ******************************/
	//local
	r.Run(":5000")
}
