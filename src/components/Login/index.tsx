import { FormEvent, useState } from 'react';
import sideBg from '../../assets/login/side_background.jpg';
import sideImg from '../../assets/login/side_image.png';
import { useAuth } from '../../provider/Auth';
import AppLogo from '../AppLogo';
import Container from '../ui/Container';
import LoadingButton from '../Useable/LoadingButton';

export default function Login() {

    const { login, isLoading } = useAuth()

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleLoginUser = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        login(username, password)

    }

    return (
        <Container component="form" onSubmit={handleLoginUser} className="!grid grid-cols-2 !p-0 overflow-hidden w-full laptop:w-[80vw]">
            <div className='flex flex-col gap-0  col-span-2 tablet:col-span-1'>
                <AppLogo className="flex items-center justify-center p-2 tablet:pt-10" />
                <div className='flex items-center flex-col tablet:h-full justify-center p-4 laptop:px-28 px-8 gap-4'>
                    <h1 className="tablet:text-4xl text-2xl font-bold">Welcome</h1>
                    <h6 className="tablet:text-md text-sm font-medium opacity-60">Welcome Please enter your details</h6>
                    <input value={username} onChange={e => setUsername(e.target.value)} className='w-full p-4 rounded-xl border focus:outline-none' placeholder='Username' />
                    <input value={password} onChange={e => setPassword(e.target.value)} className='w-full p-4 rounded-xl border focus:outline-none' placeholder='Password' />
                    <LoadingButton loading={isLoading}>Continue</LoadingButton>
                </div>
                <div className='flex items-center justify-center p-8'>
                    <p className='text-sm font-medium opacity-50 text-black text-center '>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>
            </div>
            <div className='relative items-center p-14 justify-center hidden tablet:flex'>
                <img src={sideBg} className='absolute left-0 top-0 w-full h-full' />
                <img src={sideImg} className='z-[101] drop-shadow-2xl' />
            </div>
        </Container>
    )
}
