import ChatBox from "../Chatbox";
import Contacts from "../Contacts";

export default function ChatContainer() {
    return (
        <main className='bg-slate-300 h-screen p-6 flex items-center justify-center flex-row gap-4 w-full'>
            <Contacts />
            <ChatBox />
        </main>
    )
}
