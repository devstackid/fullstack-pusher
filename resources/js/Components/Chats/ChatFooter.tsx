import { SaveMessage } from '@/Api/chat-messages'
import { useAppContext } from '@/Contexts/app-context'
import { useChatContext } from '@/Contexts/chat-context'
import { useChatMessageContext } from '@/Contexts/chat-message-context'
import clsx from 'clsx'
import EmojiPicker, { Theme } from 'emoji-picker-react'
import React, { useRef, useState, KeyboardEvent, useEffect } from 'react'
import { BiSend } from 'react-icons/bi'
import { BsEmojiSmile, BsPlusLg } from 'react-icons/bs'
import { Preview } from './Content'
import { existingFiles, existingLinks, existingMedia } from '@/Utils'

type ChatFooterProps = {
    scrollToBottom: () => void;
    attachments: Preview[]
    closeOnPreview: () => void
    onSelectOrPreviewFiles: (files: FileList | null)=> void
}

export default function ChatFooter({scrollToBottom, attachments, closeOnPreview, onSelectOrPreviewFiles}: ChatFooterProps) {

    const {theme} = useAppContext();

    const {refetchChats} = useChatContext()
    const {user, messages, setMessages, reloadMedia, reloadFiles, reloadLinks} = useChatMessageContext()

    const [message, setMessage] = useState("")
    const [textAreaHeight, setTextAreaHeight] = useState(48)
    const textAreaRef = useRef<HTMLTextAreaElement>(null)
    const [processing, setProcessing] = useState(false)

    const [isOpenEmoji, setIsOpenEmoji] = useState(false)

    useEffect(() => {
      textAreaRef.current?.focus()
    }, [])
    
    
    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSelectOrPreviewFiles(e.target.files)
    };

    const handleOnKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        const onPressBackspace = e.key === "Backspace";
        const onPressEnter = e.key === "Enter";

        if(onPressEnter && !e.shiftKey){
            e.preventDefault()
            handleOnSubmit(e as unknown as React.FormEvent<HTMLFormElement>);

            if(onPressBackspace){
                const target = e.target as HTMLTextAreaElement
                const lines = target.value.split("\n")

                if(target.offsetHeight > 48){
                    if(lines[lines.length -1] === ""){
                        setTextAreaHeight((prev) => prev -24)
                    }
                }
            }
        }
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
        if(textAreaRef.current){
            const {scrollHeight, clientHeight} = textAreaRef.current
            if(scrollHeight !== clientHeight){
                setTextAreaHeight(scrollHeight + 4)
            }
        }
    }

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setProcessing(true)

        if(message.length === 0 && attachments.length === 0 || processing){
            return;
        }

        SaveMessage({user, message, attachments})
        .then((response) => {
            closeOnPreview();
            setMessage('')
            setTextAreaHeight(48)
            textAreaRef.current?.focus()
            setIsOpenEmoji(false)
            

            const data = response.data.data

            setMessages([...messages, data]);

            existingMedia(data.attachments) && reloadMedia(user)
            existingFiles(data.attachments) && reloadFiles(user)
            existingLinks(data.links) && reloadLinks(user)


            refetchChats();

            setTimeout(scrollToBottom, 300);
        })
        .finally(() => setProcessing(false))

    }

    const toggleEmoji = () => {
        setIsOpenEmoji(!isOpenEmoji)
    }

    const handleOnEmojiClick = (emoji: string) => {
        setMessage((prevMsg) => prevMsg + emoji)
    }

  return (
    
    <form className='flex items-end gap-2 bg-background p-2 text-foreground' onSubmit={handleOnSubmit}>
        <label htmlFor="file" className='mb-1 cursor-pointer rounded-full p-2 text-primary transition-all hover:bg-secondary focus:bg-secondary'>
            <BsPlusLg className='h-6 w-6' />
            <input type="file" className='hidden' id='file' multiple onChange={onSelectFile} />
        </label>

        <div className="relative flex flex-1 items-end">
            <button onClick={toggleEmoji} type='button' className='absolute right-2 mb-3 text-primary'>
                <BsEmojiSmile  className='h-6 w-6' />
            </button>

            <div className={clsx('absolute bottom-14 right-0 z-10', isOpenEmoji ? 'block' : 'hidden')}>
                <EmojiPicker theme={(theme === 'system' ? 'auto' : theme) as Theme} skinTonesDisabled={true} height={400} onEmojiClick={({emoji}) => handleOnEmojiClick(emoji)}></EmojiPicker>
            </div>


            <textarea placeholder='Aa' className='max-h-[7.5rem] w-full resize-none rounded-xl border border-secondary bg-secondary pr-10 text-foreground focus:ring-transparent focus:border-transparent' value={message} onKeyDown={handleOnKeyDown} onChange={handleOnChange} style={{ 
                height: `${textAreaHeight}px`
             }} ref={textAreaRef}></textarea>
        </div>

        <button className={clsx('mb-1 flex rounded-full p-2 text-primary transition-all disabled:cursor-not-allowed', 
            message.trim().length === 0 && 'hover:bg-secondary focus:bg-secondary',
            message.trim().length > 0 && !processing && 'bg-primary !text-white'
            )}
            disabled={processing}
            >
            <BiSend className='h-6 w-6'/>
        </button>
    </form>
  )
}
