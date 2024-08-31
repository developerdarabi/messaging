
export default function SearchedUsers({ users,onClickUser }: any) {
    if (!users) return <div className="text-sm font-medium h-full w-full flex justify-center items-center">Search some users</div>
    if (users.length===0) return <div className="text-sm font-medium h-full w-full flex justify-center items-center">No user found</div>

    return users.map((user:any)=>(
        <div className="w-full p-4 rounded-xl bg-gray-100 my-4 cursor-pointer hover:bg-gray-200" onClick={()=>onClickUser(user)}>
            <span className="text-sm font-medium">{user.name}</span>
        </div>
    ))
}
