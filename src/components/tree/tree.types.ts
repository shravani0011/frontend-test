export type TreeNodeType = {
  id: string;
  name: string;
  children?: TreeNodeType[];
  hasChildren?: boolean; // used for lazy loading simulation
};