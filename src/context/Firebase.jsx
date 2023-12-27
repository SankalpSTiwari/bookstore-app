import { createContext, useContext } from 'react';
import { initializeApp } from 'firebase/app';
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

export const FirebaseProvider = (props) => {
  return <FirebaseContext.Provider>{props.children}</FirebaseContext.Provider>;
};
