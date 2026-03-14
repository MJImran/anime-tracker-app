import { initializeApp } from "firebase/app";
import {
  doc,
  getFirestore,
  collection,
  addDoc,
  getDoc,
  getDocs,
  setDoc,
  where,
  query,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCtw_2Edk64buSMXoZ2zSIzgLDbfP5Qd_A",
  authDomain: "softprint-8f060.firebaseapp.com",
  projectId: "softprint-8f060",
  storageBucket: "softprint-8f060.firebasestorage.app",
  messagingSenderId: "396492309186",
  appId: "1:396492309186:web:69a168149ee9b7c44db15b",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function add2Db(category, newData) {
  try {
    const citiesRef = collection(db, category);
    await addDoc(citiesRef, newData);
  } catch (e) {
    alert("Error adding document: ", e);
    console.error("Error adding document: ", e);
  }
}

export async function getCol(category, setList) {
  const ref = collection(db, category);
  const querySnapshot = await getDocs(ref);
  let arr = [];
  querySnapshot.forEach((doc) => {
    arr = [...arr, doc.data()];
  });
  setList([...arr]);
}

export async function getData(category, id) {
  const docRef = doc(db, category, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
}

export async function getMatch(collect, key, value) {
  const q = query(collection(db, collect), where(key, "==", value));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
}

export function add(price = 10, age = 10) {
  return console.log(price * age);
}
