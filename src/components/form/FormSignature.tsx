"use client";

import { useRef, useState } from "react";

import { PDFDocument } from "pdf-lib";
import SignatureCanvas from "react-signature-canvas";

const FormSignature = () => {
  const sigCanvas = useRef<SignatureCanvas>(null);
  const [openModel, setOpenModal] = useState<boolean>(false);
  const [imageURL, setImageURL] = useState<string | null>(null);

  async function create() {
    if (sigCanvas.current) {
      const signature = sigCanvas.current
        .getTrimmedCanvas()
        .toDataURL("image/png");
      setImageURL(signature ?? "");
      setOpenModal(false);

      const pdfURL = "https://pdf-lib.js.org/assets/with_update_sections.pdf";
      const existingPdfBytes = await fetch(pdfURL).then((res) =>
        res.arrayBuffer()
      );
      const pdfDoc = await PDFDocument.load(existingPdfBytes);

      const pngImageBytes = await fetch(signature).then((res) =>
        res.arrayBuffer()
      );
      const sigImage = await pdfDoc.embedPng(pngImageBytes);
      const pngDims = sigImage.scale(0.5);

      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      // const { width, height } = firstPage.getSize()

      firstPage?.drawImage(sigImage, {
        x: firstPage.getWidth() / 2 - pngDims.width / 2,
        y: firstPage.getHeight() / 2 - pngDims.height / 2 - 100,
        width: pngDims.width,
        height: pngDims.height,
      });

      const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
      const pdfElement = document.getElementById("pdf");
      if (pdfElement) {
        (pdfElement as HTMLIFrameElement).src = pdfDataUri;
      }
    }
  }

  return (
    <div className="form">
      <button onClick={() => setOpenModal(true)}>Create Signature</button>
      <br />
      {imageURL && (
        <>
          <img src={imageURL} alt="signature" className="signature" />
          <br />
        </>
      )}
      <br />

      {openModel && (
        <div className="modalContainer">
          <div className="modal">
            <div className="sigPadContainer">
              <SignatureCanvas
                penColor="black"
                canvasProps={{ className: "sigCanvas" }}
                ref={sigCanvas}
              />
              <hr />
              <button onClick={() => sigCanvas.current?.clear()}>Clear</button>
            </div>
            <div className="modal_bottom">
              <button onClick={() => setOpenModal(false)}>Cancel</button>
              <button className="create" onClick={create}>
                Create
              </button>
            </div>
          </div>
        </div>
      )}
      <iframe title="pdf-viewer" id="pdf" height={600} width={600} />
    </div>
  );
};

export default FormSignature;
