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

function loadTasks() {
	const uTasks = localStorage.getItem(localStorageKey);
	if (userTasks) {
		return JSON.parse(uTasks);
	}
	return items;
}

function createItem(item) {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);

	const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
	deleteButton.addEventListener('click', () => {
		clone.remove();
		const items = getTasksFromDOM();
		saveTasks(items);
	})

	const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
	duplicateButton.addEventListener('click', () => {
		const itemName = textElement.textContent;
		const newItem = createItem(itemName);
		listElement.prepend(newItem);
		const items = getTasksFromDOM();
		saveTasks(items);
	})

	const editButton = clone.querySelector(".to-do__item-button_type_edit");
	editButton.addEventListener('click', () => {
		textElement.setAttribute("contenteditable", "true");
		textElement.focus();
	})

	const textElement = clone.querySelector(".to-do__item-text");
	textElement.addEventListener('blur', () => {
		textElement.setAttribute("contenteditable", "false");	
		const items = getTasksFromDOM();
		saveTasks(items);	
	})
	
	textElement.textContent = item;

	return clone;

}

function getTasksFromDOM() {
	const namesItems = listElement.querySelectorAll(".to-do__item-text");
	let tasks = [];
	namesItems.forEach(function (item) {
		tasks.push(item.textContent);
	});
	return tasks;
}

function saveTasks(tasks) {
	localStorage.setItem(localStorageKey, JSON.stringify(tasks));	
}

formElement.addEventListener("submit", (event)=> {
	event.preventDefault();

	if(itemTxt.value.trim()) {
		listElement.prepend(createItem(itemTxt.value));
		items = getTasksFromDOM();
		saveTasks(items);
		itemTxt.value = "";
	}
});

items = loadTasks();

items.forEach(function (item) {
	listElement.append(createItem(item));
});