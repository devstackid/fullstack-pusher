import clsx from 'clsx'
import React, { useEffect, useRef } from 'react'
import ChatHeader from './ChatHeader'
import ChatBody from './ChatBody'
import ChatFooter from './ChatFooter'

export default function Content() {
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  
  }, [])
  

  const scrollToBottom = () => {
    if(bottomRef.current && chatContainerRef.current){
      chatContainerRef.current.scrollTop = bottomRef.current.offsetTop;
    }
  }

  return (
    <div className={clsx('relative order-3 h-full w-full flex-1 flex-col justify-between overflow-x-hidden sm:border-l border-secondary flex')}>
        <ChatHeader />
        <ChatBody chatContainerRef={chatContainerRef} bottomRef={bottomRef} scrollToBottom={scrollToBottom} />
        <ChatFooter scrollToBottom={scrollToBottom} />
    </div>
  )
}
