import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBTClBwsYdbZ6cpd8NwlWf9N6FTLjmXVbc",
    authDomain: "pickload-3aba1.firebaseapp.com",
    projectId: "pickload-3aba1",
    storageBucket: "pickload-3aba1.appspot.com",
    messagingSenderId: "1094613676907",
    appId: "1:1094613676907:web:b6a815e081bf26f43c922e",
    measurementId: "G-5YS2K3GVLC"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// firebase.initializeApp(firebaseConfig);
// export const db = firebase.firestore();
// export const auth = firebase.auth();

// export default firebase;