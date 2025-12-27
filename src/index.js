import "./style.css";
import * as appState from "./core/appState";
import * as storage from "./services/storage";
import { render } from "./ui/render";
import { initEvents } from "./ui/events";

const saved = storage.load();
appState.initState(saved);

if (appState.getState().projects[0].todos.length === 0) {
  appState.addTodo({ title: "test todo" });
}

storage.save(appState.getState());
render(appState.getState());
initEvents();
