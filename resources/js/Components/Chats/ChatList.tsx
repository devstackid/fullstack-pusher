import { Chat } from '@/types/chat';
import { Link, } from '@inertiajs/react';
import BadgeOnline from './BadgeOnline';
import clsx from 'clsx';
import { relativeTime } from '@/Utils';
import { useChatContext } from '@/Contexts/chat-context';
import BadgeChatNotification from './BadgeChatNotification';
import { fetchChatsInPaginate, markAsRead } from '@/Api/chats';
import ChatListAction from './ChatListAction';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { BsArrowClockwise } from 'react-icons/bs';

type ChatListProps = {
  search: string;
  href: string;
  type: "chats" | 'archived_chats';
  className?: string;
}

export default function ChatList({ search, href, type, className }: ChatListProps) {

  const { chats, setChats, paginate, setPaginate } = useChatContext();

  const {ref: loadMoreRef, inView} = useInView()

  const handleMarkAsRead = (chat: Chat) => {
    !chat.is_read && markAsRead(chat)
  }

  if (chats.length === 0) return;

  useEffect(() => {
      if(inView && loadMoreRef.length > 0){
        if(paginate.next_page_url){
          fetchChatsInPaginate(paginate.next_page_url).then((response) => {
            setPaginate(response.data.data)
            setChats([...chats, ...response.data.data.data])
          })
        }
      }
  }, [inView, paginate])



  return (
    <div className={clsx('relative max-h-[calc(100vh_-_158px)] flex-1 overflow-y-auto px-2 pb-1 sm:max-h-max sm:pb-2', className)}>
      {chats.sort((a, b) => {
        if (search.length === 0) return b.created_at?.localeCompare(a.created_at)

        return a.name.localeCompare(b.name)
      })
        .map((chat) => (
          <div key={chat.id} className='group relative flex items-center'>
            <Link href={route(href, chat.id)} as='button' onClick={() => handleMarkAsRead(chat)} className={clsx(
              'relative flex w-full flex-1 items-center gap-3 px-2 rounded-lg text-left transition-all group-hover:bg-secondary py-2' , route().current(href, chat.id) && 'bg-secondary',
            )}>
              {search.length === 0 && chat.created_at ? <>
                <div className='relative shrink-0'>
                  <img src={chat.avatar} alt={chat.name} className='h-12 w-12 rounded-full border border-secondary' />
                  {chat.is_online && <BadgeOnline />}
                </div>

                <div className='overflow-hidden'>
                  <h5 className='truncate font-medium'>{chat.name}</h5>
                  <div className='flex items-center text-sm text-secondary-foreground'>
                    <p className={clsx('truncate', !chat.is_read && 'font-medium text-foreground', route().current(href, chat.id) && '!text-foreground')} dangerouslySetInnerHTML={{ __html: chat.body }} />
                    <span className='mx-1'>.</span>
                    <span className='shrink-0'>{relativeTime(chat.created_at)}</span>
                  </div>
                </div>
              </> :
                <>
                  <div className='relative shrink-0'>
                    <img src={chat.avatar} alt={chat.name} className='h-10 w-10 rounded-full border border-secondary' />
                    {chat.is_online && <BadgeOnline />}
                  </div>

                  <div className="overflow-hidden">
                    <h5 className='truncate font-medium'>{chat.name}</h5>
                  </div>
                </>}

            </Link>
                {chat.body && <ChatListAction chat={chat} />}

                {!chat.is_read && <BadgeChatNotification />}
          </div>
        ))
      }

      {paginate.next_page_url && <button className='mx-auto mt-4 flex ' ref={loadMoreRef}>
          <BsArrowClockwise className='animate-spin text-2xl text-secondary-foreground'/>
        </button>}
    </div>
  )
}
