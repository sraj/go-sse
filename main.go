package main

import (
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"runtime"
	"time"

	"github.com/sraj/go-sse/pkg/sse"
	"github.com/unrolled/render"
)

func main() {

	runtime.GOMAXPROCS(runtime.NumCPU())

	rend := render.New(render.Options{
		Directory:     "./resources/templates",
		Extensions:    []string{".tmpl", ".html"},
		IsDevelopment: true,
		Charset:       "UTF-8",
	})

	hub := sse.NewSSEHub()
	hub.Start()

	mux := http.NewServeMux()
	mux.Handle("/assets/", http.StripPrefix("/assets/", http.FileServer(http.Dir("./resources/assets"))))

	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		rend.HTML(w, http.StatusOK, "index", "")
	})

	mux.Handle("/events", sse.ESHandler(func(c *sse.ESContext) {
		messageChan := make(chan string)
		hub.Register(messageChan)
		for {
			select {
			case msg, _ := <-messageChan:
				c.Send(msg)
			case <-time.After(time.Second * 20):
				c.Send("noop")
			case <-c.CloseNotify():
				hub.Unregister(messageChan)
				log.Println("ES connection closed.")
				return
			}
		}
	}))

	go func(h *sse.SSEHub) {
		r1 := rand.New(rand.NewSource(time.Now().UnixNano()))
		for {
			select {
			case <-time.After(time.Second * 1):
				randInt := r1.Intn(100)
				log.Printf("Publishing message %d", randInt)
				h.Broadcast(fmt.Sprintf("%d", randInt))
			}
		}
	}(hub)

	http.ListenAndServe(":8080", mux)
}
