import { useMutation, useQueryClient } from "@tanstack/react-query";

import { reorderTasks } from "../api/taskApi";

export function useReorderTasks() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reorderTasks,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });
}