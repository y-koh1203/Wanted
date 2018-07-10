package main

import "github.com/wanted/router"

func main() {
	r := router.GetRouter()
	r.Run(":5000")
}
