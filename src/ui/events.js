import * as appState from "../core/appState";
import * as storage from "../services/storage";
import { render } from "../ui/render";

let modalMode = "add";
let editingTodoId = null;

export function initEvents() {
  document.addEventListener("click", (e) => {
    if (e.target.matches(".project-item")) {
      const id = e.target.dataset.projectId;
      appState.selectProject(id);
      render(appState.getState());
    }

    if (e.target.classList.contains("todo-check")) {
      const todoId = e.target.closest(".todo-item").dataset.todoId;
      appState.toggleTodo(todoId);
      storage.save(appState.getState());
      render(appState.getState());
    }

    if (e.target.closest(".delete-todo")) {
      const todoId = e.target.closest(".todo-item").dataset.todoId;
      appState.removeTodo(todoId);
      storage.save(appState.getState());
      render(appState.getState());
    }

    const editBtn = e.target.closest(".edit-todo");
    if (!editBtn) return;
    const todoId = editBtn.closest(".todo-item").dataset.todoId;
    const todo = appState.getTodoById(todoId);
    modalMode = "edit";
    editingTodoId = todoId;
    updateModalUI();
    fillForm(todo);
    openModal();
  });

  const addTaskBtn = document.getElementById("add-task-btn");
  const overlay = document.getElementById("modal-overlay");
  const cancelBtn = document.getElementById("cancel-btn");
  const form = document.getElementById("task-form");
  const modalTitle = document.querySelector(".modal h2");
  const submitBtn = form.querySelector("button[type='submit']");
  const addProjectBtn = document.getElementById("add-project-btn");
  const addProjectPopup = document.getElementById("add-project-popup");
  const submitProjectBtn = document.getElementById("project-submit-btn");
  const cancelProjectBtn = document.getElementById("project-cancel-btn");
  const projectForm = document.getElementById("project-form");

  addTaskBtn.addEventListener("click", () => {
    editingTodoId = null;
    modalMode = "add";
    updateModalUI();
    openModal();
  });

  addProjectBtn.addEventListener("click", (e) => {
    addProjectPopup.classList.toggle("hidden");
    addProjectBtn.classList.toggle("hidden");
  });

  submitProjectBtn.addEventListener("click", (e) => {
    const name = document.getElementById("project-name").value.trim();
    if (name) {
      appState.addProject(name);
      storage.save(appState.getState());
      render(appState.getState());
    }
    projectForm.reset();
    addProjectPopup.classList.toggle("hidden");
    addProjectBtn.classList.toggle("hidden");
  });

  cancelProjectBtn.addEventListener("click", () => {
    projectForm.reset();
    addProjectPopup.classList.toggle("hidden");
    addProjectBtn.classList.toggle("hidden");
  });

  cancelBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    if (modalMode === "add") {
      appState.addTodo(data);
    } else {
      appState.updateTodo(editingTodoId, data);
    }
    closeModal();
    storage.save(appState.getState());
    render(appState.getState());
  });

  setMinDate();
  function openModal() {
    overlay.classList.remove("hidden");
  }

  function closeModal() {
    overlay.classList.add("hidden");
    form.reset();
  }

  function fillForm(todo) {
    form.title.value = todo.title;
    form.description.value = todo.description;
    form.priority.value = todo.priority;
    form.dueDate.value = todo.dueDate;
  }

  function updateModalUI() {
    modalTitle.textContent = modalMode === "add" ? "Add Task" : "Edit Task";

    submitBtn.textContent = modalMode === "add" ? "Add" : "Save";
  }

  function setMinDate() {
    const dateInput = document.getElementById("due-date");
    const today = new Date().toISOString().split("T")[0];
    dateInput.min = today;
  }
}
