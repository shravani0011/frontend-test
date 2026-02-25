import type { CardType } from "./kanban.types";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faHand, faTrash } from '@fortawesome/free-solid-svg-icons';

type Props = {
    card: CardType;
    columnId: string;
    deleteCard: (cardId: string) => void;
};

const Card = ({ card, columnId, deleteCard }: Props) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: card.id,
        data: {
            type: "card",
            columnId: columnId, 
        },
    })

    const style = {
        transform: CSS.Translate.toString(transform), 
        cursor: "grab",
    };
    return (
        <div ref={setNodeRef} style={{ ...style }}>
            <span {...listeners} {...attributes}> <FontAwesomeIcon icon={faHand} /></span>&nbsp;&nbsp;

            <span>{card.title}</span>

            <button onClick={() => deleteCard(card.id)}><FontAwesomeIcon icon={faTrash} /></button>
        </div>
    );
};

export default Card;