package main

import (
	server "es-tuner/backend/src"
	"net/http"
)

func main() {
	http.HandleFunc("/", server.Hello)
	http.HandleFunc("/non", server.Non)
	http.ListenAndServe(":8080", nil)
}
