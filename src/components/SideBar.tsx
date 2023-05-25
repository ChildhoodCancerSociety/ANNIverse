'use client';
import { useRef } from 'react';
import { BsPeopleFill, BsListTask, BsAlarmFill, BsPersonCircle } from 'react-icons/bs'

function SideBar() {
  const whiteBoardText = useRef<HTMLParagraphElement>(null);
  const teamsText = useRef<HTMLParagraphElement>(null);
  const tasksText = useRef<HTMLParagraphElement>(null);
  const alarmText = useRef<HTMLParagraphElement>(null);
  const accountText = useRef<HTMLParagraphElement>(null);

  return (
    <div className="sideBar h-screen flex flex-col justify-between w-20  outline-neutral-400 items-center shadow-xl hover:shadow-2xl transition-all p-4">
      <div className="sideBarTop flex flex-col justify-between h-60">
        <div className="whiteBoard relative text-neutral-500 hover:cursor-pointer hover:scale-110 hover:text-neutral-700 transition-all flex justify-center" 
          onMouseEnter={() => { 
            whiteBoardText.current?.classList.add('block'); 
            whiteBoardText.current?.classList.remove('hidden'); 
          }}
          onMouseLeave={() => { 
            whiteBoardText.current?.classList.add('hidden'); 
            whiteBoardText.current?.classList.remove('block'); 
          }}
        >
          <div className="whiteBoardSvg border-2 border-neutral-400 h-8 w-14 rounded-sm hover:cursor-pointer hover:border-neutral-700 transition-all" ></div>
          <p className='top-0 w-28 absolute left-16 bg-neutral-800 p-1 rounded-sm text-neutral-50 text-center hidden' ref={whiteBoardText}>White Board</p>
        </div>
        <div className="teams text-neutral-500 hover:cursor-pointer hover:scale-110 hover:text-neutral-700 transition-all flex justify-center" >
          <BsPeopleFill size={'2.25em'} 
            onMouseEnter={() => { 
              teamsText.current?.classList.add('block'); 
              teamsText.current?.classList.remove('hidden'); 
            }}
            onMouseLeave={() => { 
              teamsText.current?.classList.add('hidden'); 
              teamsText.current?.classList.remove('block'); 
            }}
          />
          <p className='top-1 w-28 absolute left-16 bg-neutral-800 p-1 rounded-sm text-neutral-50 text-center hidden' ref={teamsText}>Teams</p>
        </div>
        <div className="tasks text-neutral-500 hover:cursor-pointer hover:scale-110 hover:text-neutral-700 transition-all flex justify-center">
          <BsListTask size={'2.5em'} 
            onMouseEnter={() => { 
              tasksText.current?.classList.add('block'); 
              tasksText.current?.classList.remove('hidden'); 
            }}
            onMouseLeave={() => { 
              tasksText.current?.classList.add('hidden'); 
              tasksText.current?.classList.remove('block'); 
            }}
          />
          <p className='top-1 w-28 absolute left-16 bg-neutral-800 p-1 rounded-sm text-neutral-50 text-center hidden' ref={tasksText}>Tasks</p>
        </div>
        <div className="alarm text-neutral-500 hover:cursor-pointer hover:scale-110 hover:text-neutral-700 transition-all flex justify-center">
          <BsAlarmFill size={'2em'} 
            onMouseEnter={() => { 
              alarmText.current?.classList.add('block'); 
              alarmText.current?.classList.remove('hidden'); 
            }}
            onMouseLeave={() => { 
              alarmText.current?.classList.add('hidden'); 
              alarmText.current?.classList.remove('block'); 
            }}
          />
          <p className='top-0.5 w-28 absolute left-16 bg-neutral-800 p-1 rounded-sm text-neutral-50 text-center hidden' ref={alarmText}>Alarms</p>

        </div>
      </div>
      <div className="whiteBoardBottom">
        <div className="account text-neutral-500 hover:cursor-pointer hover:scale-110 hover:text-neutral-700 transition-all flex justify-center">
          <BsPersonCircle size={'2.4em'} 
            onMouseEnter={() => { 
              accountText.current?.classList.add('block'); 
              accountText.current?.classList.remove('hidden'); 
            }}
            onMouseLeave={() => { 
              accountText.current?.classList.add('hidden'); 
              accountText.current?.classList.remove('block'); 
            }}
          />
          <p className='top-1 w-28 absolute left-16 bg-neutral-800 p-1 rounded-sm text-neutral-50 text-center hidden' ref={accountText}>Account</p>

        </div>
      </div>
    </div>
  )
}

export default SideBar