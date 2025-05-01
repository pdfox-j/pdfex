import React from "react";
import { Link } from "react-router-dom"; // 👈 AÑADE ESTA LÍNEA

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="PDFex Logo" className="w-8 h-8" />
          <span className="text-xl font-bold">PDFex</span>
        </div>
        <nav className="space-x-4 hidden sm:block">
          <a href="#features" className="hover:text-red-500">Características</a>
          <a href="#pro" className="hover:text-red-500">PRO</a>
          <Link to="/login" className="hover:text-red-500">Iniciar sesión</Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="text-center py-20 px-6">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Lee, convierte y comparte tus PDFs como un PRO
        </h1>
        <p className="text-lg text-gray-400 mb-6">
          Con PDFex tienes el control total sobre tus documentos.
        </p>
        <a
  href="/lector"
  className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full inline-block"
>
  🚀 Probar Gratis
</a>
      </section>

      {/* Características */}
      <section id="features" className="px-6 py-16 bg-gray-900 text-center">
        <h2 className="text-3xl font-bold mb-8">Características</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Feature icon="📄" title="Visualización rápida" />
          <Feature icon="📝" title="Edición PDF (PRO)" />
          <Feature icon="🔄" title="Conversión a Word" />
          <Feature icon="📤" title="Compartir por Email" />
          <Feature icon="🔐" title="Acceso con clave PRO" />
          <Feature icon="📱" title="Compatible con móvil" />
        </div>
      </section>

      {/* Planes PRO */}
      <section id="pro" className="px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">¿Qué incluye PDFex PRO?</h2>
        <ul className="text-lg space-y-3 text-gray-300">
          <li>✔️ Conversión ilimitada a Word</li>
          <li>✔️ Función de edición avanzada</li>
          <li>✔️ Soporte prioritario</li>
          <li>✔️ Marca personal desactivada</li>
        </ul>
        <a
          href="/"
          className="mt-8 inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold"
        >
          🔓 Obtener acceso PRO
        </a>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-500 border-t border-gray-800">
        Hecho con ❤️ por <a href="https://github.com/pdfox-j" className="text-red-500">pdfox-j</a>
      </footer>
    </div>
  );
}

function Feature({ icon, title }) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-md">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
  );
}
