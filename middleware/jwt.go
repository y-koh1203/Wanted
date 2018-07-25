package middleware

import (
	"github.com/makki0205/gojwt"
)

func NewJwt(loginId string, loginPassWord string) string {
	jwt.SetSalt("D79998A7-3F2B-4505-BE2B-6E68500AAE37")
	jwt.SetExp(60 * 60 * 24)

	claims := map[string]string{
		"id":   loginId,
		"pass": loginPassWord,
	}
	newToken := jwt.Generate(claims)

	return newToken
}
