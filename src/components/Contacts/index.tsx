import { useState } from "react";
import { useSelectedChat } from "../../provider/SelectedChat";
import { useFetch } from "../../utils/api";
import SearchedUsers from "../SearchedUsers";
import SyncSearch from "../SyncSearch";

export default function Contacts() {
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

    return (
        <div className="rounded-xl h-full w-[400px] bg-white p-3 flex items-center justify-start flex-col">
            <SyncSearch value={query} onChange={query => setQuery(query)} onSearch={onSearch} className=' w-full p-4 rounded-xl border focus:outline-none' placeholder='Enter message' />
            <SearchedUsers users={users} onClickUser={selectChat} />
        </div>
    )
}
