package sse

import "log"

type SSEHub struct {
	// Registered connections.
	connections map[chan string]bool

	//Inbound messages to the connections.
	messages chan string

	// Register messaging channel for the request.
	register chan chan string

	//Unregister messaging channel for the request.
	unregister chan chan string
}

func NewSSEHub() *SSEHub {
	return &SSEHub{
		connections: make(map[chan string]bool),
		messages:    make(chan string),
		register:    make(chan (chan string)),
		unregister:  make(chan (chan string)),
	}
}

func (t *SSEHub) Register(regReq chan string) {
	t.register <- regReq
}

func (t *SSEHub) Unregister(unregReq chan string) {
	t.unregister <- unregReq
}

func (t *SSEHub) Broadcast(message string) {
	t.messages <- message
}

func (t *SSEHub) Start() {
	//Start new goroutine
	go func() {
		//Start endless loop
		for {
			//Block till we receive from the channels
			select {
			case regReq := <-t.register:
				t.connections[regReq] = true
				log.Println("Registered new connection")

			case unregReq := <-t.unregister:
				delete(t.connections, unregReq)
				close(unregReq)
				log.Println("Unregistered connection")

			case message := <-t.messages:
				for regConn := range t.connections {
					regConn <- message
				}
				log.Printf("Broadcasting message to %d registered connections", len(t.connections))
			}
		}
	}()
}
