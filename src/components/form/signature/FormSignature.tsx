"use client";

import React, { useEffect, useRef, useState } from "react";

import { PDFDocument } from "pdf-lib";
import SignatureCanvas from "react-signature-canvas";

const FormSignature = () => {
  const sigCanvas = useRef<SignatureCanvas>(null);
  const [openModel, setOpenModal] = useState<boolean>(false);
  const [imageURL, setImageURL] = useState<string | null>(null);

  const [result, setResult] = useState(null);

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

    fetch("/api/signature/uploadHandler")
      .then((response) => response.json())
      .then((data) => setResult(data))
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    if (result) {
      console.log(result);
    }
  }, [result]);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    // for turning imageUrl into a js File object
    // https://stackoverflow.com/questions/35940290/how-to-convert-base64-string-to-javascript-file-object-like-as-from-file-input-f
    event.preventDefault();
    const formData = new FormData();
    // put in file object here instead of event.target.upload....
    formData.set("upload", event.target.upload.files[0]);
    try {
      const res = await fetch("/api/signature/uploadHandler", {
        method: "POST",
        body: formData,
      });
      console.log(await res.json());
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="form">
      <button
        style={{ background: "white" }}
        onClick={() => setOpenModal(true)}
      >
        Create Signature
      </button>
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

      {/* Simple form to test uploading into bucket */}
      <form
        onSubmit={onSubmit}
        method="post"
        action="/api/signature/uploadHandler"
      >
        <label htmlFor="file">
          Upload a file
          <input id="file" type="file" name="upload" />
        </label>
        <button
          type="submit"
          className="button"
          style={{ cursor: "pointer", background: "white", padding: "10px" }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormSignature;
