import { useModalContext } from '@/Contexts/modal-context';
import { ChatMessage } from '@/types/chat-message';
import clsx from 'clsx'
import React from 'react'
import { BsTrash } from 'react-icons/bs';


type DeleteMessageProps = {
    message: ChatMessage,
    className?: string;
}

export default function DeleteMessage({message, className}: DeleteMessageProps) {

    const {openModal} = useModalContext()
    const deleteConfirmation = () => {
        // TODO: delete message confirmation
        openModal({
            view: 'DELETE_MESSAGE_CONFIRMATION',
            size: 'lg',
            payload: message
        })
    }

  return (
    <div className={clsx('invisible flex flex-shrink-0 gap-2 group-hover:visible group-focus:visible', className)}>
        <button type='button' className='btn btn-secondary rounded-full p-2'
            onClick={deleteConfirmation}>
            <BsTrash />
        </button>
    </div>
  )
}
