const chatList = document.querySelector(".chat-list");
const newChatForm = document.querySelector(".new-chat");
const newNameForm = document.querySelector(".new-name");
const updateMsg = document.querySelector(".update-msg");
const rooms = document.querySelector(".chat-rooms");

const room = localStorage.getItem("room")
  ? localStorage.getItem("room")
  : "general";

[...rooms.children]
  .find((child) => child.id === room)
  .classList.add("selected");

const username = localStorage.getItem("username")
  ? localStorage.getItem("username")
  : "anon";

const chatRoom = new Chatroom(room, username);
const chatUI = new ChatUI(chatList);

newChatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = newChatForm.elements.message.value.trim();
  chatRoom
    .addChat(message)
    .then(() => newChatForm.reset())
    .catch((err) => console.error(err));
});

newNameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newName = newNameForm.elements.name.value.trim();
  chatRoom.updateName(newName);

  newNameForm.reset();

  updateMsg.textContent = `Your name was update to ${newName}`;

  setTimeout(() => (updateMsg.textContent = ""), 3000);
});

rooms.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") return;
  chatUI.clear();
  chatRoom.updateRoom(e.target.id);

  [...e.target.parentNode.children]
    .filter((child) => child.tagName === "BUTTON")
    .map((buttonEl) => buttonEl.classList.remove("selected"));

  e.target.classList.add("selected");
  chatRoom.getChats((data) => chatUI.render(data));
});

chatRoom.getChats((data) => chatUI.render(data));
