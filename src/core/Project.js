export class Project{
    constructor(name) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.todos = [];
    }

    addTodo(todo){
        this.todos.push(todo);
    }

    removeTodo(todoID){
        this.todos= this.todos.filter((todo) => todo.id !== todoID);
    }
}