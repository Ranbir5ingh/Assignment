import React from 'react'
import Lottie from 'lottie-react'
import loadingAnimation from '@/assets/loading-animation.json'

export default function Loader() {
  return (
    <div className='h-screen flex items-center justify-center'>
        <div className='w-40 h-40'>
            <Lottie animationData={loadingAnimation} loop={true} />
        </div>
    </div>
  )
}