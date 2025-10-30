package com.example.todo.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.todo.dto.StatusUpdateRequest;
import com.example.todo.dto.TaskRequest;
import com.example.todo.model.Status;
import com.example.todo.model.Task;
import com.example.todo.repository.TaskRepository;

@Service
public class TaskService {
    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public Task create(TaskRequest req) {
        Task t = new Task();
        t.setName(req.getName());
        t.setPriority(req.getPriority());
        t.setStatus(Status.PENDING);
        t.setDescription(req.getDescription());
        return taskRepository.save(t);
    }

    public List<Task> findAll() {
        return taskRepository.findAll();
    }

    public Task findById(Long id) {
        return taskRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found"));
    }

    public Task update(Long id, TaskRequest req) {
        Task t = findById(id);
        t.setName(req.getName());
        t.setPriority(req.getPriority());
        t.setDescription(req.getDescription());
        return taskRepository.save(t);
    }

    public Task updateStatus(Long id, StatusUpdateRequest req) {
        Task t = findById(id);
        t.setStatus(req.getStatus());
        return taskRepository.save(t);
    }

    public Task updateStatusEnum(Long id, Status status) {
        Task t = findById(id);
        t.setStatus(status);
        return taskRepository.save(t);
    }

    public void delete(Long id) {
        if (!taskRepository.existsById(id)) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found");
        taskRepository.deleteById(id);
    }
}


