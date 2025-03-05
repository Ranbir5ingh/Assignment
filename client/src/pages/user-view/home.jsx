import React from 'react'
import { useSelector } from 'react-redux'

export default function Home() {
  const {user} = useSelector((state) => state.auth)
  return (
    <div className='container p-4 h-[92vh]'>
      <h1 className="text-2xl font-light">
      {`Hello ${user?.userName} (${user?.role})`} 
      </h1>
    </div>
  )
}
