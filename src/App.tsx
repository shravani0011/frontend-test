import KanbanBoard from "./components/kanban/KankanBoard";
import TreeView from "./components/tree/TreeView";
import { mockKanban } from "./data/mockKanban";
import { mockTree } from "./data/mockTree"; 


function App() {
  return (
    <div
      style={{
        padding: 40,
        display: "flex",
        flexDirection: "column",
        gap: 40,
      }}
    >
      <h3>My Kanban Board</h3>
      <TreeView data={mockTree} />
      <KanbanBoard data={mockKanban} />
    </div>
  );
}

export default App;