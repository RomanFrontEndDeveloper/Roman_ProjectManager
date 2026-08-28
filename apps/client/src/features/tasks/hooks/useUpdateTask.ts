import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateTask } from "../api/taskApi";

import type { UpdateTaskDto } from "../dto/update-task.dto";

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateTaskDto;
    }) => updateTask(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });
}