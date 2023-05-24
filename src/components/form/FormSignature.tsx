import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";

const FormSignature = () => {
  const sigCanvas = useRef<SignatureCanvas>(null);
  const [openModel, setOpenModal] = useState<boolean>(false);
  const [imageURL, setImageURL] = useState<string | null>(null);

  const create = () => {
    const URL = sigCanvas.current?.getTrimmedCanvas().toDataURL("image/png");
    setImageURL(URL ?? "");
    setOpenModal(false);
  };

  const download = () => {
    const dlink = document.createElement("a");
    dlink.setAttribute("href", imageURL ?? "");
    dlink.setAttribute("download", "signature.png");
    dlink.click();
  };

  return (
    <div className="form">
      <button onClick={() => setOpenModal(true)}>Create Signature</button>
      <br />
      {imageURL && (
        <>
          <img src={imageURL} alt="signature" className="signature" />
          <br />
          <button
            onClick={download}
            style={{ padding: "5px", marginTop: "5px" }}
          >
            Download
          </button>
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
    </div>
  );
};

export default FormSignature;
