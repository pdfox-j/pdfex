// Importa los módulos que necesites
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Configuración del proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAZMU2AcdDpExJ2Duq3iAyWECX2Q8FdFe4",
  authDomain: "pdfex-2f712.firebaseapp.com",
  projectId: "pdfex-2f712",
  storageBucket: "pdfex-2f712.appspot.com",
  messagingSenderId: "273671614287",
  appId: "1:273671614287:web:7a72f1412f6d5d8e5529f3a",
  measurementId: "G-2VX869GTWQ"
};

// Inicializa la app
const app = initializeApp(firebaseConfig);

// Exporta para usar en otras partes
export const auth = getAuth(app);
export default app;
