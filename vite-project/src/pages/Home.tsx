import React from 'react'
import Background from '../assets/images/background.jpg'

function Home() {
  return (
    <div
      style={{ backgroundImage: `url(${ Background })`}}
      className='mydiv flex flex-row justify center mx-auto bg-cover bg-fixed'
       >
          <div className='flex place-items-center h-screen'></div>
          
        </div>
    
  )
}

export default Home