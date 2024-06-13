import ContentEmpty from '@/Components/Chats/ContentEmpty'
import Sidebar from '@/Components/Chats/Sidebar'
import { ChatProvider } from '@/Contexts/chat-context'
import { ModalProvider } from '@/Contexts/modal-context'
import AppLayout from '@/Layouts/AppLayout'
import SidebarMini from '@/Layouts/Partials/SidebarMini'

export default function Index() {
  return <AppLayout title="Chats" >
    <ChatProvider >
      <ModalProvider>
        <SidebarMini />
        <Sidebar />
        <ContentEmpty />
      </ModalProvider>
    </ChatProvider>
  </AppLayout>
}
