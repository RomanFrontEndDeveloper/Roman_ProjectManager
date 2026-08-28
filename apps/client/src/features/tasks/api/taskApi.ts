import { api } from "@/lib/axios";

import type { CreateTaskDto } from "../dto/create-task.dto";
import type { ReorderTaskDto } from "../dto/reorder-task.dto";
import type { UpdateTaskDto } from "../dto/update-task.dto";
import type { Task } from "../types/task";

export async function createTask(data: CreateTaskDto) {
  const response = await api.post("/v1/tasks", data);

  return response.data;
}

export async function getTasks(): Promise<Task[]> {
  const response = await api.get("/v1/tasks");

  return response.data;
}

export async function getTask(id: string) {
  const response = await api.get(`/v1/tasks/${id}`);

  return response.data;
}

export async function updateTask(id: string, data: UpdateTaskDto) {
  const response = await api.patch(`/v1/tasks/${id}`, data);

  return response.data;
}

export async function reorderTasks(data: ReorderTaskDto) {
  const response = await api.patch("/v1/tasks/reorder", data);

  return response.data;
}

export async function deleteTask(id: string) {
  const response = await api.delete(`/v1/tasks/${id}`);

  return response.data;
}
