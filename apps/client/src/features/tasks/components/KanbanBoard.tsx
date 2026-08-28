"use client";

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";

import { arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";

import { KanbanColumn } from "./KanbanColumn";
import { TaskCard } from "./TaskCard";

import { useTasks } from "../hooks/useTasks";
import { useReorderTasks } from "../hooks/useReorderTasks";

import type { TaskStatus } from "../types/task";

export function KanbanBoard() {
  const { data: tasks, isLoading, error } = useTasks();

  const reorderTasks = useReorderTasks();

  const [activeId, setActiveId] = useState<string | null>(null);

  const [orderedTaskIds, setOrderedTaskIds] = useState<
    Record<TaskStatus, string[]>
  >({
    todo: [],
    in_progress: [],
    done: [],
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor),
  );

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

  function getTaskIds(status: TaskStatus) {
    const storedIds = orderedTaskIds[status];

    const currentIds = taskList
      .filter((task) => task.status === status)
      .map((task) => task._id);

    const validStoredIds = storedIds.filter((id) => currentIds.includes(id));

    const newIds = currentIds.filter((id) => !validStoredIds.includes(id));

    return [...validStoredIds, ...newIds];
  }

  const todoIds = getTaskIds("todo");
  const inProgressIds = getTaskIds("in_progress");
  const doneIds = getTaskIds("done");

  const todoTasks = todoIds
    .map((id) => taskList.find((task) => task._id === id))
    .filter((task): task is NonNullable<typeof task> => Boolean(task));

  const inProgressTasks = inProgressIds
    .map((id) => taskList.find((task) => task._id === id))
    .filter((task): task is NonNullable<typeof task> => Boolean(task));

  const doneTasks = doneIds
    .map((id) => taskList.find((task) => task._id === id))
    .filter((task): task is NonNullable<typeof task> => Boolean(task));

  function handleDragStart({ active }: { active: { id: string | number } }) {
    setActiveId(active.id as string);
  }

  function handleDragCancel() {
    setActiveId(null);
  }

  function saveTaskOrders(
    updates: {
      id: string;
      status: TaskStatus;
      order: number;
    }[],
  ) {
    reorderTasks.mutate({
      tasks: updates,
    });
  }

  function createOrderUpdates(status: TaskStatus, ids: string[]) {
    return ids.map((taskId, index) => ({
      id: taskId,
      status,
      order: index,
    }));
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    setActiveId(null);

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

    /*
     * Переміщення між колонками
     */
    if (activeTask.status !== newStatus) {
      const sourceIds = getTaskIds(activeTask.status).filter(
        (id) => id !== activeTask._id,
      );

      const targetIds = getTaskIds(newStatus);

      const overIndex = targetIds.indexOf(over.id as string);

      const insertIndex = overIndex === -1 ? targetIds.length : overIndex;

      const newTargetIds = [
        ...targetIds.slice(0, insertIndex),
        activeTask._id,
        ...targetIds.slice(insertIndex),
      ];

      setOrderedTaskIds((current) => ({
        ...current,
        [activeTask.status]: sourceIds,
        [newStatus]: newTargetIds,
      }));

      const sourceUpdates = createOrderUpdates(activeTask.status, sourceIds);

      const targetUpdates = createOrderUpdates(newStatus, newTargetIds);

      saveTaskOrders([...sourceUpdates, ...targetUpdates]);

      return;
    }

    /*
     * Переміщення всередині однієї колонки
     */
    const currentIds = getTaskIds(activeTask.status);

    const oldIndex = currentIds.indexOf(active.id as string);

    const newIndex = currentIds.indexOf(over.id as string);

    if (oldIndex === -1 || newIndex === -1) {
      return;
    }

    if (oldIndex === newIndex) {
      return;
    }

    const newIds = arrayMove(currentIds, oldIndex, newIndex);

    setOrderedTaskIds((current) => ({
      ...current,
      [activeTask.status]: newIds,
    }));

    const updates = createOrderUpdates(activeTask.status, newIds);

    saveTaskOrders(updates);
  }

  const activeTask = activeId
    ? taskList.find((task) => task._id === activeId)
    : null;

  return (
    <DndContext
      id="kanban-board"
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="flex items-start gap-4">
        <KanbanColumn id="todo" title="TODO" taskIds={todoIds}>
          {todoTasks.map((task) => (
            <TaskCard key={task._id} id={task._id} title={task.title} />
          ))}
        </KanbanColumn>

        <KanbanColumn
          id="in_progress"
          title="IN PROGRESS"
          taskIds={inProgressIds}
        >
          {inProgressTasks.map((task) => (
            <TaskCard key={task._id} id={task._id} title={task.title} />
          ))}
        </KanbanColumn>

        <KanbanColumn id="done" title="DONE" taskIds={doneIds}>
          {doneTasks.map((task) => (
            <TaskCard key={task._id} id={task._id} title={task.title} />
          ))}
        </KanbanColumn>
      </div>

      <DragOverlay>
        {activeTask ? (
          <TaskCard id={activeTask._id} title={activeTask.title} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
