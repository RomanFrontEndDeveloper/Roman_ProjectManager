"use client";

import { useState } from "react";

import { DndContext, DragEndEvent } from "@dnd-kit/core";

import { KanbanColumn } from "./KanbanColumn";
import { TaskCard } from "./TaskCard";

const initialTasks = [
  {
    id: "1",
    title: "Create project",
    status: "todo",
  },
  {
    id: "2",
    title: "Build dashboard",
    status: "in-progress",
  },
  {
    id: "3",
    title: "Finish authentication",
    status: "done",
  },
  {
    id: "4",
    title: "Create login page",
    status: "todo",
  },
  {
    id: "5",
    title: "Create register page",
    status: "todo",
  },
  {
    id: "6",
    title: "Connect API",
    status: "in-progress",
  },
  {
    id: "7",
    title: "Add React Query",
    status: "in-progress",
  },
  {
    id: "8",
    title: "Create project API",
    status: "todo",
  },
  {
    id: "9",
    title: "Create project form",
    status: "todo",
  },
  {
    id: "10",
    title: "Implement validation",
    status: "in-progress",
  },
  {
    id: "11",
    title: "Test authentication",
    status: "done",
  },
  {
    id: "12",
    title: "Test Kanban drag and drop",
    status: "done",
  },
  {
    id: "13",
    title: "Fix responsive layout",
    status: "in-progress",
  },
  {
    id: "14",
    title: "Add error handling",
    status: "done",
  },
  {
    id: "15",
    title: "Prepare production build",
    status: "todo",
  },
];

export function KanbanBoard() {
  const [tasks, setTasks] = useState(initialTasks);

  const todoTasks = tasks.filter((task) => task.status === "todo");

  const inProgressTasks = tasks.filter((task) => task.status === "in-progress");

  const doneTasks = tasks.filter((task) => task.status === "done");

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) {
      return;
    }

    setTasks((currentTasks) => {
      const overTask = currentTasks.find((task) => task.id === over.id);

      const newStatus = overTask
        ? overTask.status
        : (over.id as "todo" | "in-progress" | "done");

      return currentTasks.map((task) =>
        task.id === active.id
          ? {
              ...task,
              status: newStatus,
            }
          : task,
      );
    });
    // Візьми поточні задачі. З'ясуй, куди ми кинули картку. Визнач новий статус. 
    // Пройди по всіх задачах і тільки для тієї задачі, яку ми перетягували, зміни
    //  status. Поверни новий масив задач.
  }

  return (
    <DndContext id="kanban-board" onDragEnd={handleDragEnd}>
      <div className="flex items-start gap-4">
        <KanbanColumn
          id="todo"
          title="TODO"
          taskIds={todoTasks.map((task) => task.id)}
        >
          {todoTasks.map((task) => (
            <TaskCard key={task.id} id={task.id} title={task.title} />
          ))}
        </KanbanColumn>

        <KanbanColumn
          id="in-progress"
          title="IN PROGRESS"
          taskIds={inProgressTasks.map((task) => task.id)}
        >
          {inProgressTasks.map((task) => (
            <TaskCard key={task.id} id={task.id} title={task.title} />
          ))}
        </KanbanColumn>

        <KanbanColumn
          id="done"
          title="DONE"
          taskIds={doneTasks.map((task) => task.id)}
        >
          {doneTasks.map((task) => (
            <TaskCard key={task.id} id={task.id} title={task.title} />
          ))}
        </KanbanColumn>
      </div>
    </DndContext>
  );
}
