import { useState } from "react";
import type { CardType, ColumnType } from "./kanban.types";
import Column from "./Column";
import {
  DndContext,
  closestCenter,
  type DragEndEvent,
} from "@dnd-kit/core";

type Props = {
  data: ColumnType[];
};

const KanbanBoard = ({ data }: Props) => {
  const [columns, setColumns] = useState<ColumnType[]>(data);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeColumnId = active.data.current?.columnId;
    const overColumnId = over.id; // droppable column id

    if (!activeColumnId || activeColumnId === overColumnId) return;

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
        if (col.id === overColumnId && movedCard) {
          return { ...col, cards: [...col.cards, movedCard] };
        }
        return col;
      });
    });
  };

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