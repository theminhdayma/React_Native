package com.example.todo.dto;

import com.example.todo.model.Priority;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class TaskRequest {
    @NotBlank
    private String name;

    @NotNull
    private Priority priority;

    private String description;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Priority getPriority() { return priority; }
    public void setPriority(Priority priority) { this.priority = priority; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}


