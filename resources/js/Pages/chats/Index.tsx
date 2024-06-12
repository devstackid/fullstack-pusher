import ContentEmpty from '@/Components/Chats/ContentEmpty'
import Sidebar from '@/Components/Chats/Sidebar'
import { ModalProvider } from '@/Contexts/modal-context'
import AppLayout from '@/Layouts/AppLayout'
import SidebarMini from '@/Layouts/Partials/SidebarMini'

export default function Index() {
  return <AppLayout title="Chats" >
    <ModalProvider>
      <SidebarMini />
      <Sidebar />
      <ContentEmpty />
    </ModalProvider>
  </AppLayout>
}
