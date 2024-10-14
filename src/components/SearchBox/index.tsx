import { IoCloseOutline } from "react-icons/io5";
import SyncSearch from "../SyncSearch";
import SearchedUsers from "../SearchedUsers";
import { useState } from "react";
import { useSelectedChat } from "../../provider/SelectedChat";
import { useFetch } from "../../utils/api";
import { UserType } from "../../types";
//@ts-ignore
export default function SearchBox({ isSearchedFocus, setIsSearchFocus }) {
    const [users, setUsers] = useState(null)
    const [query, setQuery] = useState('')


    const { selectChat } = useSelectedChat()

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
    const selectChatHandler=(user:UserType)=>{
        selectChat(user)
        setIsSearchFocus(false)
    }
    return (
        <div className={`absolute top-0 left-0 w-full rounded-xl h-full bg-white p-3 overflow-hidden flex items-center justify-start flex-col ${isSearchedFocus ? 'opacity-100 h-full block' : 'hidden opacity-0 h-0'}`}>
            <SyncSearch
            //@ts-ignore
                onFocus={() => setIsSearchFocus(true)}
                value={query}
                onChange={onChangeQuery}
                onSearch={onSearch}
                className=' w-full p-2 rounded-full border mb-2 focus:outline-none bg-[#F6F8FA]'
                placeholder='Enter users'
            />
            <div className={` w-[94%] bg-[#F6F8FA] h-full p-2 rounded-xl transition-all duration-100 delay-100 ease-in-out `}>
                <IoCloseOutline size={25} className="cursor-pointer" onClick={onCloseSearchBox} />
                <SearchedUsers users={users} onClickUser={selectChatHandler} />
            </div>
        </div>
    )
}
