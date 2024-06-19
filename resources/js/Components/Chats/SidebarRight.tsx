import { useChatMessageContext } from '@/Contexts/chat-message-context'
import clsx from 'clsx'
import React, { useState } from 'react'
import Attachment from './Attachment'
import ProfileInformation from './ProfileInformation'

export default function SidebarRight() {

  const {showSidebarRight} = useChatMessageContext()
  const [toggleCustomizeChat, setToggleCustomizeChat] = useState(false)
  const [toggleShowMedia, setToggleShowMedia] = useState(false)

  return (
    <div className={clsx('relative order-4 h-full overflow-x-hidden sm:flex-1 sm:border-l border-secondary lg:w-[320px] lg:flex-initial xl:w-[360px]', showSidebarRight ? 'flex' : 'hidden')}>
      <ProfileInformation toggleCustomizeChat={toggleCustomizeChat} toggleShowMedia={toggleShowMedia} setToggleCustomizeChat={setToggleCustomizeChat} setToggleShowMedia={setToggleShowMedia} />
      <Attachment toggleShowMedia={toggleShowMedia} setToggleShowMedia={setToggleShowMedia}/>
    </div>
  )
}
