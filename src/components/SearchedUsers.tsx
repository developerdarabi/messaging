import UserProfileRow from "./UserProfileRow"

export default function SearchedUsers({ users,onClickUser }: any) {
    if (!users) return <div className="text-sm font-medium h-full w-full flex justify-center items-center">Search some users</div>
    if (users.length===0) return <div className="text-sm font-medium h-full w-full flex justify-center items-center">No user found</div>

    return users.map((user:any)=>(
        <div className="w-full rounded-xl bg-blue-600 text-white my-4 cursor-pointer hover:bg-blue-700" onClick={()=>onClickUser(user)}>
            <UserProfileRow user={user}/>
        </div>
    ))
}
