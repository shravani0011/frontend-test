import type { CardType } from "./kanban.types";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faHand, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";

type Props = {
    card: CardType;
    columnId: string;
    deleteCard: (cardId: string) => void; 
    updateCardTitle: (cardId: string, newTitle: string) => void;
};

const Card = ({ card, columnId, deleteCard, updateCardTitle }: Props) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: card.id,
        data: {
            type: "card",
            columnId: columnId,
        },
    });

    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState(card.title);

    const style = {
        transform: CSS.Translate.toString(transform),
        cursor: "grab",
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: "white",
        padding: 8,
        borderRadius: 6,
    };

    return (
        <div ref={setNodeRef} style={style}>
            {/* Drag Handle */}
            <span {...listeners} {...attributes} className="drag-handle" style={{ touchAction: "none" }}>
                <FontAwesomeIcon icon={faHand} size="sm"/>
            </span>

            {/* Editable Title */}
            {editing ? (
                <input
                    value={title}
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={() => {
                        updateCardTitle(card.id, title);
                        setEditing(false);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            updateCardTitle(card.id, title);
                            setEditing(false);
                        }
                    }}
                    style={{
                        flex: 1,
                        border: "none",
                        outline: "none",
                    }}
                />
            ) : (
                <span
                    style={{ flex: 1 }}
                    onDoubleClick={() => setEditing(true)}
                >
                    {card.title}
                </span>
            )}

            {/* Delete Button */}
            <button onClick={() => deleteCard(card.id)}>
                <FontAwesomeIcon icon={faTrash} size="xs"/>
            </button>
        </div>
    );
};

export default Card;