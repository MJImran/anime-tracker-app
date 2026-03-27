import { initializeApp } from "firebase/app";
import { useNavigate } from "react-router-dom";
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
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCtw_2Edk64buSMXoZ2zSIzgLDbfP5Qd_A",
  authDomain: "softprint-8f060.firebaseapp.com",
  projectId: "softprint-8f060",
  storageBucket: "softprint-8f060.firebasestorage.app",
  messagingSenderId: "396492309186",
  appId: "1:396492309186:web:69a168149ee9b7c44db15b",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

function reroute(route) {
  const navigate = useNavigate();
  navigate(route);
}

export async function add2Db(category, newData, setHasAdded) {
  try {
    const citiesRef = collection(db, category);
    await addDoc(citiesRef, newData);
    alert("anime added succesfully");
    setHasAdded(true);
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

export async function handleGmailLogin() {
  let verification;
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account",
  });
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      verification = true;
      console.log("sign in successful", verification);
      reroute("my-anime");

      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      verification = false;
      // The email of the user's account used.
      // const email = error.customData.email;
      // // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  return verification;
}

// export function verifyUser(setVerified) {
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       console.log("user is signed in:", user);

//       }, 600000);

//       setVerified(true);
//     } else {
//       console.log("logged in to proceed");
//     }
//   });
// }
