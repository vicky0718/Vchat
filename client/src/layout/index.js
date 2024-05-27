import React from 'react'
import chatlogo from '../assets/Chat.png'

const AuthLayout = ({children}) => {
  return (
    <>
      <header className='flex justify-center items-center py-3 h-20 shadow-md bg-blue-900'>
        <img 
        src ={chatlogo}
        alt='logo'
        width={150}
        height={60}/>
      </header>
      {children}
    </>
  )
}

export default AuthLayout
