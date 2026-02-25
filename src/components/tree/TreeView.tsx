import { useState } from "react";
import type { TreeNodeType } from "./tree.types";
import TreeNode from "./TreeNode";
import {
  DndContext,
  closestCenter,
  type DragEndEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

type Props = {
  data: TreeNodeType[];
};

const reorderTree = (
  nodes: TreeNodeType[],
  activeId: string,
  overId: string
): TreeNodeType[] => {
  // Try reorder at current level
  const oldIndex = nodes.findIndex((n) => n.id === activeId);
  const newIndex = nodes.findIndex((n) => n.id === overId);

  if (oldIndex !== -1 && newIndex !== -1) {
    const updated = [...nodes];
    const [moved] = updated.splice(oldIndex, 1);
    updated.splice(newIndex, 0, moved);
    return updated;
  }

  // Otherwise recurse into children
  return nodes.map((n) => {
    if (!n.children) return n;

    return {
      ...n,
      children: reorderTree(n.children, activeId, overId),
    };
  });
};

const TreeView = ({ data }: Props) => {
  const [tree, setTree] = useState<TreeNodeType[]>(data);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { distance: 5 } })
  );

  // Add child node
  const addNode = (parentId: string) => {
    const addRecursively = (nodes: TreeNodeType[]): TreeNodeType[] => {
      return nodes.map((n) => {
        if (n.id === parentId) {
          const nextNumber = (n.children?.length || 0) + 1;

          const newNode: TreeNodeType = {
            id: Date.now().toString(),
            name: `New Node ${nextNumber}`,
          };

          return {
            ...n,
            children: [...(n.children || []), newNode],
          };
        }

        if (n.children) {
          return { ...n, children: addRecursively(n.children) };
        }

        return n;
      });
    };

    setTree((prev) => addRecursively(prev));
  };

  // Delete node
  const deleteNode = (nodeId: string) => {
    const removeRecursively = (nodes: TreeNodeType[]): TreeNodeType[] => {
      return nodes
        .filter((n) => n.id !== nodeId)
        .map((n) =>
          n.children
            ? { ...n, children: removeRecursively(n.children) }
            : n
        );
    };

    setTree((prev) => removeRecursively(prev));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setTree((prev) =>
      reorderTree(prev, String(active.id), String(over.id))
    );
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={tree.map((n) => n.id)}
        strategy={verticalListSortingStrategy}
      >
        <div>
          {tree.map((node) => (
            <TreeNode
              key={node.id}
              node={node}
              addNode={addNode}
              deleteNode={deleteNode}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default TreeView;