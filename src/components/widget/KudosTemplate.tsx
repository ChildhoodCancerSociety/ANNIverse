import Draggable from "react-draggable";
import BasicModal from "../BasicModal";
import tedThumbsUp from "../../../docs/assets/tedthumbsup.png"
import ccsLogo from "../../../docs/assets/ccs-logo.png"
import Image from "next/image";
import html2canvas from "html2canvas";
// import { exportComponentAsPNG } from "react-component-export-image";
import { useRef, useState } from "react";

const KudosTemplate = ({message, member}:string | any) =>{
    const canvasRef:any = useRef();
    const options = [
        { value: 'Ted Thumbs Up', label: 'Ted Thumbs Up', image: tedThumbsUp },
        { value: 'CCS', label: 'CCS', image: ccsLogo },
    ]
    const [selectedImg, setSelectedImg] = useState();
    const [selectedOption, setSelectedOption] = useState("");
    
    const handleSelected = (e:any) =>{
        setSelectedOption(e.target.value);
    }

    const canvasToImage = async() =>{
        const element = canvasRef.current;
        const canvas = await html2canvas(element, {allowTaint: true, useCORS: true,});
        const image = canvas.toDataURL();
        console.log(image)
        //store image to database
    }

    return(
        // Main Div
        <div className="w-80 h-64 ">
            <select value={selectedOption} onChange={handleSelected}>
                <option value="">Choose an image</option>
                {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
                ))}
            </select>
            <button className="bg-green-50 border rounded-sm shadow-sm p-1 mr-1 hover:bg-green-700 hover:text-slate-50" onClick={canvasToImage}>Submit</button>
            {/* Kudos Area*/}
            <div ref={canvasRef} className="bg-green-300 h-56 w-80 border">
                <Draggable>
                    <div>{message}</div>
                </Draggable>
                <Draggable>
                    <div>{member}</div>
                </Draggable>
                <Draggable>
                    <div>
                        {options.map((option) =>(
                            <div className="cursor-pointer">
                                {option.value === selectedOption ? <Image className="block object-cover max-w-full m-auto" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" crossOrigin="anonymous" src={option.image} width={70} height={70} alt={option.value} /> : ""}
                            </div>
                        ))}
                    </div>
                </Draggable>
            
            </div>{/* End of Kudos Area */}
        </div> //End of Main Div
    )
}

export default KudosTemplate;