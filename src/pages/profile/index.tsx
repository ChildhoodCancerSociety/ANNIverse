import { api } from "@/utils/api";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";

const Profile = () =>{
    // const {data: session} = useSession();
    // const [profileData, setProfileData] = useState();
    const [edit, setEdit] = useState(false);
    const user:any = api.user.get.useQuery();
    const { register, handleSubmit, reset, formState: {errors, dirtyFields} } = useForm();

    const updateProfile = api.user.updateUserInfo.useMutation();
  
    const submitForm = async (data:any) =>{
        await updateProfile.mutateAsync({...data});
        await user.refetch();
        setEdit(false);
    }
    
    return(
        <main className="flex flex-col items-center justify-center">
            <h1>My Account</h1>
            <Image src={user.data?.image} alt={user.data?.name} width={100} height={100} className="rounded-full py-2" />
            {edit ?  
                <form onSubmit={handleSubmit(submitForm)} className=" border flex flex-col shadow-lg rounded px-20 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-sm mb-2 font-bold">
                        Profile Handle:
                    </label>
                    <input type="text" defaultValue={user.data?.handle} className="shadow appearance-none rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    {...register("handle")}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm mb-2 font-bold">
                        Name:
                    </label>
                    <input type="text"  defaultValue={user.data?.name}  className="shadow appearance-none rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" {...register("name")}/>
                </div>
                <div className="mb-4">
                    <label className="block text-sm mb-2 font-bold">
                        Email:
                    </label>
                    <input type="text" defaultValue={user.data?.email} className="shadow appearance-none rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" {...register("email")}/>
                </div>
                {/* <div className="mb-4">
                    <label className="block text-sm mb-2 font-bold">
                        Profile Picture:
                    </label>
                    <input type="file" {...register("image")}/>
                </div> */}
                <div className="pt-3">
                <button type="submit" className="rounded border mx-auto px-3 py-2 shadow-lg hover:bg-green-100">Save</button>
                <button type="button" className="rounded border mx-auto px-3 py-2 shadow-lg hover:bg-green-100 ml-2" onClick={()=>setEdit(false)}>Cancel</button>
        
                </div>
            </form>
            :
            <div className=" border flex flex-col shadow-lg rounded px-20 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-sm mb-2 font-bold">
                        Profile Handle:
                    </label>
                    <p>{user.data?.handle}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-sm mb-2 font-bold">
                        Name:
                    </label>
                    <p>{user.data?.name}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-sm mb-2 font-bold">
                        Email:
                    </label>
                    <p>{user.data?.email}</p>
                </div>
                <div className="pt-3">
                <button type="button" className="rounded border mx-auto px-3 py-2 shadow-lg hover:bg-green-100" onClick={()=> setEdit(true)} >Edit</button>
                </div>
            </div>
            }
        </main>
    )
}

export default Profile;