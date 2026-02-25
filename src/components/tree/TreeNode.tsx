import { useState } from "react";
import type { TreeNodeType } from "./tree.types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretRight, faTrash } from "@fortawesome/free-solid-svg-icons";

type Props = {
    node: TreeNodeType;
    addNode: (parentId: string) => void;
    deleteNode: (nodeId: string) => void;
};

const TreeNode = ({ node, addNode, deleteNode }: Props) => {
const {
  attributes,
  listeners,
  setNodeRef,
  transform,
  transition,
  isDragging,
} = useSortable({ id: node.id });

const style = {
  transform: CSS.Transform.toString(transform),
  transition,
  opacity: isDragging ? 0.4 : 1,
};
    const [expanded, setExpanded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(node.name);

    const handleToggle = async () => {
        // If already expanded → collapse
        if (expanded) {
            setExpanded(false);
            return;
        }

        // Lazy load children if needed
        if (!node.children && node.hasChildren) {
            setLoading(true);
            setLoading(false);
        }

        setExpanded(true);
    };

    return (
        <div ref={setNodeRef} style={{ marginLeft: 20, ...style }}>
            <span
                style={{ cursor: "grab" }}
                {...listeners}
                {...attributes}
                onClick={handleToggle}
            >
                {expanded ? <FontAwesomeIcon icon={faCaretDown} /> : <FontAwesomeIcon icon={faCaretRight} />}
            </span>

            {editing ? (
                <input
                    value={name}
                    autoFocus
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => setEditing(false)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") setEditing(false);
                    }}
                />
            ) : (
                <span onDoubleClick={() => setEditing(true)}>
                    {name}
                </span>
            )}

            <button
                onClick={() => {
                    addNode(node.id);
                    setExpanded(true);
                }}
            >
                +
            </button>

            <button
                onClick={() => {
                    if (confirm("Delete this node?")) {
                        deleteNode(node.id);
                    }
                }}
            >
               <FontAwesomeIcon icon={faTrash} />
            </button>
            {loading && <div>Loading...</div>}
            {expanded && node.children && (
                <SortableContext
                    items={node.children.map((c) => c.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {node.children.map((child) => (
                        <TreeNode
                            key={child.id}
                            node={child}
                            addNode={addNode}
                            deleteNode={deleteNode}
                        />
                    ))}
                </SortableContext>
            )}
        </div>
    );
};

export default TreeNode;