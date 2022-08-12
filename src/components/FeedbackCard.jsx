import React from 'react'

export default function FeedbackCard(props) {
  console.log(props.feedback)
  return (
    <div className='feedback' >
    
        <p className='text'>
          {props.feedback.txt}
        </p>
        <div className='line'>
            
        </div>
        <div className='bottom-bar' >
        <p className='date' >
            {props.feedback.date}
        </p>
        <button>X</button>
        <button>F</button>
        </div>
    </div>
  )
}
