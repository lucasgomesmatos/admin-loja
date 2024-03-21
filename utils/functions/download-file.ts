import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

import { toast } from "sonner";

export const normalizeCpfNumber = (value: string | undefined) => {
  if (!value) return "";

  return value
    .replace(/\D/g, "")
    .replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
};

interface DownloadFileProps {
  fileName: string;
  url: string;
  nameUser: string | null;
  cpfUser: string | null;
  setLoading: () => void;
}

export const downloadFile = async ({
  fileName,
  url,
  nameUser,
  cpfUser,
  setLoading,
}: DownloadFileProps) => {
  try {
    setLoading();
    const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const [page] = await pdfDoc.getPages();
    const text = `${nameUser?.toUpperCase()} - ${
      cpfUser && normalizeCpfNumber(cpfUser)
    }`;
    const fontSize = 12;
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const { width } = page.getSize();

    page.drawText(text, {
      x: width / 3,
      y: 15,
      size: fontSize,
      font: font,
      color: rgb(0, 0, 0),
      opacity: 0.2,
    });

    const modifiedPdfBytes = await pdfDoc.save();
    const modifiedPdfBlob = new Blob([modifiedPdfBytes], {
      type: "application/pdf",
    });

    // Create a URL for the blob
    const modifiedPdfUrl = URL.createObjectURL(modifiedPdfBlob);

    // Create a download link
    const downloadLink = document.createElement("a");
    downloadLink.href = modifiedPdfUrl;
    downloadLink.download = `${fileName}.pdf`;

    // Add the download link to the document
    document.body.appendChild(downloadLink);

    // Programmatically click the download link to trigger the download
    downloadLink.click();

    // Clean up the URL object after the download has started
    URL.revokeObjectURL(modifiedPdfUrl);
  } catch (error) {
    console.error("Error:", error);
    toast.error("Erro ao fazer o download da arquivo.");
  } finally {
    setLoading();
  }
};
