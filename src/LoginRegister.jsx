import React, { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export default function LoginRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const recaptchaRef = useRef(null);
  const navigate = useNavigate(); // ⬅️ redirección

  const validarCredenciales = () => {
    if (!email.includes("@") || !email.includes(".")) {
      setError("Correo inválido. Asegúrate de escribirlo correctamente.");
      return false;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return false;
    }
    return true;
  };

  const ejecutarReCaptcha = async () => {
    if (!recaptchaRef.current || !recaptchaRef.current.executeAsync) {
      setError("Error al cargar reCAPTCHA. Intenta recargar la página.");
      return null;
    }

    try {
      const token = await recaptchaRef.current.executeAsync();
      recaptchaRef.current.reset();
      console.log("Token reCAPTCHA:", token); // DEBUG
      return token;
    } catch (err) {
      setError("Error al ejecutar reCAPTCHA.");
      return null;
    }
  };

  const handleRegister = async () => {
    setError("");
    if (!validarCredenciales()) return;

    // 🔽 Comenta esta parte para probar sin reCAPTCHA
  // const token = await ejecutarReCaptcha();
  // if (!token) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      navigate("/lector"); // ⬅️ redirige después del registro
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogin = async () => {
    setError("");
    if (!validarCredenciales()) return;

    // 🔽 Comenta esta parte para probar sin reCAPTCHA
  // const token = await ejecutarReCaptcha();
  // if (!token) retur

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      navigate("/lector"); // ⬅️ redirige después del login
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Iniciar sesión o Registrarse</h1>

      {error && <p className="text-red-600 font-semibold mb-2">{error}</p>}

      <input
        className="border px-4 py-2 mb-2 w-full max-w-sm"
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="relative w-full max-w-sm mb-4">
        <input
          className="border px-4 py-2 w-full"
          type={showPassword ? "text" : "password"}
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm"
        >
          {showPassword ? "🙈" : "👁️"}
        </button>
      </div>

      <div className="flex gap-4">
        <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 rounded">
          Iniciar sesión
        </button>
        <button onClick={handleRegister} className="bg-green-600 text-white px-4 py-2 rounded">
          Registrarse
        </button>
      </div>

      <ReCAPTCHA
        sitekey="6Lc9fyorAAAAABBMRaWWdEydYhHcAYf9_LdwPFLy"
        size="invisible"
        ref={recaptchaRef}
      />

      {user && (
        <div className="mt-4 text-center">
          <p className="text-green-700 font-semibold">Sesión activa: {user.email}</p>
          <button onClick={handleLogout} className="mt-2 bg-red-500 text-white px-4 py-1 rounded">
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}
