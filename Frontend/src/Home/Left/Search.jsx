import React from 'react'
import { IoIosSearch } from "react-icons/io";

function Search() {
    return (
        <div className='h-[8-vh]'>
            <div className='px-6 py-4'>
                <form action=''>
                    <div className='flex space-x-3'>
                        <label className="border-[1px] border-gray-700 bg-slate-900 rounded-lg flex items-center gap-2  w-[80%] p-3">
                            <input type="text" className="grow  outline-none bg-slate-900" placeholder="Search" />
                        </label>
                        <button>
                            <IoIosSearch className='text-5xl p-2 hover:bg-gray-600 rounded-full' />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Search