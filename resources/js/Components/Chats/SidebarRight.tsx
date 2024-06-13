import { useChatMessageContext } from '@/Contexts/chat-message-context'
import clsx from 'clsx'
import React from 'react'

export default function SidebarRight() {

  const {showSidebarRight} = useChatMessageContext()

  return (
    <div className={clsx('relative order-4 h-full overflow-x-hidden sm:flex-1 sm:border-l border-secondary lg:w-[320px] lg:flex-initial xl:w-[360px]', showSidebarRight ? 'flex' : 'hidden')}>SidebarRight</div>
  )
}
