const search = document.querySelector(".search input");
const list = document.querySelector(".todos");
const addForm = document.querySelector(".add");

const generateTemplate = (todoTxt) => {
  const spanElem = document.createElement("span");
  spanElem.textContent = todoTxt;

  const htmlTemplate = `
    <li class="list-group-item d-flex justify-content-between align-itens-center">
      ${spanElem.outerHTML}
      <i class="far fa-trash-alt delete"></i>
    </li>`;

  list.insertAdjacentHTML("beforeend", htmlTemplate);
};

filterTodos = (term) => {
  [...list.children]
    .filter((todo) => !todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.add("d-none"));

  [...list.children]
    .filter((todo) => todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.remove("d-none"));
};

search.addEventListener("keyup", () => {
  const term = search.value.trim().toLowerCase();
  filterTodos(term);
});

list.addEventListener("click", (e) => {
  if (!e.target.classList.contains("delete")) return;

  e.target.parentElement.remove();
});

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const todo = addForm.elements.add.value.trim();
  if (todo.length) {
    generateTemplate(todo);
    addForm.reset();
  }
});
