import type { TreeNodeType } from "../components/tree/tree.types";

export const fetchChildren = (parentId: string): Promise<TreeNodeType[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: `${parentId}-child-1`,
          name: "Lazy Child 1",
        },
        {
          id: `${parentId}-child-2`,
          name: "Lazy Child 2",
        },
      ]);
    }, 800);
  });
};