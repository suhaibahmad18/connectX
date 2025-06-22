import React from 'react'
import Ahmad from '../../assets/Ahmad.jpg'

export default function User() {
  return (
    <div>
        <div className='flex space-x-4 px-8 py-7 hover:bg-slate-600 cursor-pointer' >
            <div className="avatar online">
                <div className="w-14 rounded-full">
                    <img src={Ahmad} />
                </div>
            </div>

            <div>
                <h1 className='font-bold'>
                    Ahmad Suhaib
                </h1>
                <span>
                    suhaibahmad@gmail.com
                </span>
            </div>
        </div>
    </div>
  )
}
