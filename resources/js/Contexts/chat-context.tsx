import { fetchChats } from "@/Api/chats";
import { ChatPageProps } from "@/types";
import { Chat, ChatPaginate } from "@/types/chat";
import { ChatProfile } from "@/types/chat-message";
import { InitialPaginate } from "@/types/paginate";
import { usePage } from "@inertiajs/react";
import {
    useContext,
    createContext,
    PropsWithChildren,
    useReducer,
    useEffect,
    useState,
} from "react";

type State = {
    chats: Chat[];
    paginate: ChatPaginate;
    setChats: (value: Chat[]) => void;
    setPaginate: (value: ChatPaginate) => void;
    refetchChats: () => void;
};

type Action =
    | {
          type: "SET_CHATS";
          payload: Chat[];
      }
    | {
          type: "SET_PAGINATE";
          payload: ChatPaginate;
      };

const initialState: State = {
    chats: [],
    paginate: InitialPaginate,
    setChats: () => {},
    setPaginate: () => {},
    refetchChats: () => {},
};

const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case "SET_CHATS":
            return {
                ...state,
                chats: action.payload,
            };

        case "SET_PAGINATE":
            return {
                ...state,
                paginate: action.payload,
            };
    }
};

const ChatContext = createContext(initialState);

export const useChatContext = () => useContext(ChatContext);

export const ChatProvider = ({ children }: PropsWithChildren) => {
    const props = usePage<ChatPageProps>().props;
    const [state, dispatch] = useReducer(reducer, initialState);
    const [isFirstLoading, setIsFirstLoading] = useState(true);

    const setChats = (value: Chat[]) =>
        dispatch({ type: "SET_CHATS", payload: value });

    const setPaginate = (value: ChatPaginate) =>
        dispatch({ type: "SET_PAGINATE", payload: value });

    const refetchChats = async () => {
        return fetchChats().then((response) =>
            setChats(response.data.data.data),
        );
    };

    useEffect(() => {
        setIsFirstLoading(false);
        setChats(props.chats.data);
        setPaginate(props.chats);
        
        window.Echo.channel(`user-activity`).listen(
            ".user-activity",
            (data: {user: ChatProfile}) => {
                const chats = state.chats.length > 0 ? state.chats : props.chats.data
                const existingChat = chats.find((chat) => chat.id === data.user.id)

                existingChat && refetchChats();
            },
          );

        window.Echo.channel(`send-message-${props.auth.id}`).listen(
            ".send-message",
            refetchChats,
          );
    }, []);

    const value = {
        ...state,
        chats: isFirstLoading ? props.chats.data : state.chats,
        paginate: isFirstLoading ? props.chats : state.paginate,
        setChats,
        setPaginate,
        refetchChats,
    };

    return (
        <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
    );
};
