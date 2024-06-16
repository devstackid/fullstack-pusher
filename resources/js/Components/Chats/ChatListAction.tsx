import { CHAT_TYPE, Chat } from "@/types/chat";
import Dropdown, { useDropdownContext } from "../Dropdown";
import { useContext, useRef } from "react";
import clsx from "clsx";
import {
    BsArchive,
    BsBoxArrowRight,
    BsCheck,
    BsCheck2,
    BsThreeDots,
    BsXLg,
} from "react-icons/bs";
import { useAppContext } from "@/Contexts/app-context";
import { archiveChat, markAsRead, markAsUnread } from "@/Api/chats";
import { useChatContext } from "@/Contexts/chat-context";
import { useModalContext } from "@/Contexts/modal-context";

type ActionProps = {
    chat: Chat;
};

export default function ChatListAction({ chat }: ActionProps) {
    return (
        <div className="absolute right-8 shrink-0">
            <Dropdown>
                <Action chat={chat} />
            </Dropdown>
        </div>
    );
}

const Action = ({ chat }: ActionProps) => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { open } = useDropdownContext();
    const { auth } = useAppContext();
    const { chats, setChats, refetchChats } = useChatContext();
    const { openModal } = useModalContext();

    const dropdownPosition =
        (dropdownRef.current?.getBoundingClientRect().bottom || 0) <
        window.innerHeight - 100;

    const handleMarkAsRead = () => {
        markAsRead(chat).then(() => {
            setChats(
                chats.map((c) => {
                    if (c.id === chat.id) {
                        c.is_read = true;
                    }
                    return c;
                }),
            );
        });
    };
    const handleMarkAsUnread = () => {
        markAsUnread(chat).then(() => {
            setChats(
                chats.map((c) => {
                    if (c.id === chat.id) {
                        c.is_read = false;
                    }
                    return c;
                }),
            );
        });
    };
    const handleArchiveChat = () => {
        archiveChat(chat).then(() => {
            refetchChats();
        });
    };
    const deleteChatConfirmation = () => {
        openModal({
            view: "DELETE_CHAT_CONFIRMATION",
            size: "lg",
            payload: chat,
        });
    };

    const exitGroupConfirmation = () => {
        openModal({
            view: "EXIT_GROUP_CONFIRMATION",
            size: "lg",
            payload: chat,
        });
    };

    return (
        <div ref={dropdownRef}>
            <Dropdown.Trigger>
                <button
                    type="button"
                    className={clsx(
                        "rounded-full border border-secondary bg-background p-1.5 shadow-sm group-hover:visible group-hover:flex",
                        open ? "visible" : "invisible",
                    )}
                >
                    <BsThreeDots className="text-secondary-foreground" />
                </button>
            </Dropdown.Trigger>
            <Dropdown.Content
                align={dropdownPosition ? "right" : "top-right"}
                contentClasses={dropdownPosition ? "" : "mb-7"}
            >
                {auth.id !== chat.id && auth.id !== chat.from_id && (
                    <Dropdown.Button
                        onClick={
                            chat.is_read ? handleMarkAsUnread : handleMarkAsRead
                        }
                    >
                        <div className="flex items-center gap-2 text-xs">
                            <BsCheck2 className="-ml-1" />
                            Tandai{" "}
                            {chat.is_read ? "belum dibaca" : "telah dibaca"}
                        </div>
                    </Dropdown.Button>
                )}

                <Dropdown.Button onClick={handleArchiveChat}>
                    <div className="flex items-center gap-2 text-xs">
                        <BsArchive className="-ml-1" />
                        Arsipkan chat
                    </div>
                </Dropdown.Button>
                <Dropdown.Button onClick={deleteChatConfirmation}>
                    <div className="flex items-center gap-2 text-xs">
                        <BsXLg className="-ml-1" />
                        Hapus Chat
                    </div>
                </Dropdown.Button>

                {auth.id !== chat.id &&
                    chat.chat_type === CHAT_TYPE.GROUP_CHATS && (
                        <>
                            <hr className="my-2 border-secondary" />
                            <Dropdown.Button onClick={exitGroupConfirmation}>
                                <div className="flex items-center gap-2 text-danger text-xs">
                                    <BsBoxArrowRight />
                                    Exit Group
                                </div>
                            </Dropdown.Button>
                        </>
                    )}
            </Dropdown.Content>
        </div>
    );
};
