import { Project } from "./Project";
import { Todo } from "./Todo";

let state = {
  projects: [],
  selectedProjectId: null,
};

export function initState(saved) {
  if (saved) {
    state = rehydrateState(saved);
  } else {
    const inbox = new Project("Inbox");
    state.projects.push(inbox);
    state.selectedProjectId = inbox.id;
  }
}

export function getState() {
  return state;
}

export function getCurrentProject() {
  return state.projects.find((p) => p.id === state.selectedProjectId);
}

export function selectProject(id) {
  state.selectedProjectId = id;
}

export function addTodo(data) {
  const todo = new Todo(data);
  getCurrentProject().addTodo(todo);
}

export function removeTodo(id) {
  getCurrentProject().removeTodo(id);
}

export function addProject(name) {
  const project = new Project(name);
  state.projects.push(project);
}

export function rehydrateState(saved) {
  return {
    selectedProjectId: saved.selectedProjectId,
    projects: saved.projects.map((p) => {
      const project = new Project(p.name);
      project.id = p.id;

      project.todos = p.todos.map((t) => {
        const todo = new Todo(t);
        todo.id = t.id;
        todo.title = t.title;
        todo.description = t.description;
        todo.dueDate = t.dueDate;
        todo.priority = t.priority;
        todo.completed = t.completed;
        return todo;
      });
      return project;
    }),
  };
}

export function toggleTodo(todoId) {
  const project = getCurrentProject();
  const todo = project.todos.find((t) => t.id === todoId);
  if (todo) {
    todo.completed = !todo.completed;
  }
}

export function getTodoById(id) {
  return getCurrentProject().todos.find((todo) => todo.id === id);
}

export function updateTodo(id, data) {
  const todo = getTodoById(id);
  todo.title = data.title;
  todo.description = data.description;
  todo.dueDate = data.dueDate;
  todo.priority = data.priority;
  todo.completed = data.completed;
}
