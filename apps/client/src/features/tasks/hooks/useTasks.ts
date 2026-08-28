import { useQuery } from "@tanstack/react-query";

import { getTasks } from "../api/taskApi";

import type { Task } from "../types/task";

export function useTasks() {
  return useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });
}