import { api } from "@/utils/api";
import BasicModal from "../BasicModal";
import Image from "next/image";
import { useState } from "react";

const PMWidget = () =>{
    const users:any = api.user.getAll.useQuery();
    const pm = users.data;
    const [toggle, setToggle] = useState(false);

    const handleToggle = () =>{
        setToggle(()=> toggle == true ? false : true);
    }
    return(
        <div>
        <button className="bg-green-50 border rounded-sm shadow-sm p-1 hover:bg-green-500" onClick={handleToggle}>Project Managers</button>
        {toggle &&
            <div className="bg-green-300 rounded-b-sm pt-1">
            {pm?.map((u:any) => u.role === "PM" ? 
            <div className="flex ml-1 pb-1">
            <Image src={u.image} alt={u.name} width={25} height={15} className="rounded mr-1" /> <p>{u.name}</p>
            </div> 
            : "")}
            </div>
        }
        </div>
    )
}

export default PMWidget;