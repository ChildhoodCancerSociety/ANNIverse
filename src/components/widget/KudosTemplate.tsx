import Draggable from "react-draggable";
import BasicModal from "../BasicModal";
import tedThumbsUp from "../../../docs/assets/tedthumbsup.png"
import ccsLogo from "../../../docs/assets/ccs-logo.png"
import Image from "next/image";
import html2canvas from "html2canvas";
// import { exportComponentAsPNG } from "react-component-export-image";
import { useRef, useState } from "react";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";

const KudosTemplate = ({message, member, id, display}:any) =>{
    const {data: session} = useSession()
    const user = session?.user.id as string;
    const canvasRef:any = useRef();
    const options = [
        { value: 'Ted Thumbs Up', label: 'Ted Thumbs Up', image: tedThumbsUp },
        { value: 'CCS', label: 'CCS', image: ccsLogo },
    ]
    const [selectedOption, setSelectedOption] = useState<string[]>([]);
    
    const handleSelected = (e:any) =>{
        setSelectedOption([...selectedOption, e.target.value ]);
    }
    
    const create = api.kudos.create.useMutation({});

    const canvasToImage = async() =>{
        const element = canvasRef.current;
        const canvas = await html2canvas(element, {allowTaint: true, useCORS: true,});
        const image = canvas.toDataURL();  
        create.mutateAsync({giverId: user, receiverId: id, image: image, isPrivate: display})
    }
 
    return(
        // Main Div
        <div className="w-80 h-64 ">
            <select value={selectedOption} onChange={handleSelected} className="mb-2">
                <option value="">Choose an image</option>
                {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
                ))}
            </select>
            <button className="bg-green-50 border rounded-sm shadow-sm p-1 ml-1 hover:bg-green-700 hover:text-slate-50" onClick={canvasToImage}>Submit</button>
            {/* Kudos Area*/}
            <div ref={canvasRef} className="bg-green-300 h-56 w-80 border">
                <Draggable bounds='body'>
                    <p className="cursor-pointer break-words text-center">{message}</p>
                </Draggable>
                <Draggable>
                    <p className="cursor-pointer">{member}</p>
                </Draggable>
                    <div>
                        {options.map((option) =>(
                            <Draggable defaultClassName="w-24">
                            <div className="cursor-pointer">
                                {selectedOption.includes(option.value) ? <Image className="block object-cover m-auto" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" crossOrigin="anonymous" src={option.image} width={70} height={70} alt={option.value} /> : ""}
                            </div>
                            </Draggable>
                        ))}
                    </div>
            </div>{/* End of Kudos Area */}
        </div> //End of Main Div
    )
}

export default KudosTemplate;