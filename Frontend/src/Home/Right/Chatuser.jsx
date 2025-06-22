import React from 'react'
import Ahmad from '../../assets/Ahmad.jpg'

export default function Chatuser() {
    return (
        <>
            <div className=' pl-5 pt-5 pb-3 h-[13vh] flex space-x-4 bg-gray-900 hover:bg-gray-600'>
                <div>
                    <div className="avatar online">
                        <div className="w-14 rounded-full">
                            <img src={Ahmad} />
                        </div>
                    </div>
                </div>

                <div>
                    <h1 className='text-xl'>Ahmad Suhaib</h1>
                    <span className='text-sm'>Online</span>
                </div>
            </div>
        </>
    )
}
