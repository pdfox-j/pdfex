import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import workerSrc from "pdfjs-dist/build/pdf.worker.entry";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export default function PDFexApp() {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);

  const onFileChange = (e) => {
    const f = e.target.files[0];
    if (f?.type === "application/pdf") {
      setFile(f);
      setPageNumber(1);
    } else {
      alert("Archivo inválido");
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => setNumPages(numPages);

  return (
    <div className="min-h-screen bg-white text-center p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">PDFex - Lector Básico</h1>
      <input type="file" onChange={onFileChange} className="mb-4" />
      {file && (
        <>
          <div className="mb-4 flex justify-center items-center gap-4">
            <button onClick={() => setPageNumber((p) => Math.max(1, p - 1))} className="px-3 py-1 bg-gray-200 rounded">
              ⬅ Anterior
            </button>
            <span>
              Página {pageNumber} de {numPages}
            </span>
            <button onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))} className="px-3 py-1 bg-gray-200 rounded">
              Siguiente ➡
            </button>
          </div>
          <div className="mb-4">
            <button onClick={() => setScale((s) => Math.max(0.5, s - 0.1))} className="px-3 py-1 bg-gray-300 rounded">- Zoom</button>
            <span className="mx-2">{(scale * 100).toFixed(0)}%</span>
            <button onClick={() => setScale((s) => s + 0.1)} className="px-3 py-1 bg-gray-300 rounded">+ Zoom</button>
          </div>
          <div className="flex justify-center">
            <Document 
            file={file} 
            onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page
               pageNumber={pageNumber} 
              scale={scale} 
              renderTextLayer={false}  // Desactiva la capa de texto si no la necesitas
  />
</Document>
          </div>
        </>
      )}
    </div>
  );
}
