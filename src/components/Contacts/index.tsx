import { useContacts } from "../../provider/contacts";
import { useSelectedChat } from "../../provider/SelectedChat";
import { UserType } from "../../types";
import UserProfileRow from "../UserProfileRow";

export default function Contacts() {

    const { contacts } = useContacts()

    const { selectChat,chat } = useSelectedChat()
    console.log(chat);
    
    return (
        <div className={`relative w-full h-full bg-white px-1 overflow-hidden flex items-center justify-start flex-col `}>
            {contacts.map((user: UserType) => (
                //@ts-ignore
                <UserProfileRow key={user._id} onClickUser={() => selectChat(user)} user={user?.users?.[0] || user} className={`hover:bg-[#F6F8FA]  transition-all p-1 rounded-md delay-75 duration-75 ease-in-out ${chat.chat._id===user._id?'!bg-blue-100':''}`} />
            ))}
        </div>
    )
}
