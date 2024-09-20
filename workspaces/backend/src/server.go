package server

import (
	"fmt"
	"net/http"
)

func Hello(res http.ResponseWriter, req *http.Request) {
	fmt.Fprintf(res, "Welcome on es-tuner api")
}

func Non(res http.ResponseWriter, req *http.Request) {
	fmt.Fprintf(res, "Non")
}
