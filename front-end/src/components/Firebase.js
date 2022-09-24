import { initializeApp } from "firebase/app";
import {getStorage} from  "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCmElQkfPfzgnTg64dUR9rLcJXboTGVvXI",
    authDomain: "nighteye-bf367.firebaseapp.com",
    projectId: "nighteye-bf367",
    storageBucket: "nighteye-bf367.appspot.com",
    messagingSenderId: "971547841314",
    appId: "1:971547841314:web:c6b64c7350247e92f70b7b"
  };

  export const app = initializeApp(firebaseConfig)
const storage = getStorage(app)
export default storage; 