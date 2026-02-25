import type { ColumnType } from "../components/kanban/kanban.types";

export const mockKanban: ColumnType[] = [
  {
    id: "todo",
    title: "Todo",
    cards: [
      { id: "1", title: "todo Task 1" },
      { id: "2", title: "todo Task 2" },
    ],
  },
  {
    id: "progress",
    title: "In Progress",
    cards: [],
  },
  {
    id: "done",
    title: "Done",
    cards: [],
  },
];