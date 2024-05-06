import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increment, decrement } from '../counter/countersSlice'

function Counter() {
    const counters = useSelector((state:any)=>state.counters)
    const dispatch = useDispatch()

    const handleIncrement = (counterId:any)=>{
        dispatch(increment(counterId))
    }

    const handleDecrement = (counterId:any)=>{
        dispatch(decrement(counterId))
    }

    const totalCount = counters.reduce(
        (sum:any, current:any) => sum + current.value, 0
    )

    return (
        <> 
            {counters.map((counter:any) => (
                <div key={counter.id} className='p-5'>
                    <p>{counter.value}</p>
                    <button onClick={() => handleIncrement(counter.id)}>Increment</button>
                    <button onClick={() => handleDecrement(counter.id)}>Decrement</button>
                </div>
            ))}
            <div>
                <p>Total Count: {totalCount}</p>
            </div>
        </>
    )
}

export default Counter
