import { useState } from "react";
import SyncSearch from "../SyncSearch";
import SearchedUsers from "../SearchedUsers";
import { useSelectedChat } from "../../provider/SelectedChat";

export default function Contacts() {
    const [users, setUsers] = useState(null)
    const [query, setQuery] = useState('')

    const {selectChat} = useSelectedChat()

    const onSearch = async (searchedWord: string) => {
        try {
            const data = await fetch('http://localhost:8080/users/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: searchedWord
                }),
            });
            if (!data.ok) {
                throw new Error(data.statusText)
            }
            const response = await data.json()
            setUsers(response.users)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="rounded-xl h-full w-[400px] bg-white p-3 flex items-center justify-start flex-col">
            <SyncSearch value={query} onChange={query => setQuery(query)} onSearch={onSearch} className=' w-full p-4 rounded-xl border focus:outline-none' placeholder='Enter message' />
            <SearchedUsers users={users} onClickUser={selectChat}/>
        </div>
    )
}
