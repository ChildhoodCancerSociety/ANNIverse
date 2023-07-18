import { useForm } from "react-hook-form";
import BasicModal from "../BasicModal";
import { useEffect, useState } from "react";
import { api } from "@/utils/api";

interface Users{
    email: string | undefined;
    image: string | undefined;
    name: string | undefined;
}

const WidgetTemplate = () => {
    const [toggleModal, setToggleModal] = useState(true);
    const { register, handleSubmit, reset, formState: {errors} } = useForm();

    const handleClose = () => {
        setToggleModal(true);
        reset();
    };
    //get users from User table
    const users:any = api.user.getAll.useQuery();

    //stores users to use map function
    const user:Users[] = users.data;
    //console.log(user)
    const submitForm = (data: any) => {
        console.log(data);
        reset();
    };
    return (
        <div>
            <button className="bg-green-50 border rounded-sm shadow-sm p-1 hover:bg-green-500" onClick={() => setToggleModal(!toggleModal)}>Create A Kudo</button>
            {!toggleModal &&
                <BasicModal handleClose={handleClose}>
                    <h1 className="text-2xl">Give someone Kudos</h1>
                    <form onSubmit={handleSubmit(submitForm)}>
                        <label>
                            <p className="text-sm">Whose deeds are deemed worthy of a kudo?</p>
                            <select className="flex rounded-sm w-full" {...register("member", { required: true })}>
                                <option value="">Choose A Member</option>
                                {user?.map((u, idx: number) =>
                                    <option key={idx} value={u.name}>{u.name}</option>
                                )}
                            </select>
                            {errors.member && <span className="text-redwood-600">Member is required</span>}
                        </label>
                        <label>
                            <p className="text-sm ">Where should this message be shared?</p>
                            <select className="rounded-sm w-full" {...register("location", { required: true })}>
                                <option value="">Choose A Location</option>
                                <option value="home page">Home Page</option>
                            </select>
                            {errors.location && <span className="text-redwood-600">Location is Required</span>}
                        </label>
                        <label>
                            <p className="text-sm"> What would you like to say?</p>
                            <textarea
                                className="rounded-sm w-full text-sm text-green-900 focus:ring-green-500 focus:border-green-500"
                                placeholder="Ex: Thank you for doing a great job!"
                                {...register("message", { required: true })}
                            />
                            {errors.message && <p className="text-redwood-600">Message is Required</p>}
                        </label>
                        <label>
                            Public
                            <input {...register("display", { required: true })} type="radio" value="public"/>
                        </label>
                        <label>
                            Private
                            <input {...register("display", { required: true })} type="radio" value="private" />
                        </label>
                        {errors.display && <p className="text-redwood-600">Choose to post publicly or privately</p>}
                        <div className="flex flex-1 justify-end">
                            <button onClick={handleClose} className="bg-green-50 border rounded-sm shadow-sm p-1 mr-1 hover:bg-green-700 hover:text-slate-50">Close</button>
                            <button type="submit" className="bg-green-200 border rounded-sm shadow-sm p-1 hover:bg-green-700 hover:text-slate-50">Submit</button>
                        </div>
                    </form>
                </BasicModal>
            }
        </div>
    );
};

export default WidgetTemplate;