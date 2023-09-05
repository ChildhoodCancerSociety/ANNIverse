import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import Image from "next/image";

const KudosPage = () =>{
    const {data: session} = useSession();
    const getKudos = api.kudos.getAll.useQuery();
    //console.log(getKudos.data)
    const isPublic = getKudos.data?.filter((k) => {if(k.isPrivate === false){return k}})
    const isPrivate = getKudos.data?.filter((k) => {if(k.isPrivate === true && k.receiverId === session?.user.id){return k}})
    return(
        <main>
            <h1>Your Kudos</h1>
            {isPrivate?.map((recent) => 
            <div className="pb-1">
                <Image src={`https://example-adrian.s3.amazonaws.com/${recent.image}`} width={200} height={200} alt="Kudos"/>
            </div>)}
            <h1>Recent Kudos</h1>
            {isPublic?.map((recent) => 
            <div className="pb-1">
                <Image src={`https://example-adrian.s3.amazonaws.com/${recent.image}`} width={200} height={200} alt="Kudos" />
            </div>
            )}
        </main>
    )
}

export default KudosPage;