import * as appState from "../core/appState";

export function render(state) {
  const root = document.querySelector("#app");
  root.innerHTML = "";

  const layout = document.createElement("div");
  layout.className = "layout";

  const sidebar = document.createElement("aside");
  sidebar.className = "sidebar";

  const main = document.createElement("main");
  main.className = "main";

  renderSidebar(sidebar, state);
  renderMain(main, state);

  layout.appendChild(sidebar);
  layout.appendChild(main);
  root.appendChild(layout);
}

function renderSidebar(container, state) {
  const inboxProject = state.projects.find(
    (project) => project.name === "Inbox"
  );
  if (inboxProject) {
    const inboxItem = document.createElement("div");
    inboxItem.textContent = inboxProject.name;
    inboxItem.className = "project-item";

    if (inboxProject.id === state.selectedProjectId) {
      inboxItem.classList.add("active");
    }
    inboxItem.dataset.projectId = inboxProject.id;
    container.appendChild(inboxItem);
  }

  const title = document.createElement("h2");
  title.textContent = "Projects";
  container.appendChild(title);

  state.projects.forEach((project) => {
    if (project.name === "Inbox") return;
    const item = document.createElement("div");
    item.textContent = project.name;
    item.className = "project-item";

    if (project.id === state.selectedProjectId) {
      item.classList.add("active");
    }
    item.dataset.projectId = project.id;
    container.appendChild(item);
  });
}

function renderMain(container, state) {
  const project = appState.getCurrentProject();
  const header = document.createElement("h1");
  header.textContent = project.name;
  container.appendChild(header);

  project.todos.forEach((todo) => {
    const row = document.createElement("div");
    row.className = `todo-item priority-${todo.priority}`;
    row.dataset.todoId = todo.id;
    if (todo.completed) {
      row.classList.add("completed");
    }

    const leftRow = document.createElement("div");
    leftRow.className = "left-row";

    const rightRow = document.createElement("div");
    rightRow.className = "right-row";

    const check = document.createElement("button");
    check.className = "todo-check";
    check.textContent = todo.completed ? "✔" : "";

    const title = document.createElement("div");
    title.className = "todo-name";
    title.textContent = todo.title;

    const dueDate = document.createElement("div");
    dueDate.textContent = todo.dueDate;
    dueDate.className = "todo-dueDate";

    const buttons = document.createElement("div");
    buttons.className = "button-container";

    const edit = document.createElement("div");
    edit.className = "edit-todo icon";
    edit.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>`;

    const bin = document.createElement("div");
    bin.className = "delete-todo";
    bin.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;

    buttons.appendChild(edit);
    buttons.appendChild(bin);
    leftRow.appendChild(check);
    leftRow.appendChild(title);
    rightRow.appendChild(dueDate);
    rightRow.appendChild(buttons);
    row.appendChild(leftRow);
    row.appendChild(rightRow);
    container.appendChild(row);
  });
}
