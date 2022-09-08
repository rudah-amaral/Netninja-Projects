import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD3pMej1ciTSm_maOYtSJ3sQ0m7KP4XYqc",
  authDomain: "fir-9-dojo-7e5e0.firebaseapp.com",
  projectId: "fir-9-dojo-7e5e0",
  storageBucket: "fir-9-dojo-7e5e0.appspot.com",
  messagingSenderId: "1061019985737",
  appId: "1:1061019985737:web:16d39863e4ea9bdf6c1c98",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

const auth = getAuth(app);

const colRef = collection(db, "books");

const queryRef = query(colRef, orderBy("createdAt"));

const unsubFromCollection = onSnapshot(queryRef, (snapshot) => {
  const books = [];
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id });
  });
  console.log(books);
});

const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addDoc(colRef, {
    title: addBookForm.elements.title.value.trim(),
    author: addBookForm.elements.author.value.trim(),
    createdAt: new Date(),
  })
    .then(() => addBookForm.reset())
    .catch((err) => console.error(err));
});

const deleteBookForm = document.querySelector(".delete");
deleteBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const docRef = doc(db, "books", deleteBookForm.elements.id.value.trim());
  deleteDoc(docRef).then(() => deleteBookForm.reset());
});

const docRef = doc(db, "books", "0UkbNNvYNLIT5iQIQBll");
const unsubFromDocument = onSnapshot(docRef, (doc) => {
  console.log(doc.data(), doc.id);
});

const updateBookForm = document.querySelector(".update");
updateBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const docRef = doc(db, "books", updateBookForm.elements.id.value.trim());
  updateDoc(docRef, {
    title: "updated title",
  }).then(() => {
    updateBookForm.reset();
  });
});

const signUpForm = document.querySelector(".signup");
signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = signUpForm.elements.email.value.trim();
  const password = signUpForm.elements.password.value.trim();
  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      signUpForm.reset();
    })
    .catch((err) => {
      console.error(err);
    });
});

const loginForm = document.querySelector(".login");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = loginForm.elements.email.value.trim();
  const password = loginForm.elements.password.value.trim();
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      loginForm.reset();
    })
    .catch((err) => {
      console.error(err);
    });
});

const logoutButton = document.querySelector(".logout");
logoutButton.addEventListener("click", () => {
  signOut(auth).catch((err) => {
    console.error(err);
  });
});

const unsubFromAuth = onAuthStateChanged(auth, (user) => {
  console.log("user state changed:", user);
});

const unsubButton = document.querySelector(".unsub");
unsubButton.addEventListener("click", () => {
  console.log("unsubscribing");
  unsubFromCollection();
  unsubFromDocument();
  unsubFromAuth();
});
