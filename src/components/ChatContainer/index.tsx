import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useAuth } from "../../provider/Auth";
import ChatBox from "../Chatbox";
import Contacts from "../Contacts";
import SearchBox from "../SearchBox";
import UserProfileRow from "../UserProfileRow";

export default function ChatContainer() {
    const { user } = useAuth()
    const [isSearchedFocus, setIsSearchFocus] = useState(false)

    return (
        <main className='h-screen p-6 flex items-center justify-center flex-row gap-4 w-full'>
            <div className="relative bg-white w-[400px] rounded-xl overflow-hidden h-full flex flex-col gap-3">
                <div className="flex flex-row bg-blue-600 text-white p-2 justify-between items-center">
                    <UserProfileRow user={user} />
                    <button onClick={() => setIsSearchFocus(true)}><BiSearch size={28} /></button>
                </div>
                <Contacts />
                <SearchBox isSearchedFocus={isSearchedFocus} setIsSearchFocus={setIsSearchFocus} />
            </div>
            <ChatBox />
        </main>
    )
}
