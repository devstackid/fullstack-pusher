import { AxiosResponse } from "axios"
import { Chat, ChatPaginate } from "@/types/chat"
import { ChatProfile } from "@/types/chat-message"

export const fetchChats = (query?: string): Promise<AxiosResponse<{data: ChatPaginate}>> => {
    return window.axios.get(`${route("chats.users")}?query=${query || ""}`)
}
export const fetchChatsInPaginate = (url: string): Promise<AxiosResponse<{data: ChatPaginate}>> => {
    return window.axios.get(url)
}


export const markAsRead = (chat: Chat): Promise<AxiosResponse<{data: Chat}>> => {
    return window.axios.post(route("chats.mark_as_read", chat.id))
}

export const markAsUnread = (chat: Chat): Promise<AxiosResponse<{data: Chat}>> => {
    return window.axios.post(route("chats.mark_as_unread", chat.id))
}

export const archiveChat = (chat: Chat): Promise<AxiosResponse<{data: Chat}>> => {
    return window.axios.post(route("chats.archive", chat.id))
}

export const deleteChat = (chat: Chat): Promise<AxiosResponse<{data: Chat}>> => {
    return window.axios.delete(route("chats.destroy_all", chat.id))
}

export const customizeChat = (user: ChatProfile, message_color: string) => {
    return window.axios.post(route("chats.customize_chat", user.id), {
        message_color
    })
}