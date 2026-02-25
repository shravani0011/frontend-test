import type { ColumnType } from "./kanban.types";
import Card from "./Card";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

type Props = {
    column: ColumnType;
    addCard: (columnId: string) => void;
    deleteCard: (cardId: string) => void;
    updateCardTitle: (cardId: string, newTitle: string) => void;
};

const Column = ({ column, addCard, deleteCard, updateCardTitle }: Props) => {
    const { setNodeRef } = useDroppable({
        id: column.id,
    });
    return (
        <div
            ref={setNodeRef}
            className="kanban-column"
            style={{
                background: "#f4f5f7",
                padding: 12,
                borderRadius: 8,
                display: "flex",
                flexDirection: "column",
                gap: 10,
            }}
        >
            <h3 style={{ margin: 0 }}>{column.title}</h3>
            <button
                onClick={() => addCard(column.id)}
                style={{
                    padding: "6px 8px",
                    borderRadius: 6,
                    border: "none",
                    background: "#e4e6ea",
                    cursor: "pointer",
                }}
            >
                + Add Card
            </button>

            <SortableContext items={column.cards.map((c) => c.id)} strategy={verticalListSortingStrategy}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {column.cards.map((card) => (
                    <Card
                        key={card.id}
                        card={card}
                        columnId={column.id}
                        deleteCard={deleteCard}
                        updateCardTitle={updateCardTitle}
                    />
                ))}
              </div>
            </SortableContext>
        </div>
    );
};

export default Column;