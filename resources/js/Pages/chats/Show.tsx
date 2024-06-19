import Content from '@/Components/Chats/Content'
import PopupGallery from '@/Components/Chats/PopupGallery'
import Sidebar from '@/Components/Chats/Sidebar'
import SidebarRight from '@/Components/Chats/SidebarRight'
import { ChatProvider } from '@/Contexts/chat-context'
import { ChatMessageProvider } from '@/Contexts/chat-message-context'
import { ModalProvider } from '@/Contexts/modal-context'
import AppLayout from '@/Layouts/AppLayout'
import SidebarMini from '@/Layouts/Partials/SidebarMini'

export default function Show() {
    return <AppLayout title="Chats" >
        <ChatProvider >
            <ChatMessageProvider>
                <ModalProvider>
                    <SidebarMini />
                    <Sidebar />
                    <Content />
                    <SidebarRight />

                    <PopupGallery />
                </ModalProvider>
            </ChatMessageProvider>
        </ChatProvider>
    </AppLayout>
}
