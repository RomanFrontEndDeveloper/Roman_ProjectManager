"use client";

import { DndContext, DragEndEvent } from "@dnd-kit/core";

import { KanbanColumn } from "./KanbanColumn";
import { TaskCard } from "./TaskCard";

import { useTasks } from "../hooks/useTasks";
import { useUpdateTask } from "../hooks/useUpdateTask";
import type { TaskStatus } from "../types/task";

export function KanbanBoard() {
  const { data: tasks, isLoading, error } = useTasks();
  const updateTask = useUpdateTask();

  if (isLoading) {
    return <p>Loading tasks...</p>;
  }

  if (error) {
    return <p>Failed to load tasks</p>;
  }

  if (!tasks || tasks.length === 0) {
    return <p>No tasks found</p>;
  }

  const taskList = tasks;

  const todoTasks = taskList.filter((task) => task.status === "todo");

  const inProgressTasks = taskList.filter(
    (task) => task.status === "in_progress",
  );

  const doneTasks = taskList.filter((task) => task.status === "done");

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) {
      return;
    }

    const activeTask = taskList.find((task) => task._id === active.id);

    if (!activeTask) {
      return;
    }

    const overTask = taskList.find((task) => task._id === over.id);

    const newStatus: TaskStatus = overTask
      ? overTask.status
      : (over.id as TaskStatus);

    if (activeTask.status === newStatus) {
      return;
    }

    updateTask.mutate({
      id: activeTask._id,
      data: {
        status: newStatus,
      },
    });
  }

  return (
    <DndContext id="kanban-board" onDragEnd={handleDragEnd}>
      <div className="flex items-start gap-4">
        <KanbanColumn
          id="todo"
          title="TODO"
          taskIds={todoTasks.map((task) => task._id)}
        >
          {todoTasks.map((task) => (
            <TaskCard key={task._id} id={task._id} title={task.title} />
          ))}
        </KanbanColumn>

        <KanbanColumn
          id="in_progress"
          title="IN PROGRESS"
          taskIds={inProgressTasks.map((task) => task._id)}
        >
          {inProgressTasks.map((task) => (
            <TaskCard key={task._id} id={task._id} title={task.title} />
          ))}
        </KanbanColumn>

        <KanbanColumn
          id="done"
          title="DONE"
          taskIds={doneTasks.map((task) => task._id)}
        >
          {doneTasks.map((task) => (
            <TaskCard key={task._id} id={task._id} title={task.title} />
          ))}
        </KanbanColumn>
      </div>
    </DndContext>
  );
}
