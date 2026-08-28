"use client";

import { useState } from "react";

import { useCreateTask } from "../hooks/useCreateTask";

export function TaskForm() {
  const createTask = useCreateTask();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">(
    "medium",
  );
  const [dueDate, setDueDate] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    createTask.mutate({
      title: title.trim(),
      description: description.trim() || undefined,
      projectId: "000000000000000000000000",
      assigneeId: "000000000000000000000000",
      priority,
      dueDate: dueDate || undefined,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <div>
        <label className="mb-1 block text-sm text-white">
          Title
        </label>

        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Task title"
          className="w-full rounded border border-gray-600 bg-gray-800 p-2 text-white"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-white">
          Description
        </label>

        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Task description"
          className="w-full rounded border border-gray-600 bg-gray-800 p-2 text-white"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-white">
          Priority
        </label>

        <select
          value={priority}
          onChange={(event) =>
            setPriority(
              event.target.value as "low" | "medium" | "high",
            )
          }
          className="rounded border border-gray-600 bg-gray-800 p-2 text-white"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm text-white">
          Due date
        </label>

        <input
          type="date"
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
          className="rounded border border-gray-600 bg-gray-800 p-2 text-white"
        />
      </div>

      <button
        type="submit"
        disabled={createTask.isPending}
        className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
      >
        {createTask.isPending ? "Creating..." : "Create Task"}
      </button>
    </form>
  );
}