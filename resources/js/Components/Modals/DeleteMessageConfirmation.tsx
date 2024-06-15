import React, { Fragment } from 'react'
import Modal from './Modal'
import { useModalContext } from '@/Contexts/modal-context'
import { ChatMessage } from '@/types/chat-message'
import { DeleteMessage } from '@/Api/chat-messages'
import { useChatContext } from '@/Contexts/chat-context'
import { useChatMessageContext } from '@/Contexts/chat-message-context'

export default function DeleteMessageConfirmation() {
    const {closeModal, data: message} = useModalContext<ChatMessage>()
    const {refetchChats} = useChatContext()
    const {messages, setMessages} = useChatMessageContext()

    if(!message) return

    const handleDeleteMessage = () => {
        DeleteMessage(message).then(() => {
            refetchChats()
            setMessages([...messages.filter((m) => m.id !== message.id)])

            closeModal()
        })
    }

  return (
    <Modal>
        <Modal.Header title='Hapus pesan untuk saya?' onClose={closeModal}></Modal.Header>
        <Modal.Body as={Fragment}>
            <p>
                Pesan ini hanya akan dihapus untuk saya. Orang lain tetap dapat melihat chat yang telah anda hapus.</p>

            {message.attachments.length > 0 && <p>{message.attachments.length} file akan dihapus untuk saya.</p>}
        </Modal.Body>
        
        <Modal.Footer className='flex justify-between gap-4'>
            <button className='btn btn-secondary flex-1 ' onClick={closeModal}>Batal</button>
            <button className="btn btn-danger flex-1" onClick={handleDeleteMessage}>Hapus untuk saya</button>
        </Modal.Footer>
    </Modal>
  )
}
