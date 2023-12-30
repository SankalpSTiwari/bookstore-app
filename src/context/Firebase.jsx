import { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
const FirebaseContext = createContext(null);

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD6YcbSs3ixhxZzESxhDMz1tpe9izPQSHo',
  authDomain: 'bookstore-app-b270a.firebaseapp.com',
  projectId: 'bookstore-app-b270a',
  storageBucket: 'bookstore-app-b270a.appspot.com',
  messagingSenderId: '158202548625',
  appId: '1:158202548625:web:50270796dc43a5fad68a30',
  measurementId: 'G-18PMMV0NB7',
};

export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      console.log('User', user);
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);
  const signupUserWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password);

  const signinUserWithEmailAndPassword = (email, password) =>
    signInWithEmailAndPassword(firebaseAuth, email, password);

  const signinWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);

  console.log(user);

  const handleCreateNewListing = async (name, isbn, price, cover) => {
    const imageRef = ref(storage, `uploads/images/${Date.now()}-${cover.name}`);
    const uploadResult = await uploadBytes(imageRef, cover);
    return await addDoc(collection(firestore, 'books'), {
      name,
      isbn,
      price,
      imageURL: uploadResult.ref.fullPath,
      userID: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    });
  };

  const listAllBooks = () => {
    return getDocs(collection(firestore, 'books'));
  };

  const getImageURL = (path) => {
    return getDownloadURL(ref(storage, path));
  };
  const isLoggedIn = user ? true : false;

  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        signinUserWithEmailAndPassword,
        signinWithGoogle,
        handleCreateNewListing,
        listAllBooks,
        getImageURL,
        isLoggedIn,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
