import { deleteFileInChat } from "@/Api/chat-messages";
import { useChatMessageContext } from "@/Contexts/chat-message-context";
import { Attachment, ChatMessage } from "@/types/chat-message";
import { BsX } from "react-icons/bs";

type DeleteSelectedFileInChatProps = {
    message: ChatMessage;
    attachment: Attachment;
};

export default function DeleteSelectedFileInChat({
    message,
    attachment,
}: DeleteSelectedFileInChatProps) {
    const { messages, setMessages, reloadMedia, user } = useChatMessageContext();

    const DeleteSelectedFile = () => {
        deleteFileInChat(message, attachment).then(() => {
            const updatedAttachments = message.attachments.filter(
                (a) => a.file_name !== attachment.file_name,
            );

            setMessages(
                messages.map((m) => {
                    if (m.id === message.id) {
                        m.attachments = updatedAttachments;
                    }

                    return m;
                }),
            );

            reloadMedia(user)
        });
    };

    return (
        <button
            onClick={DeleteSelectedFile}
            className="absolute right-1 top-1 z-10 hidden h-4 w-4 items-center justify-center rounded-full bg-danger text-white group-hover/attachment:flex"
        >
            <BsX />
        </button>
    );
}
