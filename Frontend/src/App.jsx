import React from 'react'
import Left from './Home/Left/Left'
import Right from './Home/Right/right'
import Logout1 from './Home/Left1/Logout1'

export default function App() {
  return (
    <>
    <div className='flex h-screen'>
    <Logout1></Logout1>
      <Left></Left>
      <Right></Right>
      
    </div>
    </>
  )
}
