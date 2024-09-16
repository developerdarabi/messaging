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

export const useFetch = (): [(props: fetchProps) => Promise<void>, { isLoading: LoadingType, isError: errorType }] => {
    const [isLoading, setIsLoading] = useState<LoadingType>(false)
    const [isError, setIsError] = useState<errorType>(false)

    const coockies = new Cookies()

    const fetchHandler = async (props: fetchProps) => {
        const { url, method = 'POST', headers = {}, body = {}, loadingFor = { for: 'fetch' }, error = { for: 'fetch' }, onError = () => { }, onSuccess = () => { } } = props

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
                body: JSON.stringify(body),
            });
            onSuccess(await response.json())
        } catch (errorMsg) {
            //@ts-ignore
            setIsError({ ...error, stack: errorMsg })
            onError(errorMsg)
        }
        finally {
            setIsLoading(false)
        }
    }
    return [fetchHandler, { isLoading, isError }]
}