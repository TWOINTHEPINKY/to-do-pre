const items = [
  "Сделать проектную работу",
  "Полить цветы",
  "Пройти туториал по Реакту",
  "Сделать фронт для своего проекта",
  "Прогуляться по улице в солнечный день",
  "Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

// Создает DOM-элемент задачи с обработчиками событий
function createItem(item) {
  const template = document.getElementById("to-do__item-template");
  const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  const editButton = clone.querySelector(".to-do__item-button_type_edit");
  
  textElement.textContent = item;

  deleteButton.addEventListener("click", () => {
    clone.remove();
    const items = getTasksFromDOM();
    saveTasks(items);
  });

  duplicateButton.addEventListener("click", () => {
    const itemName = textElement.textContent;
    const newItem = createItem(itemName);
    listElement.prepend(newItem);
    const items = getTasksFromDOM();
    saveTasks(items);
  });

  editButton.addEventListener("click", () => {
    textElement.setAttribute("contenteditable", true);
    textElement.focus();
  });

  textElement.addEventListener("blur", () => {
    textElement.setAttribute("contenteditable", false);
    const items = getTasksFromDOM();
    saveTasks(items);
  });

  return clone;
}

// Собирает все задачи со страницы в массив
function getTasksFromDOM() {
  const itemsNamesElements = listElement.querySelectorAll(".to-do__item-text");
  const tasks = [];
  itemsNamesElements.forEach((itemNameElement) => {
    tasks.push(itemNameElement.textContent);
  });

  return tasks;
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Создает DOM-элемент задачи с обработчиками событий
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks) {
    return tasks;
  }
  return items;
}

// Обработчик добавления новой задачи через форму
formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  listElement.prepend(createItem(inputElement.value));
  items = getTasksFromDOM();
  saveTasks(items);
  formElement.reset();
});

//Инициализация
items = loadTasks();

items.forEach((item) => {
  listElement.append(createItem(item));
});
