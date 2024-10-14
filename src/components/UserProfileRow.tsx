import { PiUserCircleLight } from "react-icons/pi"
//@ts-ignore
export default function UserProfileRow({ user,className='',onClickUser =()=>{}}) {

    return (
        //@ts-ignore
        <div className={`flex items-center w-full justify-start gap-2 cursor-pointer ${className}`} onClick={()=>onClickUser(user)}>
            <PiUserCircleLight size={60} className="opacity-60"/>
            <div className="flex flex-col gap-1 justify-start">
                <h1 className="text-xl font-medium">{user?.username}</h1>
                <span className="text-sm font-light">example@gmail.com</span>
            </div>
        </div>
    )
}
