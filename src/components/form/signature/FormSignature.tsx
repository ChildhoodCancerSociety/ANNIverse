"use client";

import React, { useEffect, useRef, useState } from "react";

import { PDFDocument } from "pdf-lib";
import SignatureCanvas from "react-signature-canvas";

const FormSignature = () => {
  const sigCanvas = useRef<SignatureCanvas>(null);
  const [openModel, setOpenModal] = useState<boolean>(false);
  const [imageURL, setImageURL] = useState<string | null>(null);

  const [sigSuccess, setSigSuccess] = useState<boolean>(false);


  // This dataURLtoFile function turns the base64 string of our signature into a JS File object
  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
};


  async function uploadSignature() {
    if (sigCanvas.current) {
      const signature = sigCanvas.current
        .getTrimmedCanvas()
        .toDataURL("image/png");
      setImageURL(signature ?? "");
      setOpenModal(false);

      // 'USERNAME + signature.png' should be replaced with dynamic UserName + 'signature.png'
      let signatureFile = dataURLtoFile(signature,'USERNAME + signature.png');

      console.log(signatureFile)

      const formData = new FormData();
      formData.set("upload", signatureFile);
      try {
        const res = await fetch("/api/signature/uploadHandler", {
          method: "POST",
          body: formData,
        });
        console.log(await res.json());
      } catch (e) {
        console.log(e);
      }

      setSigSuccess(true);

      /*  This section of code below is to embed signature into a PDF  */

      // const pdfURL = "https://pdf-lib.js.org/assets/with_update_sections.pdf";
      // const existingPdfBytes = await fetch(pdfURL).then((res) =>
      //   res.arrayBuffer()
      // );
      // const pdfDoc = await PDFDocument.load(existingPdfBytes);

      // const pngImageBytes = await fetch(signature).then((res) =>
      //   res.arrayBuffer()
      // );
      // const sigImage = await pdfDoc.embedPng(pngImageBytes);
      // const pngDims = sigImage.scale(0.5);

      // const pages = pdfDoc.getPages();
      // const firstPage = pages[0];
      // // const { width, height } = firstPage.getSize()

      // firstPage?.drawImage(sigImage, {
      //   x: firstPage.getWidth() / 2 - pngDims.width / 2,
      //   y: firstPage.getHeight() / 2 - pngDims.height / 2 - 100,
      //   width: pngDims.width,
      //   height: pngDims.height,
      // });

      // const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
      // const pdfElement = document.getElementById("pdf");
      // if (pdfElement) {
      //   (pdfElement as HTMLIFrameElement).src = pdfDataUri;
      // };
    };
  };

    /* This onSubmit function is for uploading selected file using mock form */

  // const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
  //   event.preventDefault();
  //   const formData = new FormData();
  //   // put in file object here instead of event.target.upload....
  //   formData.set("upload", event.target.upload.files[0]);
  //   try {
  //     const res = await fetch("/api/signature/uploadHandler", {
  //       method: "POST",
  //       body: formData,
  //     });
  //     console.log(await res.json());
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  return (
    <div className="form">
      <button
        style={{ background: "white", padding: "10px" }}
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
              <button onClick={() => sigCanvas.current?.clear()} style={{ background: "white", padding: "10px" }}>Clear</button>
            </div>
            <div className="modal_bottom">
              <button onClick={() => setOpenModal(false)} style={{ background: "white", padding: "10px" }}>Cancel</button>
              <button className="uploadSignature" onClick={uploadSignature} style={{ background: "white", padding: "10px" }}>
                Upload Signature
              </button>
            </div>
          </div>
        </div>
      )}

      {sigSuccess && (
        <div className="sigSuccess">
          <h1>Signature Upload Successful!</h1>
        </div>
      )}

        {/* This iframe is for viewing the embedded PDF for testing before uploading */}

      {/* <iframe title="pdf-viewer" id="pdf" height={600} width={600} /> */}



      {/* Simple form to test uploading into bucket */}

      {/* <form
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
      </form> */}
    </div>
  );
};

export default FormSignature;
