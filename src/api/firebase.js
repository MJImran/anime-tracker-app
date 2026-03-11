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

export async function send2Db(collection, id, newData) {
  try {
    const citiesRef = collection(db, collection);

    await setDoc(doc(citiesRef, id), newData);
  } catch (e) {
    alert("Error adding document: ", e);
    console.error("Error adding document: ", e);
  }
}

export async function getData(collection, id) {
  const docRef = doc(db, collection, id);
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
