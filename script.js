document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    taskForm.addEventListener('submit', function (e) {

        e.preventDefault();
        addTask(taskInput.value);
        taskInput.value = '';
    });
    function addTask(taskText) {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `
<span class="task-text">${taskText}</span>
<div class="buttons">
<button class="complete-btn" onclick="toggleComplete(this)">✓</button>
<button class="delete-btn" onclick="deleteTask(this)">Usuń</button>
</div>
`;
        taskList.appendChild(li);
    }
    window.toggleComplete = function (btn) {
        const taskItem = btn.closest('.task-item');
        taskItem.classList.toggle('completed');
    }
    window.deleteTask = function (btn) {
        const taskItem = btn.closest('.task-item');
        taskItem.remove();
    }
});