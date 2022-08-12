import React, { useRef } from 'react'
import {useParams} from 'react-router-dom';
import mainSlice, { setFeedbackPerson } from '../slices/mainSlice';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { fsDatabase } from '../firebase-config';
import {useDispatch,useSelector} from 'react-redux';
import { useEffect } from 'react';
export default function Feedback() {
  let state = useSelector(state=>state.mainSlice)
  let user = useParams()
  let userName = user.name
  let dispatch = useDispatch(mainSlice)
  let feedbackRef = useRef(null)
  async function getDataFS(userName) {
    let querySnapshot = await getDocs(collection(fsDatabase, "users"));
    querySnapshot.forEach((doc) => {
        let dataElement = doc.data()
        console.log(dataElement)
        if(dataElement.profile.userName.toLowerCase()===userName){
          dispatch(setFeedbackPerson(dataElement))
        }
        else{

        }  
      })
    }
    useEffect(()=>{
     getDataFS(userName)
    },[])
    async function sendFeedback(){
      let feedback = feedbackRef.current.value
      let date = new Date()
      let feedbackArr = state.feedbackPerson.feedbacks.slice()
   feedbackArr.push({txt:feedback,date:date})
   const userRef = doc(fsDatabase, "users", state.feedbackPerson.id);
   await updateDoc(userRef, {
     feedbacks:feedbackArr
    });
    getDataFS()
  }
  return (
    <div className='feedback-page'>
      {state.feedbackPerson===null?
      <div>
        <h2>Page is loading
        </h2>
        <p>  If it takes too much time then make sure url is correct</p>
      </div>:
      <div className='feedback-container' >
      <div className="profile-detail-feedback">
       <h2 style={{textTransform:"capitalize"}} >{state.feedbackPerson.profile.userName}</h2>
      </div>
     <div className='feedback-input' >
      <input ref={feedbackRef} type="text" placeholder='Write Your Feedback' />
      <button className="feedback-btn" onClick={()=>sendFeedback()} >Send Feedback</button>
     </div>
     </div>}   
    </div>
  )
}
