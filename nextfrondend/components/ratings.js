import ReactStars from 'react-stars'
import React from 'react'
import { render } from 'react-dom'

export default function Ratings({rating}) {

    return (
        <div>
            <div className='my-4 border-b border-slate-400 pb-4 w-full'>
                <h3 className='text-xl text-white-800 font-semibold'>Your Mentor Ratings</h3>
                <ReactStars
                    count={5}
                    value={rating}
                    edit={false}
                    color2={'#ffd700'}
                />
            </div>
        </div>
    )
}