package analysis

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

type Api struct {
	RequestID  string       `json:"request_id"`
	InfoFilter string       `json:"info_filter"`
	PosFilter  string       `json:"pos_filter"`
	WordList   [][][]string `json:"word_list"`
}

func MorphologicalAnalysis(body string) []string {
	jsonStr := `{"app_id":"70111c53c0235ff7bb9b0d5f97e4b79ce0b4c74435a41fa5ae1586b7e4b77ed5","sentence":"` + body + `","info_filter":"form","pos_filter":"名詞"}`

	req, err := http.NewRequest(
		"POST",
		"https://labs.goo.ne.jp/api/morph",
		bytes.NewBuffer([]byte(jsonStr)),
	)

	if err != nil {
		fmt.Println("失敗")
	}

	// Content-Type 設定
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)

	if err != nil {
		fmt.Println("失敗")
	}
	defer resp.Body.Close()

	result := execute(resp)
	return result
}

func execute(response *http.Response) []string {
	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		fmt.Println(err)
	}

	var api Api
	json.Unmarshal(body, &api)

	m := make(map[string]bool)
	result := []string{}

	for _, array1 := range api.WordList {
		for _, array2 := range array1 {
			for _, array3 := range array2 {
				if !m[array3] {
					m[array3] = true
					result = append(result, array3)
				}
			}
		}
	}

	return result
}
