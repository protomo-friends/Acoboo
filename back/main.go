package main

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
)

func main() {
	fmt.Println("Acoboo api server is running on v0.0.1b")

	e := echo.New()
	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello world!")
	})

	e.POST("/user", func(c echo.Context) error {
		e.Logger.Info(fmt.Sprintf("User %s"))
		return c.String(http.StatusOK, "Added!")
	})

	e.Logger.Fatal(e.Start(":3000"))
}
