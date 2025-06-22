import React from 'react'
import { TbLogout2 } from "react-icons/tb";

export default function Logout() {
  return (
    <div className='w-[4%] bg-slate-950 text-white flex flex-col justify-end'>
    
    <div className='p-3'>
                <form action=''>
                    <div className='flex space-x-3'>
                        
                        <button>
                            <TbLogout2 className='text-5xl p-2 hover:bg-gray-600 rounded-lg'/>
                        </button>
                    </div>
                </form>
            </div>
    
    
    </div>
  )
}