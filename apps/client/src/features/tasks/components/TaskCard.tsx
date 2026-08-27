"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type TaskCardProps = {
  id: string;
  title: string;
};

export function TaskCard({ id, title }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-grab rounded-lg border border-gray-600 bg-gray-800 p-3 text-white"
    >
      <h3 className="text-base font-medium text-white">{title}</h3>
    </div>
  );
}
