
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'


const firebaseConfig = {
  apiKey:"AIzaSyBRgssTv1KDQL2W_z6Ek9RwUV55Vh95sIY",
  authDomain: "own-d26f3.firebaseapp.com",
  projectId: "own-d26f3",
  storageBucket: "own-d26f3.appspot.com",
  messagingSenderId: "464738447204",
  appId: "1:464738447204:web:2934f2512389b323a1d471",
  measurementId: "G-CVSV60CR04"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth()
export const provider = new GoogleAuthProvider()

export default app