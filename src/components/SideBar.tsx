'use client';
import './sideBar.css';
import { BsPeopleFill, BsListTask, BsAlarmFill, BsPersonCircle } from 'react-icons/bs'

function SideBar() {
  return (
    <div id="side-bar">
      <div id="side-bar-top">
        <div id="whiteboard" className='side-bar-icons'>
          <div id="whiteboard-svg"></div>
          <p>Whiteboard</p>
        </div>
        <div id="teams" className='side-bar-icons'>
          <BsPeopleFill size={'2.25em'} />
          <p>Teams</p>
        </div>
        <div id="tasks" className='side-bar-icons'>
          <BsListTask size={'2.5em'} />
          <p>Tasks</p>
        </div>
        <div id="alarm" className='side-bar-icons'>
          <BsAlarmFill size={'2em'} />
          <p>Alarms</p>
        </div>
      </div>
      <div className="white-board-bottom">
        <div id="account" className='side-bar-icons'>
          <BsPersonCircle size={'2.4em'} />
          <p>Account</p>
        </div>
      </div>
    </div>
  )
}

export default SideBar