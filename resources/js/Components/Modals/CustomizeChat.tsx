import { useChatMessageContext } from '@/Contexts/chat-message-context'
import Modal from './Modal'
import { useModalContext } from '@/Contexts/modal-context'
import { Chat } from '@/types/chat'
import { useState } from 'react'
import clsx from 'clsx'
import { customizeChat } from '@/Api/chats'

export default function CustomizeChat() {
    const {closeModal, dispatchOnCanceled} = useModalContext<Chat>()
    const {user, setUser} = useChatMessageContext()
    const [selectedColor, setSelectedColor] = useState(user.message_color)

    const colors = [
        '#2863EB',
        '#2196F3',
        '#00BCD4',
        '#3F51B5',
        '#673AB7',
        '#9C27B0',
        '#F25C55',
        '#FFC107',
        '#FF9800',
        '#ff2522',
        '#4CAF50',
        '#ED9F9B',
    ]

    const changeMessageColor = (color: string) => {
        setSelectedColor(color)
        setUser({...user, message_color: color})
    }

    const setMessageColor = () => {
        customizeChat(user, selectedColor).then(() => {
            closeModal()
        })
    }

    const handleOnClose = () => {
        if(dispatchOnCanceled && typeof dispatchOnCanceled === 'function'){
            dispatchOnCanceled()
        }
        closeModal()
    }
  return (
    <Modal>
        <Modal.Header title='Themes' onClose={handleOnClose}></Modal.Header>
        <Modal.Body className='grid grid-cols-4 gap-2'>
            
           {colors.map((color, index) => 
                <button className={clsx('flex items-center h-20 w-20 rounded-2xl justify-center hover:bg-secondary p-2 focus:bg-secondary', color === selectedColor && 'bg-secondary')} key={index} onClick={() => changeMessageColor(color)}>
                    <span className='inline-block h-16 w-16 shrink-0 rounded-full' style={{ background:color }}></span>
                </button>
            )}

        </Modal.Body>
        
        <Modal.Footer className='flex justify-between gap-4'>
            <button className='btn btn-secondary flex-1 ' onClick={handleOnClose}>Batal</button>
            <button className="btn btn-primary flex-1" onClick={setMessageColor}>Save</button>
        </Modal.Footer>
    </Modal>
  )
}
