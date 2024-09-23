package main

import (
    "encoding/json"
    "net/http"
    "fmt"
    "sync"
    "github.com/rs/cors"
)

type Task struct {
    ID        int    `json:"id"`
    Title     string `json:"title"`
    Completed bool   `json:"completed"`
}

var (
    tasks  = []Task{}
    nextID = 1
    mu     sync.Mutex
)

func getTasksHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(tasks)
}

func createTaskHandler(w http.ResponseWriter, r *http.Request) {
    var task Task
    if err := json.NewDecoder(r.Body).Decode(&task); err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }
    mu.Lock()
    task.ID = nextID
    nextID++
    tasks = append(tasks, task)
    mu.Unlock()

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(task)
}

func completeTaskHandler(w http.ResponseWriter, r *http.Request) {
    id := r.URL.Query().Get("id")
    mu.Lock()
    defer mu.Unlock()
    
    for i, task := range tasks {
        if fmt.Sprintf("%d", task.ID) == id {
            tasks[i].Completed = !tasks[i].Completed
            json.NewEncoder(w).Encode(tasks[i])
            return
        }
    }
    http.Error(w, "Task not found", http.StatusNotFound)
}

func deleteTaskHandler(w http.ResponseWriter, r *http.Request) {
    id := r.URL.Query().Get("id")
    mu.Lock()
    defer mu.Unlock()
    
    for i, task := range tasks {
        if fmt.Sprintf("%d", task.ID) == id {
            tasks = append(tasks[:i], tasks[i+1:]...)
            w.WriteHeader(http.StatusNoContent)
            return
        }
    }
    http.Error(w, "Task not found", http.StatusNotFound)
}

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("/api/tasks", getTasksHandler)
    mux.HandleFunc("/api/tasks/create", createTaskHandler)
    mux.HandleFunc("/api/tasks/complete", completeTaskHandler)
    mux.HandleFunc("/api/tasks/delete", deleteTaskHandler)

    c := cors.New(cors.Options{
        AllowedOrigins: []string{"*"},
        AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
        AllowedHeaders: []string{"Content-Type"},
    })

    fmt.Println("Server is running on port 8080...")
    http.ListenAndServe(":8080", c.Handler(mux))
}
