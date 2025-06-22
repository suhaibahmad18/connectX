import React from 'react'
import { IoSend } from "react-icons/io5";

export default function Type() {
    return (
        <div >
            <div className='py-1 flex space-x-3 h-[10vh] text-center bg-gray-800'>
                <div className='w-[90%] mx-4'>
                    <input type="text" placeholder="Type here" className=" px-3 py-3 mt-1 rounded-xl border-[1px] border-gray-700 bg-slate-900  flex items-center w-full grow outline-none " />
                </div>
                <button className='text-3xl'>
                    <IoSend />
                </button>
            </div>
        </div>
    )
}
