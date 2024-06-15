import React, { useState } from 'react'
import { FaUsers } from 'react-icons/fa'
import ChatListSearch from '@/Components/Chats/ChatListSearch'
import ChatList from '@/Components/Chats/ChatList'
import { useChatContext } from '@/Contexts/chat-context'
import clsx from 'clsx'

export default function Sidebar() {

  const {chats} = useChatContext();
  const [search, setSearch] = useState("")

  return (
    <div className={clsx('flex-1 order-1 shrink-0 flex-col sm:order-2 sm:flex sm:w-[320px] text-foreground gap-2 sm:flex-initial sm:border-l sm:border-secondary lg:w-[360px]', route().current("chats.show") ? 'hidden' : 'flex')}>
      <div className="flex items-center justify-between px-2 pt-2 sm:pb-0">
        <h3 className='text-2xl font-semibold'>Chats</h3>
        <button className='flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white'>
          <FaUsers />
        </button>
      </div>

      {/* searching */}
      <ChatListSearch search={search} setSearch={setSearch} />


      {/* chats recently */}
      <ChatList search={search} href="chats.show" type="chats" />

      {/* jika tidak ada chat */}
      {chats.length === 0 && search.length > 0 && (<p className='flex h-full flex-1 items-center justify-center'>User not found</p>)}

      {chats.length === 0 && search.length === 0 && (<p className='flex h-full flex-1 items-center justify-center'>No chat yet</p>)}
    </div>
  )
}
