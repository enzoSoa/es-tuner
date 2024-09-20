package main

import (
	server "es-tuner/backend/src"
	"net/http"
)

func main() {
	http.HandleFunc("/", server.Hello)
	http.ListenAndServe(":8080", nil)
}
