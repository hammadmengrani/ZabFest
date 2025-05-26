
import ChatComponent from '@/components/gpt/ChatComponent'
import SideBar from '@/components/gpt/Sidebar'
import React from 'react'

const page = () => {
  return (
    <div className='flex w-full fixed overflow-hidden'>
        <SideBar/>
        <ChatComponent/>
    </div>
  )
}

export default page