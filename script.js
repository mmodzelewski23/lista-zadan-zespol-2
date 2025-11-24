document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    var zadania = [];
    var index;
    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();
        addTask(taskInput.value);
        // aktualizacja pamieci
        zadania.push(taskInput.value);
        console.log(zadania);
        localStorage.setItem('zadania', JSON.stringify(zadania));
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
        return li;
    }
    window.toggleComplete = function (btn) {
        const taskItem = btn.closest('.task-item');
        let taskItemText = taskItem.querySelector('.task-text').textContent;
        // aktualizacja pamieci
        console.log("Content: "+taskItemText);
        if (taskItem.classList.contains('completed')) {
            taskItemText="%done%"+taskItemText; 
        }
        index = zadania.indexOf(taskItemText);
        console.log(index+'<- index zadania[index] = '+zadania[index]);
        if (zadania[index].includes("%done%")) {
            zadania[index] = zadania[index].replace('%done%', '');
        } else {
            zadania[index] = "%done%" + zadania[index];
        }
        localStorage.setItem('zadania', JSON.stringify(zadania));
        
        taskItem.classList.toggle('completed');
    }
    window.deleteTask = function (btn) {
        const taskItem = btn.closest('.task-item');
        // aktualizacja pamięci
        let taskItemText = taskItem.querySelector('.task-text').textContent;
        if (taskItem.classList.contains('completed')) {
            taskItemText="%done%"+taskItemText;
        }
        index = zadania.indexOf(taskItemText);
        zadania.splice(index, 1);
        localStorage.setItem('zadania', JSON.stringify(zadania));

        taskItem.remove();
    }

    let cookieZadania = localStorage.getItem('zadania');
    console.log(cookieZadania);
    if (cookieZadania) {
        cookieZadania = JSON.parse(cookieZadania);
        cookieZadania.forEach(e => {
            if (e.startsWith('%done%')) {
                addTask(e.replace('%done%', '')).classList.toggle('completed');;
            } else {
                addTask(e);
            }
        });
        zadania=cookieZadania;
    }
});
