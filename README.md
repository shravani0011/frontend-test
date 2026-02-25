# Front-End Developer Test — React + TypeScript

This project implements two reusable UI components as part of a frontend assessment:

* 🌳 **Tree View Component**
* 📋 **Kanban Board Component**

Built using **React + TypeScript** with clean architecture, reusable components, and minimal external libraries.

---

## 🚀 Tech Stack

* React
* TypeScript
* Vite
* DnD Kit (drag & drop)
* Functional components + hooks

---

## 📁 Project Structure

```
src/
  components/
    tree/
      TreeView.tsx
      TreeNode.tsx
      tree.types.ts

    kanban/
      KanbanBoard.tsx
      Column.tsx
      Card.tsx
      kanban.types.ts

  data/
    mockTree.ts
    mockKanban.ts
```

The project follows **feature-based structure**, keeping related components and types colocated for better scalability.

---

## 🌳 Tree View Component

### Features

* Expand / Collapse nodes
* Lazy loading simulation
* Add new child nodes
* Delete nodes with confirmation
* Inline editing
* Recursive rendering
* Drag & drop reordering (nested support)

### Key Concepts

* Recursive component architecture
* Controlled state at root level
* Clean separation between UI and data

---

## 📋 Kanban Board Component

### Columns

* Todo
* In Progress
* Done

### Features

* Drag cards between columns
* Add new cards
* Delete cards
* Inline editing of titles
* Responsive layout (columns wrap on smaller screens)

### Architecture

```
KanbanBoard
   └── Column
         └── Card
```

DnD Kit is used with draggable cards and droppable columns.

---

## 🧠 Design Decisions

* Minimal external libraries to keep logic transparent
* Feature-based folder structure for readability
* Reusable TypeScript types
* Drag handles used to avoid click conflicts

---

## ▶️ Getting Started

Install dependencies:

```
npm install
```

Run development server:

```
npm run dev
```

---

## 🌐 Deployment

Project can be deployed easily using:

* Vercel
* Netlify
* GitHub Pages

---

## ✨ Notes

The focus of this implementation was:

* Clean architecture
* Maintainable component structure
* Strong TypeScript usage
* Demonstrating understanding rather than over-engineering

---

## 👨‍💻 Author

Frontend Developer Assignment Submission
