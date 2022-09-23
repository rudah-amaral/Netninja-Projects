const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();

export default class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = db.collection("chats");
  }

  async addChat(message) {
    const chat = {
      message,
      username: this.username,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(new Date()),
    };

    try {
      const data = await this.chats.add(chat);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  }

  getChats(callback) {
    this.unsubCurrentRoom = this.chats
      .where("room", "==", this.room)
      .orderBy("created_at")
      .onSnapshot((snapshot) => {
        const changes = [...snapshot.docChanges()];
        changes
          .filter((change) => change.type === "added")
          .forEach((addedChanges) => callback(addedChanges.doc.data()));
      });
  }

  updateName(username) {
    this.username = username;
    localStorage.setItem("username", username);
  }

  updateRoom(room) {
    if (this.unsubCurrentRoom) {
      this.unsubCurrentRoom();
    }
    this.room = room;
    localStorage.setItem("room", room);
  }
}
