const paragraphs = [];

for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
  const page = await pdf.getPage(pageNum);
  const content = await page.getTextContent();
  const pageText = content.items.map(item => item.str).join(" ");
  paragraphs.push(new Paragraph(pageText));
  paragraphs.push(new Paragraph("")); // Espacio entre páginas
}

const doc = new WordDoc({
  sections: [
    {
      properties: {},
      children: paragraphs,
    },
  ],
});

const blob = await Packer.toBlob(doc);
saveAs(blob, "PDFex_convertido.docx");
