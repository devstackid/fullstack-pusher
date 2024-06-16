import { exitGroup } from "@/Api/groups";
import { useChatContext } from "@/Contexts/chat-context";
import { useModalContext } from "@/Contexts/modal-context";
import { Chat } from "@/types/chat";
import { Fragment } from "react";
import Modal from "./Modal";

export default function ExitGroupConfirmation() {
  const { closeModal, data: chat } = useModalContext<Chat>();
  const { chats, setChats } = useChatContext();

  const handleExitContact = () => {
    exitGroup(chat!).then(() => {
      setChats(chats.filter((c) => c.id !== chat?.id));
      closeModal();
    });
  };

  return (
    <Modal>
      <Modal.Header
        title={`Exit "${chat?.name}" group?`}
        onClose={closeModal}
      />
      <Modal.Body as={Fragment}>
        <p>
            Grup ini akan dihapus untuk saya. Anda tidak dapat melihat pesan apapun setelah keluar dari grup ini.
        </p>
      </Modal.Body>

      <Modal.Footer className="flex justify-between gap-4">
        <button className="btn btn-secondary flex-1" onClick={closeModal}>
          Cancel
        </button>
        <button className="btn btn-danger flex-1" onClick={handleExitContact}>
          Exit group
        </button>
      </Modal.Footer>
    </Modal>
  );
}