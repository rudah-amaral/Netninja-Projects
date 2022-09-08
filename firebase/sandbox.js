const list = document.querySelector("ul");
const form = document.querySelector("form");

const addRecipe = (recipe, id) => {
  let time = recipe["created at"].toDate();
  let template = `
  <li data-id="${id}">
    <div>${recipe.title}</div>
    <div>${time}</div>
    <button class="btn btn-danger btn-sm my-2">delete</button>
  </li>`;
  list.insertAdjacentHTML("beforeend", template);
};

const deleteRecipe = (id) => {
  const recipes = [...list.children];
  recipes.find((recipe) => recipe.dataset.id === id).remove();
};

db.collection("recipes").onSnapshot((snapshot) => {
  snapshot.docChanges().forEach((change) => {
    const doc = change.doc;
    if (change.type === "added") {
      addRecipe(doc.data(), doc.id);
    } else if (change.type === "removed") {
      deleteRecipe(doc.id);
    }
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const now = new Date();
  const recipe = {
    title: form.elements.recipe.value,
    "created at": firebase.firestore.Timestamp.fromDate(now),
  };

  db.collection("recipes")
    .add(recipe)
    .then((data) => console.log(data))
    .catch((err) => console.error(err));

  form.reset();
});

list.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") return;

  const id = e.target.parentElement.dataset.id;

  db.collection("recipes")
    .doc(id)
    .delete()
    .then(() => console.log("documento deletado"))
    .catch((err) => console.error(err));
});
