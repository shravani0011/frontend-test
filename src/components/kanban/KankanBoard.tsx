import { useState } from "react";
import type { CardType, ColumnType } from "./kanban.types";
import {
  DndContext,
  closestCenter,
  type DragEndEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Column from "./Column";

type Props = {
  data: ColumnType[];
};

const KanbanBoard = ({ data }: Props) => {
  const [columns, setColumns] = useState<ColumnType[]>(data);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeColumnId =
      (active.data && (active.data.current as any)?.columnId) ||
      (active.data && (active.data.current as any)?.sortable?.containerId) ||
      null;

    const overColumnId =
      (over.data && (over.data.current as any)?.columnId) ||
      (over.data && (over.data.current as any)?.sortable?.containerId) ||
      String(over.id);

    let resolvedOverColumnId = overColumnId;
    const parent = columns.find((col) =>
      col.cards.some((c) => c.id === overColumnId)
    );
    if (parent) resolvedOverColumnId = parent.id;

    if (!activeColumnId) return;

    if (activeColumnId === resolvedOverColumnId) {
      setColumns((prev) =>
        prev.map((col) => {
          if (col.id !== activeColumnId) return col;

          const oldIndex = col.cards.findIndex((c) => c.id === active.id);
          const newIndex = col.cards.findIndex((c) => c.id === over.id);
          if (oldIndex === -1 || newIndex === -1) return col;

          const updated = [...col.cards];
          const [moved] = updated.splice(oldIndex, 1);
          updated.splice(newIndex, 0, moved);
          return { ...col, cards: updated };
        })
      );
      return;
    }

    // Otherwise move card between columns (remove from source and append to target)
    setColumns((prev) => {
      let movedCard: CardType | undefined;

      const newCols = prev.map((col) => {
        if (col.id === activeColumnId) {
          const cards = col.cards.filter((c) => {
            if (c.id === active.id) {
              movedCard = c;
              return false;
            }
            return true;
          });
          return { ...col, cards };
        }
        return col;
      });

      return newCols.map((col) => {
        if (col.id === resolvedOverColumnId && movedCard) {
          return { ...col, cards: [...col.cards, movedCard] };
        }
        return col;
      });
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 5 },
    })
  );

  const addCard = (columnId: string) => {
    setColumns((prev) =>
      prev.map((col) => {
        if (col.id !== columnId) return col;
        const nextNumber = col.cards.length + 1;
        const newTitle = ` ${col.id} Task ${nextNumber}`;

        return {
          ...col,
          cards: [
            ...col.cards,
            {
              id: Date.now().toString(),
              title: newTitle,
            },
          ],
        };
      })
    );
  };

  const updateCardTitle = (cardId: string, newTitle: string) => {
    setColumns((prev) =>
      prev.map((col) => ({
        ...col,
        cards: col.cards.map((c) =>
          c.id === cardId ? { ...c, title: newTitle } : c
        ),
      }))
    );
  };

  const deleteCard = (cardId: string) => {
    setColumns((prev) =>
      prev.map((col) => ({
        ...col,
        cards: col.cards.filter((c) => c.id !== cardId),
      }))
    );
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div
        style={{
          display: "flex",
          gap: 20,
          flexWrap: "wrap",
          alignItems: "flex-start",
        }}
      >
        {columns.map((col) => (
          <Column
            key={col.id}
            column={col}
            addCard={addCard}
            deleteCard={deleteCard}
            updateCardTitle={updateCardTitle}
          />
        ))}
      </div>
    </DndContext>
  );
};

export default KanbanBoard;