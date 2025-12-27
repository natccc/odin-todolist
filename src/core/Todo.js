export class Todo{
    constructor({ title, description="", dueDate="", priority="low"}) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
    }
    toggle(){
        this.completed = !this.completed;
    }
}