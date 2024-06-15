import { Attachment, ChatMessage, ChatProfile, Link } from "@/types/chat-message"
import { AxiosResponse } from "axios"

export const SaveMessage = ({user, message, attachments}: {user: ChatProfile, message: string, attachments: File[]}) : Promise<AxiosResponse<{data: ChatMessage}>> => {
    return window.axios.post(route('chats.store'), {
        to_id: user.id,
        body: message,
        attachments
    }, {
        headers: {
            "Content-Type" : "multipart/form-data"
        }
    })
}

export const DeleteMessage = (message: ChatMessage): Promise<AxiosResponse<{data: null}>> => {
    return window.axios.delete(route('chats.destroy', message.id))
}

export const deleteFileInChat = (message: ChatMessage, attachment: Attachment): Promise<AxiosResponse<{data: null}>> => {
    return window.axios.delete(route('chats.delete_file', [message.id, attachment.file_name]))
}

export const fetchMedia = (user: ChatProfile): Promise<AxiosResponse<{data: Attachment[]}>> => {
    return window.axios.get(route('chats.media', user.id))
}
export const fetchFiles = (user: ChatProfile): Promise<AxiosResponse<{data: Attachment[]}>> => {
    return window.axios.get(route('chats.files', user.id))
}
export const fetchLinks = (user: ChatProfile): Promise<AxiosResponse<{data: Link[]}>> => {
    return window.axios.get(route('chats.links', user.id))
}