import { Fragment } from 'react'
import Modal from './Modal'
import { useModalContext } from '@/Contexts/modal-context'
import { useChatContext } from '@/Contexts/chat-context'
import { Chat } from '@/types/chat'
import { deleteChat } from '@/Api/chats'
import { router } from '@inertiajs/react'

export default function DeleteChatConfirmation() {
    const {closeModal, data: chat} = useModalContext<Chat>()
    const {chats, setChats} = useChatContext()

    if(!chat) return

    const handleDeleteChat = () => {
        deleteChat(chat).then(() => {
            if(route().current('chats.index')){
                closeModal()
                setChats([...chats.filter((c) => c.id !== chat.id)])

                return;
            }

            router.replace(route('chats.index'));
        })
    }

  return (
    <Modal>
        <Modal.Header title='Hapus pesan untuk saya?' onClose={closeModal}></Modal.Header>
        <Modal.Body as={Fragment}>
            <p>
                Percakapan ini hanya akan dihapus seluruhnya untuk saya. Orang lain tetap dapat melihat percakapan yang telah anda hapus.</p>

        </Modal.Body>
        
        <Modal.Footer className='flex justify-between gap-4'>
            <button className='btn btn-secondary flex-1 ' onClick={closeModal}>Batal</button>
            <button className="btn btn-danger flex-1" onClick={handleDeleteChat}>Hapus untuk saya</button>
        </Modal.Footer>
    </Modal>
  )
}
