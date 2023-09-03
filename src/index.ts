class TodoItem {
    title: string;
    description: string;
    done: boolean;
    creationDate: number;
    lastUpdateDate: number;

    constructor(title: string, description: string) {
        this.title = title;
        this.description = description;
        this.done = false;
        const now = Date.now();
        this.creationDate = now;
        this.lastUpdateDate = now;
    }
}

class TodoList {
    private items: TodoItem[];

    constructor() {
        this.items = [];
    }

    addItem(item: TodoItem) {
        this.items.push(item);
    }

    toggleItem(index: number) {
        this.items[index].done = !this.items[index].done;
        this.items[index].lastUpdateDate = Date.now();
    }

    removeItem(index: number) {
        this.items.splice(index, 1);
    }

    getAllItems(): TodoItem[] {
        return this.items;
    }
}

class TodoApp {
    private todoList: TodoList;

    constructor() {
        this.todoList = new TodoList();
        this.setupEventListeners();
        this.renderTodoList();
    }

    private setupEventListeners() {
        const addButton = document.getElementById('add-btn')!;
        addButton.addEventListener(
            'click',
            this.handleAddButtonClick.bind(this)
        );
    }

    private handleAddButtonClick() {
        const titleInput = <HTMLInputElement>document.getElementById('title');
        const descriptionInput = <HTMLInputElement>(
            document.getElementById('description')
        );
        const title = titleInput.value;
        const description = descriptionInput.value;

        if (title && description) {
            const newItem = new TodoItem(title, description);
            this.todoList.addItem(newItem);
            this.renderTodoList();
            titleInput.value = '';
            descriptionInput.value = '';
        }
    }

    private renderTodoList() {
        const list = document.getElementById('todo-list')!;
        list.innerHTML = '';

        this.todoList.getAllItems().forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
            <h3 class="item-title ${item.done ? 'done' : ''}">${item.title}</h3>
            <p class="item-description">${item.description}</p>
            <div class="btn-section">
            <span>${this.formatDate(item.lastUpdateDate)}</span>
            <button class="toggle-btn">${item.done ? 'Undo' : 'Done'}</button>
            <button class="remove-btn">Remove</button>
            </div>
      `;

            li.querySelector('.toggle-btn')!.addEventListener('click', () =>
                this.handleToggleButtonClick(index)
            );
            li.querySelector('.remove-btn')!.addEventListener('click', () =>
                this.handleRemoveButtonClick(index)
            );

            list.appendChild(li);
        });
    }

    private handleToggleButtonClick(index: number) {
        this.todoList.toggleItem(index);
        this.renderTodoList();
    }

    private handleRemoveButtonClick(index: number) {
        this.todoList.removeItem(index);
        this.renderTodoList();
    }

    private formatDate(timestamp: number): string {
        const date = new Date(timestamp);
        const timeString = date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        });
        const dateString = date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
        return `${timeString} - ${dateString}`;
    }
}

new TodoApp();
