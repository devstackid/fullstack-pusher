import BadgeOnline from './BadgeOnline'
import { CHAT_TYPE } from '@/types/chat';
import moment from 'moment';
import { BsThreeDots } from 'react-icons/bs';
import { useChatMessageContext } from '@/Contexts/chat-message-context';

export default function ChatHeader() {

    const {user, toggleSidebarRight} = useChatMessageContext();

    return (
        <div className='flex h-14 items-center justify-between border-b border-secondary p-2 shadow-sm'>
            <div className="flex items-center gap-2">
                <div className="relative">
                    <img src={user.avatar} alt={user.name} className='h-10 w-10 rounded-full border border-secondary' />
                    {user.is_online && <BadgeOnline className='!right-0' />}
                </div>

                <div className="leading-4">
                    <h5 className="font-medium text-foreground">{user.name}</h5>
                    {user.chat_type === CHAT_TYPE.CHATS && (<span className='text-xs text-secondary-foreground'>
                        {user.is_online ? 'Online' : moment(user.last_seen).format('DD/MM/YY H:mm')}
                    </span>)}
                </div>
            </div>

            <button onClick={toggleSidebarRight} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-secondary focus:bg-secondary">
                <BsThreeDots />
            </button>
        </div>
    )
}
