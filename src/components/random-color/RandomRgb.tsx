import React, { useState } from 'react'

function RandomRgb() {
    const [color, setColor] = useState('#000')

    function rgbLength(length:any){
        return Math.floor(Math.random()*length)
    }

    function handleRgb(){
        const r = rgbLength(256)
        const g = rgbLength(256)
        const b = rgbLength(256)

        setColor(`rgb(${r},${g},${b})`)


    }

  return (
    <div className={`p-5 w-full h-80 bg-[${color}]`}>
        <button 
        onClick={handleRgb}
        className='border border-red-500 p-3 text-gray-400'>Generate Random RGB Color</button>

        <h2 className='text-gray-400'>RGB Color: {color}</h2>

    </div>
  )
}

export default RandomRgb