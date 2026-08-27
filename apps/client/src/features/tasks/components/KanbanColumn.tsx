"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

type KanbanColumnProps = {
  id: string;
  title: string;
  taskIds: string[];
  children: React.ReactNode;
};

export function KanbanColumn({
  id,
  title,
  taskIds,
  children,
}: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({
    //Куди можна кинути?
    id, //TODO /// IN PROGRESS /// DONE
  });

  return (
    <div
      ref={setNodeRef}
      className="min-h-[300px] w-[300px] rounded-lg border border-gray-700 bg-gray-900 p-4"
    >
      <h2 className="mb-3 text-lg font-medium text-white">{title}</h2>

      <SortableContext items={taskIds}>
        <div className="flex min-h-[200px] flex-col gap-2">{children}</div>
      </SortableContext>
    </div>
  );
}

//SortableContext Відповідає: Які елементи тут можна сортувати?
