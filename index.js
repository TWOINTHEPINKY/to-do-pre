let items = [
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

// Загружает задачи из localStorage или возвращает начальный список
function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    return JSON.parse(savedTasks);
  }
  return items;
}

// Создает DOM-элемент задачи с обработчиками событий
function createItem(item) {
  const template = document.getElementById("to-do__item-template");
  const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(
    ".to-do__item-button_type_duplicate"
  );
  const editButton = clone.querySelector(".to-do__item-button_type_edit");

  textElement.textContent = item;

  // Удаляет задачу при клике на кнопку удаления
  deleteButton.addEventListener("click", () => {
    clone.remove();
    const items = getTasksFromDOM();
    saveTasks(items);
  });

  // Дублирует задачу при клике на кнопку дублирования
  duplicateButton.addEventListener("click", () => {
    const itemName = textElement.textContent;
    const newItem = createItem(itemName);
    listElement.prepend(newItem);
    const items = getTasksFromDOM();
    saveTasks(items);
  });

  // Включает режим редактирования задачи
  editButton.addEventListener("click", () => {
    textElement.setAttribute("contenteditable", "true");
    textElement.focus();
  });

  // Сохраняет изменения после редактирования
  textElement.addEventListener("blur", () => {
    textElement.setAttribute("contenteditable", "false");
    const items = getTasksFromDOM();
    saveTasks(items);
  });

  return clone;
}

// Собирает все задачи со страницы в массив
function getTasksFromDOM() {
  const itemsNamesElements = listElement.querySelectorAll(".to-do__item-text");
  const tasks = [];
  itemsNamesElements.forEach((e) => {
    tasks.push(e.textContent);
  });

  return tasks;
}

// Сохраняет массив задач в localStorage
function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Инициализация: загружаем и отображаем задачи при загрузке страницы
items = loadTasks();

items.forEach((item) => {
  const newItem = createItem(item);
  listElement.append(newItem);
});

// Обработчик добавления новой задачи через форму
formElement.addEventListener("submit", (event) => {
  event.preventDefault();

  const taskText = inputElement.value.trim();

  if (taskText) {
    const newItem = createItem(taskText);
    listElement.prepend(newItem);
    inputElement.value = "";

    items = getTasksFromDOM();
    saveTasks(items);
  }
});
