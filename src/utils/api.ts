import { useState } from "react";
import Cookies from "universal-cookie";

interface fetchProps {
    url: string,
    method?: 'POST' | 'GET' | 'PUT' | 'DELETE',
    headers?: Record<string, string>,
    body?: any,
    loadingFor?: LoadingType
    error?: errorType
    onSuccess?: (data: any) => void
    onError?: (data: any) => void
}

type LoadingType = false | { for: string }
type errorType = false | { for: string, stack: any }

export const useFetch = (): [(props: fetchProps) => Promise<void>, { isLoading: LoadingType, isError: errorType, data: any }] => {
    const [isLoading, setIsLoading] = useState<LoadingType>(false)
    const [isError, setIsError] = useState<errorType>(false)
    const [data, setData] = useState(null)

    const coockies = new Cookies()

    const fetchHandler = async (props: fetchProps) => {
        const { url, method = 'POST', headers = {}, body = null, loadingFor = { for: 'fetch' }, error = { for: 'fetch' }, onError = () => { }, onSuccess = () => { } } = props

        let additionalHeaders = {}

        const token = coockies.get('token')

        if (token) {
            //@ts-ignore
            additionalHeaders.Authorization = 'Bearer ' + token
        }

        try {
            setIsError(false)
            setIsLoading(loadingFor)
            const response = await fetch('http://localhost:8080/' + url, {
                method: method,
                headers: {
                    ...headers,
                    ...additionalHeaders,
                    'Content-Type': 'application/json',
                },
                ...(body ? { body: JSON.stringify(body) } : {})
            });
            if (response.ok) {
                const data = await response.json()
                onSuccess(data)
                setData(data)
                return data
            } else {
                //@ts-ignore
                setIsError({ ...error, stack: 'errorMsg' })
                onError(response)
            }
        } catch (errorMsg) {
            //@ts-ignore
            setIsError({ ...error, stack: errorMsg })
            onError(errorMsg)
        }
        finally {
            setIsLoading(false)
        }
    }
    return [fetchHandler, { isLoading, isError, data }]
}