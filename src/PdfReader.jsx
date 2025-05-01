import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { FaSearchPlus, FaSearchMinus, FaArrowLeft, FaArrowRight, FaLockOpen, FaFilePdf, FaEdit } from "react-icons/fa";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Configuración del worker de pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function App() {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const [isPro, setIsPro] = useState(false);

  const onFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected?.type === "application/pdf") {
      setFile(selected);
      setPageNumber(1);
    } else {
      alert("Por favor selecciona un archivo PDF válido.");
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => setNumPages(numPages);

  const togglePro = () => {
    const clave = prompt("Introduce tu clave PRO");
    if (clave === "demo123") setIsPro(true);
    else alert("Clave incorrecta");
  };

  const convertPdfToWord = () => {
    if (!isPro) return;
    alert("Aquí iría la lógica para convertir a Word (modo PRO).");
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 px-4 py-6 sm:px-6 lg:px-12">
      {/* Header */}
      <div className="bg-white shadow-md py-3 px-4 flex items-center justify-between border-b border-gray-200 mb-4">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="PDFex logo" className="w-6 h-6 object-contain" />
          <span className="text-lg font-semibold text-gray-800">PDFex</span>
        </div>
        <button className="text-sm text-blue-600 hover:underline">❓ Ayuda</button>
      </div>

      <h1 className="text-3xl font-bold mb-4 text-center">PDFex - Lector PDF</h1>

      <div className="flex justify-center mb-6">
        <input type="file" accept="application/pdf" onChange={onFileChange} />
      </div>

      {file && (
        <div className="flex flex-col items-center w-full max-w-xl mx-auto">
          <div className="mb-4 flex flex-wrap gap-2 justify-center">
            <button
              className="bg-blue-500 text-white px-4 py-1 rounded"
              onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
            >
              ⬅ Página Anterior
            </button>
            <span>
              Página {pageNumber} de {numPages}
            </span>
            <button
              className="bg-blue-500 text-white px-4 py-1 rounded"
              onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))}
            >
              Siguiente ➡
            </button>
          </div>

          <div className="mb-4 flex items-center justify-center gap-4 flex-wrap">
            <button
              onClick={() => setScale((s) => Math.max(0.5, s - 0.1))}
              className="bg-gray-300 hover:bg-gray-400 px-3 py-2 rounded-full flex items-center gap-2"
            >
              <FaSearchMinus />
              Reducir
            </button>
            <span className="text-lg font-medium">{(scale * 100).toFixed(0)}%</span>
            <button
              onClick={() => setScale((s) => s + 0.1)}
              className="bg-gray-300 hover:bg-gray-400 px-3 py-2 rounded-full flex items-center gap-2"
            >
              <FaSearchPlus />
              Ampliar
            </button>
          </div>

          <div className="bg-white shadow-md p-2 sm:p-4 w-full max-w-[100vw] overflow-auto">
            <div className="flex justify-center">
              <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} scale={scale} />
              </Document>
            </div>
          </div>

          <div className="mt-6 space-y-2 w-full flex flex-col items-center px-4">
            <button
              disabled={!isPro}
              className={`w-full sm:w-64 px-4 py-2 rounded ${isPro ? "bg-green-600 text-white" : "bg-gray-400 text-white cursor-not-allowed"}`}
            >
              📝 Editar PDF (PRO)
            </button>

            <button
              disabled={!isPro}
              onClick={convertPdfToWord}
              className={`w-64 px-4 py-2 rounded ${isPro ? "bg-green-600 text-white" : "bg-gray-400 text-white cursor-not-allowed"}`}
            >
              📄 Convertir a Word (PRO)
            </button>

            <button
              onClick={() => {
                const link = document.createElement("a");
                link.href = URL.createObjectURL(file);
                link.download = file.name;
                link.click();
              }}
              className="w-full sm:w-64 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              ⬇ Descargar PDF
            </button>

            <button
              onClick={() => {
                const mailto = `mailto:?subject=Te comparto un PDF&body=Adjunto va el archivo ${file.name}`;
                window.location.href = mailto;
              }}
              className="w-full sm:w-64 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              📤 Compartir por Email
            </button>

            <button
              onClick={togglePro}
              className="text-sm text-blue-600 underline w-full sm:w-64 text-center"
            >
              🔓 ¿Tienes clave PRO? Haz clic aquí
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

