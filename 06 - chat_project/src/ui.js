export default class ChatUI {
  constructor(list) {
    this.list = list;
  }

  clear() {
    this.list.innerHTML = "";
  }

  render(data) {
    const createdAt = dateFns.distanceInWordsToNow(data.created_at.toDate(), {
      addSufix: true,
    });

    const template = `
      <li class="list-group-item">
        <span class="username">${data.username}</span>
        <span class="message">${data.message}</span>
        <div class="time">${createdAt}</div>
      </li>
    `;

    this.list.insertAdjacentHTML("beforeend", template);
  }
}
