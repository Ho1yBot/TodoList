document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.querySelector(".task");
    const addTaskButton = document.querySelector(".addTask");
    const taskList = document.querySelector(".taskList");

    // Получение данных из localStorage
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Загрузка задач из localStorage
    for (const taskData of storedTasks.reverse()) { // reverse() изменяет порядок на обратный
        createTaskElement(taskData);
    }

    function createTaskElement(taskData) {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="textOfTask">${taskData.text}</span>
            <div class="btnDelComp">
                <button class="delete">Удалить</button>
                <button class="complete">${taskData.completed ? '<img src="img/check.png" alt="Галочка" class="check-icon">' : 'Complete'}</button>
            </div>
            
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

        const completeButton = li.querySelector(".complete");
        completeButton.addEventListener("click", function () {
            if (!taskData.completed) {
                taskData.completed = true;
                li.classList.add("completed");
                completeButton.innerHTML = `<img src="img/check.png" alt="Галочка" class="check-icon">`;
                // Переместить завершенные задачи в конец списка
                taskList.appendChild(li);
            } else {
                taskData.completed = false;
                li.classList.remove("completed");
                completeButton.textContent = "Complete";
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
    const highlightEvenButton = document.querySelector(".highlightEven");
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

    // Добавить кнопку, которая выделяет каждый нечётный элемент и убирает выделение при его наличии
    const highlightOddButton = document.querySelector(".highlightOdd");
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

    // Добавить кнопку, которая удаляет последний элемент
    const removeLastButton = document.querySelector(".removeLast");
    removeLastButton.addEventListener("click", function () {
        const items = taskList.querySelectorAll("li");
        if (items.length > 0) {
            taskList.removeChild(items[items.length - 1]);
            updateLocalStorage();
        }
    });

    // Добавить кнопку, которая удаляет первый элемент
    const removeFirstButton = document.querySelector(".removeFirst");
    removeFirstButton.addEventListener("click", function () {
        const items = taskList.querySelectorAll("li");
        if (items.length > 0) {
            taskList.removeChild(items[0]);
            updateLocalStorage();
        }
    });
});
