/* todo-app/js/app.js */

// ─── DOM References ───────────────────────────────────────────────────────────
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// ─── State ────────────────────────────────────────────────────────────────────
let tasks = [];
let currentFilter = 'all'; // 'all' | 'active' | 'completed'

function getTaskKey() {
    const user = getLoggedInUser();
    return user ? `tasks_${user.email}` : null;
}

function loadUserTasks() {
    const key = getTaskKey();
    tasks = key ? (JSON.parse(localStorage.getItem(key)) || []) : [];
}

// Called by auth.js after a successful login / signup
function onAuthSuccess() {
    loadUserTasks();
    renderTasks();
}

// ─── Filter helpers ───────────────────────────────────────────────────────────

function setFilter(filter) {
    currentFilter = filter;
    // Update active pill styling
    document.querySelectorAll('.filter-pill').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filter);
    });
    renderTasks();
}

function getFilteredSortedTasks() {
    const searchTerm = (document.getElementById('task-search')?.value || '').toLowerCase().trim();
    const sortMode = document.getElementById('task-sort')?.value || 'newest';

    // 1 — filter by status
    let result = tasks.filter(t => {
        if (currentFilter === 'active') return !t.completed;
        if (currentFilter === 'completed') return t.completed;
        return true;
    });

    // 2 — filter by search query
    if (searchTerm) {
        result = result.filter(t => t.text.toLowerCase().includes(searchTerm));
    }

    // 3 — sort
    result = [...result]; // avoid mutating state
    switch (sortMode) {
        case 'oldest': result.sort((a, b) => a.id - b.id); break;
        case 'az': result.sort((a, b) => a.text.localeCompare(b.text)); break;
        case 'za': result.sort((a, b) => b.text.localeCompare(a.text)); break;
        default: result.sort((a, b) => b.id - a.id); // newest first
    }

    return result;
}

function updateTaskCount(visible, total) {
    const badge = document.getElementById('task-count');
    if (!badge) return;
    const active = tasks.filter(t => !t.completed).length;
    badge.textContent = `${active} left`;

    // Show / hide "Clear done" only when there are completed tasks
    const clearBtn = document.getElementById('clear-done-btn');
    if (clearBtn) {
        const hasDone = tasks.some(t => t.completed);
        clearBtn.style.display = hasDone ? 'flex' : 'none';
    }
}

// ─── Render ───────────────────────────────────────────────────────────────────

function renderEmptyState() {
    todoList.innerHTML = `
        <div class="empty-state">
            <span class="material-symbols-outlined empty-icon">checklist</span>
            <p>Sign in to see and manage your tasks.</p>
            <button class="btn btn-primary" onclick="openAuthModal('login')">Get Started</button>
        </div>
    `;
}

function renderTasks() {
    todoList.innerHTML = '';

    const user = getLoggedInUser();
    if (!user) {
        renderEmptyState();
        updateTaskCount(0, 0);
        return;
    }

    const visible = getFilteredSortedTasks();
    updateTaskCount(visible.length, tasks.length);

    if (tasks.length === 0) {
        todoList.innerHTML = `
            <div class="empty-state">
                <span class="material-symbols-outlined empty-icon">task_alt</span>
                <p>No tasks yet. Add one above!</p>
            </div>
        `;
        return;
    }

    if (visible.length === 0) {
        todoList.innerHTML = `
            <div class="empty-state">
                <span class="material-symbols-outlined empty-icon">filter_list_off</span>
                <p>No tasks match your current filter.</p>
            </div>
        `;
        return;
    }

    visible.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task-item');
        if (task.completed) taskElement.classList.add('task-item--done');

        taskElement.innerHTML = `
            <label class="checkbox-container" onclick="toggleComplete(${task.id})">
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                <span class="material-symbols-outlined checkbox-icon">check</span>
            </label>
            <div class="task-content">
                <p class="task-text ${task.completed ? 'completed' : ''}">${task.text}</p>
            </div>
            <button class="btn-delete" onclick="deleteTask(${task.id})" aria-label="Delete task">
                <span class="material-symbols-outlined">delete</span>
            </button>
        `;
        todoList.appendChild(taskElement);
    });
}

// ─── CRUD ─────────────────────────────────────────────────────────────────────

function saveTasks() {
    const key = getTaskKey();
    if (key) localStorage.setItem(key, JSON.stringify(tasks));
}

function addTask(e) {
    e.preventDefault();
    if (!getLoggedInUser()) { openAuthModal('login'); return; }

    const taskText = todoInput.value.trim();
    if (taskText !== '') {
        tasks.push({ id: Date.now(), text: taskText, completed: false });
        todoInput.value = '';
        saveTasks();
        renderTasks();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
}

function toggleComplete(id) {
    tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    saveTasks();
    renderTasks();
}

/** Remove all completed tasks at once */
function clearCompleted() {
    tasks = tasks.filter(t => !t.completed);
    saveTasks();
    renderTasks();
}

// ─── Bootstrap ────────────────────────────────────────────────────────────────

todoInput && todoInput.addEventListener('click', () => {
    if (!getLoggedInUser()) openAuthModal('login');
});

if (todoForm) {
    todoForm.addEventListener('submit', addTask);
}

document.addEventListener('DOMContentLoaded', () => {
    loadUserTasks();
    renderTasks();
});
