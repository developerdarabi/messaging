import { PiUserCircleLight } from "react-icons/pi"

export default function UserProfileRow({ user,className='',onClickUser =()=>{}}) {

    return (
        <div className={`flex items-center justify-start gap-2 cursor-pointer ${className}`} onClick={()=>onClickUser(user)}>
            <PiUserCircleLight size={60} className="opacity-60"/>
            <div className="flex flex-col gap-1 justify-start">
                <h1 className="text-xl font-medium">{user?.username}</h1>
                <span className="text-sm font-light">example@gmail.com</span>
            </div>
        </div>
    )
}
