import { UserType } from '../../types'
import { idGenerator } from '../../utils'
import Container from '../ui/Container'

export default function Login({ changeUser }:{changeUser:(user:UserType)=>void}) {
    const handleLoginUser=()=>{
        changeUser({id:idGenerator()})   
    }
    return (
        <Container>
            <h1 className="text-2xl font-bold">Login</h1>
            <button onClick={handleLoginUser} className='bg-indigo-400 rounded-xl w-full p-4 text-white'>Login</button>
        </Container>
    )
}
