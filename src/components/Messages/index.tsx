import { MessageType } from "../../types"
import { getCurrentDateTime } from "../../utils"

export default function Messages({ messages, getIsUserWriteMessage }: { messages: null | MessageType[], getIsUserWriteMessage: (authorId:string)=>boolean }) {
    if (!messages) return <div className="text-center text-md font-medium">No messages yet</div>

    return messages.map((message: MessageType, index) => (
        <div key={index}
            className={`
                rounded p-4  w-2/3  break-words text-justify text-sm
                ${getIsUserWriteMessage(message.author) ?
                    'bg-gray-50 me-auto rounded-se-2xl rounded-ss-2xl rounded-ee-2xl'
                    :
                    '  bg-slate-100 ms-auto rounded-es-2xl rounded-se-2xl rounded-ss-2xl'}
                `}
        >
            <h1>{message.text}</h1>
            <span className="text-xs w-fit ms-auto block mt-2">{getCurrentDateTime(message.createdAt)}</span >
        </div>
    ))
}
