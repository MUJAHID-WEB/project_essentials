import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'

function StarRating({noOfStars = 5}) {
  const [rating, setRating]=useState(0)
  const [hover, setHover]=useState(0)


  function handleClick(getCurrentIndex:any){
console.log(getCurrentIndex)
setRating(getCurrentIndex)
  }

  function handleMouseMove(getCurrentIndex:any){
    console.log(getCurrentIndex)
    setHover(getCurrentIndex)
  }

  function handleMouseLeave(){
    setHover(rating)
  }
  return (
    <div className='flex flex-row p-5'>
      {
        [...Array(noOfStars)].map((_,index)=>(
    


          <FaStar
          key={index}
          className={index >= (hover || rating) ? 'text-black' :  'text-yellow-500'}
          onClick={()=>handleClick(index + 1)}
          onMouseMove={()=>handleMouseMove(index + 1)}
          onMouseLeave={()=>handleMouseLeave()}
          size={40}
          />
        ))
      }

    </div>
  )
}

export default StarRating