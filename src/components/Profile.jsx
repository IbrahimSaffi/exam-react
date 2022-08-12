import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import mainSlice from '../slices/mainSlice';
import FeedbackCard from './FeedbackCard';
import "./Profile.css"
export default function Profile() {
    let state =  useSelector(state=>state.mainSlice)
    console.log(state.currUser)
  return (
    <div className='profile' >
        <div className='profile-details'>
            {/* Profile pic */}
        <img className='profile-pic' src="./profile-pic.jpg" alt="" />
         <h2 className='name' >{state.currUser.profile.userName}</h2>
         <h2 className='email'>{state.currUser.profile.email}</h2>
        </div>
        <div className='feedbacks' >
           {state.currUser.feedbacks.map(ele=>{
            return <FeedbackCard feedback = {ele} />
           })}
        </div>
    </div>
  )
}
