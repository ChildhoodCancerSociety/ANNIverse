"use client"
import React, {useEffect, useState} from 'react';
import SingleTask from './SingleTask';
import UserSelect from './UserSelect';


export default function MainView(){
    const [user, setUser] = useState<any>()
    const [names, setNames] = useState<any>()
    const [tasks, setTasks] = useState<any>()

    const handleUserJobs = (values:any) =>{
        
        const allNames = names?.map((name:any)=>{return name})
        const filterUser = allNames?.filter((el:any)=>el.first_name === values?.firstName)
        const filterUserId = filterUser?.map((user:any)=>user.id).pop() 
    console.log(values)

       const jobs = tasks?.filter((task:any)=>task.assigned_users.some((user:any)=> user.userId.includes(filterUserId)))
   }

    const userHandle = (user:any) =>{
        setUser(user)
    }

    const handleSort = () =>{
        
      const data = [...tasks].sort((a:any,z:any)=> {return a.createdAt - z.createdAt
      ? 1
      : -1} )
        setTasks(data)
      
    }
    
    useEffect(()=>{
        const fetchUsers = async () =>{


            const response = await (await fetch('http://localhost:3000/api/users'))
            const data = await response.json()
            setNames(data.data)
            
        }
        const fetchTasks = async () =>{
            const response = await (await fetch('http://localhost:3000/api/tasks'))
            const data = await response.json()
            const map = data.data.map((da:any)=> da.assigned_users)[0].map((d:any)=> d.userId)
            
            setTasks(data.data)


        }
    fetchUsers()
    fetchTasks()
        },[])

        const allNames = names?.map((name:any)=>{return name})
        const filterUser = allNames?.filter((el:any)=>el.first_name === user?.firstName)
        const filterUserId = filterUser?.map((user:any)=>user.id).pop() 
        const jobs = tasks?.filter((task:any)=>task.assigned_users.some((user:any)=> user.userId.includes(filterUserId)))
  return (
    <main>

         <UserSelect userHandle={userHandle} handleUserJobs={handleUserJobs}/>
         <button onClick={handleSort}>Sort By Date</button>
         
         {!user?.firstName && tasks?.map((task:any)=>{
            const firstName = task.assigned_users?.map((assigned_user:any)=>{
                const userId = assigned_user.userId
                const userInfo = names?.find((name:any)=>name.id === userId)
                return userInfo?.first_name
            })
         return(
            <div key={task.id}>
                <SingleTask name={firstName} task={task}/>
            </div>
         )
         })}
         {user && jobs?.map((job:any)=>{
            console.log(job)
            const firstName = job.assigned_users?.map((assigned_user:any)=>{
                const userId = assigned_user.userId
                const userInfo = names?.find((name:any)=>name.id === userId)
                return userInfo.first_name

                
                
            }
            )
            return(
               <div key={job.id}>
                   <SingleTask name={firstName} task={job}/>
               </div>
            )
        })}
            </main>
         )}
        
        
          
