"use client"

import React, {useState, useEffect} from 'react'
import { Field, Form, Formik, FormikProps, FormikErrors, FormikTouched } from 'formik';

  const UserSelect
   = (props:any) => {
    const [user, setUser] = useState<string | null>()
    const [tasks,setTasks] = useState<string | null>()
    const [values, setValues] = useState<any | null>()
    const [names, setNames] = useState<any>()
    const {userHandle, handleUserJobs} = props

    console.log(user)

 
      
    
    useEffect(()=>{
      const fetchUsers = async () =>{
          const response = await fetch('http://localhost:3000/api/users');
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

     return(
      <div>
        <h1>My Form</h1>
        <Formik
          initialValues={{firstName: ''}}
          onSubmit={(values:any, actions) => {
            actions.setSubmitting(false)
            handleUserJobs(values)
            userHandle(values)
            setValues(values)
            setUser(values)
          }}
        >
          {(props: FormikProps<any>) => (
            <Form>
              <Field as="select" name="firstName">
                <option key="" value="">All</option>
                  {names?.map((name:any)=>{
                      return(
                          <option key={name.id} value={name.first_name}>{name.first_name}</option>
  
                      )
                  })}
            
              </Field>
    
              
              <button type="submit">look up</button>
            </Form>
          )}
        </Formik>
      </div>
    )
   
   }


 export default UserSelect
 