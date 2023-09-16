document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.querySelector(".task");
    const addTaskButton = document.querySelector(".addTask");
    const taskList = document.querySelector(".taskList");

    // Получение данных из localStorage
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Загрузка задач из localStorage
    for (const taskData of storedTasks) {
        createTaskElement(taskData);
    }

    function createTaskElement(taskData) {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${taskData.text}</span>
            <button class="delete">Удалить</button>
            <button class="complete">${taskData.completed ? '<img src="check.svg" alt="Галочка" class="check-icon">' : 'Complete'}</button>
        `;

        if (taskData.completed) {
            li.classList.add("completed");
            // Переместить завершенные задачи в конец списка
            taskList.appendChild(li);
        } else {
            // Добавить новые задачи в начало списка
            taskList.prepend(li);
        }

        li.querySelector(".delete").addEventListener("click", function () {
            li.remove();
            updateLocalStorage();
        });

        li.querySelector(".complete").addEventListener("click", function () {
            if (!taskData.completed) {
                taskData.completed = true;
                li.classList.add("completed");
                li.querySelector(".complete").innerHTML = `<img src="check.svg" alt="Галочка" class="check-icon">`;
                // Переместить завершенные задачи в конец списка
                taskList.appendChild(li);
            } else {
                taskData.completed = false;
                li.classList.remove("completed");
                li.querySelector(".complete").textContent = "Complete";
                // Переместить незавершенные задачи в начало списка
                taskList.prepend(li);
            }
            updateLocalStorage();
        });
    }

    function updateLocalStorage() {
        const tasksData = [];
        const taskElements = taskList.querySelectorAll("li");

        taskElements.forEach((element) => {
            const taskData = {
                text: element.querySelector("span").textContent,
                completed: element.classList.contains("completed"),
            };
            tasksData.push(taskData);
        });

        localStorage.setItem("tasks", JSON.stringify(tasksData));
    }

    addTaskButton.addEventListener("click", function () {
        const taskText = taskInput.value.trim();

        if (taskText !== "") {
            createTaskElement({ text: taskText, completed: false });
            updateLocalStorage();
            taskInput.value = "";
        }
    });

    taskInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            addTaskButton.click();
        }
    });


    // Добавить кнопку, которая выделяет каждый чётный элемент и убирает выделение при его наличии
    const highlightEvenButton = document.createElement("button");
    highlightEvenButton.textContent = "Выделить чётные";
    highlightEvenButton.addEventListener("click", function () {
        const items = taskList.querySelectorAll("li");
        items.forEach((item, index) => {
            if (index % 2 === 1) {
                if (item.classList.contains("highlight-even")) {
                    item.classList.remove("highlight-even");
                } else {
                    item.classList.add("highlight-even");
                }
            }
        });
    });
    document.body.appendChild(highlightEvenButton);

    // Добавить кнопку, которая выделяет каждый нечётный элемент и убирает выделение при его наличии
    const highlightOddButton = document.createElement("button");
    highlightOddButton.textContent = "Выделить нечётные";
    highlightOddButton.addEventListener("click", function () {
        const items = taskList.querySelectorAll("li");
        items.forEach((item, index) => {
            if (index % 2 === 0) {
                if (item.classList.contains("highlight-odd")) {
                    item.classList.remove("highlight-odd");
                } else {
                    item.classList.add("highlight-odd");
                }
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
