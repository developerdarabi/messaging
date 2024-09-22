import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useAuth } from "../../provider/Auth";
import { useContacts } from "../../provider/contacts";
import { useSelectedChat } from "../../provider/SelectedChat";
import { UserType } from "../../types";
import { useFetch } from "../../utils/api";
import SearchedUsers from "../SearchedUsers";
import SyncSearch from "../SyncSearch";
import UserProfileRow from "../UserProfileRow";

export default function Contacts() {
    const [users, setUsers] = useState(null)
    const [query, setQuery] = useState('')
    const [isSearchedFocus, setIsSearchFocus] = useState(false)

    const { contacts } = useContacts()

    const { selectChat } = useSelectedChat()
    const { user } = useAuth()
    console.log('iiiiiiiiiiiiiiiiiiiiiiiii');
    console.log(user);
    console.log('iiiiiiiiiiiiiiiiiiiiiiiii');

    const [fetch] = useFetch()

    const onSearch = async (searchedWord: string) => {
        await fetch({
            url: 'users/search',
            body: {
                username: searchedWord
            },
            onSuccess: (response) => {
                setUsers(response.users)
            }
        })
    }

    const onChangeQuery = (query: string) => {
        setQuery(query)
    }
    const onCloseSearchBox = () => {
        setIsSearchFocus(false)
        setQuery('')
        setUsers(null)
    }

    return (
        <div className="relative rounded-xl h-full w-[400px] bg-white p-3 overflow-hidden flex items-center justify-start flex-col">
            <SyncSearch
                onFocus={() => setIsSearchFocus(true)}
                value={query}
                onChange={onChangeQuery}
                onSearch={onSearch}
                className=' w-full p-2 rounded-full border mb-2 focus:outline-none bg-[#F6F8FA]'
                placeholder='Enter users'
            />
            <div className={`absolute left-[14px] z-[100] top-[62px] w-[94%] bg-[#F6F8FA] h-full p-2 rounded-xl transition-all duration-100 delay-100 ease-in-out ${isSearchedFocus ? 'opacity-100 h-full' : 'opacity-0 h-0'}`}>
                <IoCloseOutline size={25} className="cursor-pointer" onClick={onCloseSearchBox} />
                <SearchedUsers users={users} onClickUser={selectChat} />
            </div>
            <div className="w-full flex flex-col gap-3">
                {contacts.map((user: UserType) => (
                    <UserProfileRow key={user._id} onClickUser={selectChat} user={user} className="hover:bg-[#F6F8FA]  transition-all delay-75 duration-75 ease-in-out"/>
                ))}
            </div>
        </div>
    )
}
