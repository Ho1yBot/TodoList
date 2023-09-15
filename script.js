document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.querySelector(".task");
    const addTaskButton = document.querySelector(".addTask");
    const taskList = document.querySelector(".taskList");

    // Получение данных из localStorage
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Загрузка задач из localStorage
    for (const taskText of storedTasks) {
        createTaskElement(taskText);
    }

    function createTaskElement(taskText) {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${taskText}</span>
            <button class="delete">Удалить</button>
        `;

        li.querySelector(".delete").addEventListener("click", function () {
            li.remove();
            updateLocalStorage();
        });

        taskList.appendChild(li);
    }

    function updateLocalStorage() {
        const tasks = Array.from(taskList.querySelectorAll("li span")).map(span => span.textContent);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    addTaskButton.addEventListener("click", function () {
        const taskText = taskInput.value.trim();

        if (taskText !== "") {
            createTaskElement(taskText);
            updateLocalStorage();
            taskInput.value = "";
        }
    });

    taskInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            addTaskButton.click();
        }
    });

    // Добавить кнопку, которая выделяет (цветом или эффектом) каждый чётный элемент
    const highlightEvenButton = document.createElement("button");
    highlightEvenButton.textContent = "Выделить чётные";
    highlightEvenButton.addEventListener("click", function () {
        const items = taskList.querySelectorAll("li");
        items.forEach((item, index) => {
            if (index % 2 === 1) {
                item.classList.add("highlight-even");
            } else {
                item.classList.remove("highlight-even");
            }
        });
    });
    document.body.appendChild(highlightEvenButton);

    // Добавить кнопку, которая выделяет (цветом или эффектом) каждый нечётный элемент
    const highlightOddButton = document.createElement("button");
    highlightOddButton.textContent = "Выделить нечётные";
    highlightOddButton.addEventListener("click", function () {
        const items = taskList.querySelectorAll("li");
        items.forEach((item, index) => {
            if (index % 2 === 0) {
                item.classList.add("highlight-odd");
            } else {
                item.classList.remove("highlight-odd");
            }
        });
    });
    document.body.appendChild(highlightOddButton);

    // Добавить кнопку, которая удаляет последний элемент
    const removeLastButton = document.createElement("button");
    removeLastButton.textContent = "Удалить последний";
    removeLastButton.addEventListener("click", function () {
        const items = taskList.querySelectorAll("li");
        if (items.length > 0) {
            taskList.removeChild(items[items.length - 1]);
            updateLocalStorage();
        }
    });
    document.body.appendChild(removeLastButton);

    // Добавить кнопку, которая удаляет первый элемент
    const removeFirstButton = document.createElement("button");
    removeFirstButton.textContent = "Удалить первый";
    removeFirstButton.addEventListener("click", function () {
        const items = taskList.querySelectorAll("li");
        if (items.length > 0) {
            taskList.removeChild(items[0]);
            updateLocalStorage();
        }
    });
    document.body.appendChild(removeFirstButton);

    // Добавить кнопку Complete, которая помечает элемент завершенным и помещает в конец списка
    const completeAndMoveButton = document.createElement("button");
    completeAndMoveButton.textContent = "Complete и переместить";
    completeAndMoveButton.addEventListener("click", function () {
        const items = taskList.querySelectorAll("li");
        if (items.length > 0) {
            const firstItem = items[0];
            taskList.removeChild(firstItem);
            firstItem.classList.add("completed");
            taskList.appendChild(firstItem);
            updateLocalStorage();
        }
    });
    document.body.appendChild(completeAndMoveButton);
});
