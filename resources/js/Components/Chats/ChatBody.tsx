import { useAppContext } from '@/Contexts/app-context';
import { useChatMessageContext } from '@/Contexts/chat-message-context'
import { CHAT_TYPE } from '@/types/chat';
import moment from 'moment';
import React from 'react'
import ChatMessages from './ChatMessages';

type ChatBodyProps = {
  chatContainerRef: React.RefObject<HTMLDivElement>,
  bottomRef: React.RefObject<HTMLDivElement>,
  scrollToBottom: () => void;
}

export default function ChatBody({chatContainerRef, bottomRef, scrollToBottom}: ChatBodyProps) {
  const {auth} = useAppContext();
  const {user} = useChatMessageContext();
  return (
    <div className='relative max-h-[100vh_-_120px] flex-1 overflow-auto p-2 pt-8' ref={chatContainerRef}>
      <div className="flex flex-col items-center justify-center text-center">
        <div className="user-picture">
          <img src={user.avatar} alt={user.name} className='h-12 w-12 rounded-full border border-secondary' />
        </div>
        <div>
          <h5 className="mt-1 text-lg font-medium text-foreground">{user.name}</h5>
          {user.chat_type === CHAT_TYPE.GROUP_CHATS ? <p className='text-xs text-secondary-foreground'>
            {auth.id === user.creator_id ? 'You' : `${user.creator.name} `}
            created group "{user.name}" <br />
            on {moment(user.created_at).format('DD/MM/YY ')} 
            at {moment(user.created_at).format('H:mm')}
          </p> : <p className='text-xs text-secondary-foreground'>Join <br /> on {moment(user.created_at).format('DD/MM/YY ')} 
           at {moment(user.created_at).format('H:mm')}</p>} 
          
        </div>
      </div>

      <ChatMessages />

      <div ref={bottomRef} className='h-0' />
    </div>
  )
}
