import React, { useState } from 'react'

function RandomColor() {
    const [color, setColor] = useState('')

    function handleRandomColor(){
        const hex = [1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F']
        let hexColor = '#'

        for(let i=0; i<6; i++){
            hexColor += hex[Math.floor(Math.random()*(hex.length))]

        }

        console.log(hexColor)
        setColor(hexColor)
    }


  return (
    <div className={`p-5 w-full h-80 bg-[${color}]`}>

        <button onClick={()=>handleRandomColor()} className='border border-blue-500 p-2 text-gray-400 bg-white'>Generate Random Color</button>


        <div className={`text-${color}`}>
            HEX Color: {color}
            <p className={`text-${color}`}>Hello</p>
        </div>

    </div>
  )
}

export default RandomColor