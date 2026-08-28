"use client";

import { useTasks } from "../hooks/useTasks";
import { TaskCard } from "./TaskCard";

export function TaskList() {
  const { data: tasks, isLoading, error } = useTasks();

  if (isLoading) {
    return <p>Loading tasks...</p>;
  }

  if (error) {
    return <p>Failed to load tasks</p>;
  }

  if (!tasks || tasks.length === 0) {
    return <p>No tasks found</p>;
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          id={task._id}
          title={task.title}
        />
      ))}
    </div>
  );
}