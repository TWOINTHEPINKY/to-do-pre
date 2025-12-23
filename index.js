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

// Загружает задачи из localStorage или возвращает начальный список
function loadTasks() {
	const savedTasks = localStorage.getItem('tasks');
	if (savedTasks){
		return JSON.parse(savedTasks);
	}
	else {
		return items;
	}
}

function createItem(item) {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  const editButton = clone.querySelector(".to-do__item-button_type_edit");
	textElement.textContent = item;

	deleteButton.addEventListener('click', function(){
		clone.remove();
		const items = getTasksFromDOM();
		saveTasks(items);
	});
	
	duplicateButton.addEventListener('click', function(){
		const itemName = textElement.textContent;
		const newItem = createItem(itemName);
		listElement.prepend(newItem);
		const items = getTasksFromDOM();
		saveTasks(items);
	});

	editButton.addEventListener('click', function() {
		textElement.setAttribute('contenteditable','true');
		textElement.focus();
	});

	textElement.addEventListener('blur', function() {
		textElement.setAttribute('contenteditable','false');
		const items = getTasksFromDOM();
		saveTasks(items);
	});
	return clone;
}

function getTasksFromDOM() {
	const itemsNamesElements = listElement.querySelectorAll('.to-do__item-text');
	const tasks = [];

	itemsNamesElements.forEach(function(elem){
		tasks.push(elem.textContent);
	});

	return tasks;
}

function saveTasks(tasks) {
	 localStorage.setItem('tasks' ,JSON.stringify(tasks));
}

// Обработчик добавления новой задачи через форму
formElement.addEventListener('submit', function(event){
	event.preventDefault();
	const taskText = inputElement.value;
	if(taskText)
	{
		const taskElement = createItem(taskText);
		listElement.prepend(taskElement);
		const items = getTasksFromDOM();
		saveTasks(items);
		inputElement.value = '';
	}
});


//Инициализация
let curitems = loadTasks();
curitems.forEach(function(item){
	const itemElement = createItem(item);
	listElement.append(itemElement);
});
