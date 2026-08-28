import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createTask } from "../api/taskApi";

import type { CreateTaskDto } from "../dto/create-task.dto";

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTaskDto) => createTask(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });
}