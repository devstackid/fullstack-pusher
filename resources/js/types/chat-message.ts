import { CHAT_TYPE } from "./chat"
import { Paginate } from "./paginate";
import { User } from "./user"

type ChatToUser = User & {
    chat_type: CHAT_TYPE,
    message_color: string;
    is_contact_blocked: boolean;
    is_contact_saved: boolean;
}

type ChatToGroup = {
    description: string;
    creator_id: string;
    creator: Pick<User, "id" | "name">,
    members_count: number;
    
}

export type ChatProfile = ChatToUser & ChatToGroup;

export type ChatMessage = {
    id: string;
    from_id: string;
    to_id: string;
    chat_type: CHAT_TYPE,
    body: string;
    attachments: Attachment[],
    links: Link[],
    sort_id: number;
    created_at: string;
    updated_at: string;
    from: User;
    to: ChatProfile;
}

export type Attachment = {
    original_name: string;
    file_name: string;
    file_path: string;
    file_size: number;
    created_at: string;
    sent_by: Pick<User, "id" | "name" | "avatar">
}

export type Link = string;

export type ChatMessagePaginate = Paginate<ChatMessage[]>