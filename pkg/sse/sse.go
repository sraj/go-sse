package sse

import (
	"fmt"
	"net/http"
)

type ESHandler func(*ESContext)

type ESContext struct {
	Response http.ResponseWriter
	Request  *http.Request

	http.Flusher
	http.CloseNotifier
}

func (c *ESContext) Send(message string) {
	c.Response.Write([]byte(fmt.Sprintf("data: %s", message)))
	c.Response.Write([]byte("\n\n"))
	c.Flush()
}

func (h ESHandler) ServeHTTP(resp http.ResponseWriter, req *http.Request) {

	var flusher http.Flusher
	var closer http.CloseNotifier

	if flusher, _ = resp.(http.Flusher); flusher == nil {
		http.Error(resp, "EventSource streaming unsupported!", http.StatusInternalServerError)
		return
	}

	if closer, _ = resp.(http.CloseNotifier); closer == nil {
		http.Error(resp, "EventSource streaming unsupported!", http.StatusInternalServerError)
		return
	}

	//EventSource Headers
	resp.Header().Set("Connection", "keep-alive")
	resp.Header().Set("Content-Type", "text/event-stream")
	resp.Header().Set("Cache-Control", "no-cache")
	resp.Header().Set("Transfer-Encoding", "chunked")

	h(&ESContext{resp, req, flusher, closer})
}
