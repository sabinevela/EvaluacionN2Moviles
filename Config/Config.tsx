import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD3tSQJFtwhWSaiAOZ8LXjjTQzCKhqnIGY",
  authDomain: "sv-prueba-e90b0.firebaseapp.com",
  databaseURL: "https://sv-prueba-e90b0-default-rtdb.firebaseio.com",
  projectId: "sv-prueba-e90b0",
  storageBucket: "sv-prueba-e90b0.firebasestorage.app",
  messagingSenderId: "210602983131",
  appId: "1:210602983131:web:83fc0c29de7a486e5396fe",
  measurementId: "G-24XQ2B5W5T"
};

// Inicializa Firebase solo una vez
const app = initializeApp(firebaseConfig);

// Inicializa los servicios de Firebase que necesitas
const auth = getAuth(app);
const db = getDatabase(app); // Usa esta referencia para la base de datos
const analytics = getAnalytics(app); // Solo si lo necesitas

// Exporta las instancias que necesitas en otros archivos
export { auth, db };


