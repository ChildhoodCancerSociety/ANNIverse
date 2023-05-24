import React from 'react'



const SingleTask = (props:any) =>{
  // console.log(props)
  return (

    <div className='flex mx-10'>
        {/* <h2>singletask</h2> */}
        <div>
        <h1 className='mx-5 w-10'>{props.name}</h1>

        </div>
        <h1 className='mx-5 '>{props.task.id}</h1>
        <h1 className='mx-5 w-[150px]'>{props.task.title}</h1>
        <h1 className='mx-5 '>{props.task.description}</h1>
        </div>
  )
}

export default SingleTask