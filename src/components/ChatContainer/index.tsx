import { useAuth } from "../../provider/Auth";
import { useSelectedChat } from "../../provider/SelectedChat";
import ChatBox from "../Chatbox";
import Contacts from "../Contacts";
import UserProfileRow from "../UserProfileRow";

export default function ChatContainer() {
    const { user } = useAuth()

    return (
        <main className='h-screen p-6 flex items-center justify-center flex-row gap-4 w-full'>
            <div className="h-full flex flex-col gap-3">
                <UserProfileRow user={user} />
                <Contacts />
            </div>
            <ChatBox />
        </main>
    )
}
