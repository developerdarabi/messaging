import { useState } from "react";
import Cookies from "universal-cookie";

interface fetchProps {
    url: string,
    method?: 'POST' | 'GET' | 'PUT' | 'DELETE',
    headers?: Record<string, string>,
    body?: any,
    loadingFor?: { for: string }
    error?: { for: string, error: any }
    onSuccess?: (data: any) => void
    onError?: (data: any) => void
}

export const useFetch = () => {
    const [isLoading, setIsLoading] = useState<false | { for: string }>(false)
    const [isError, setIsError] = useState<false | { for: string, stack: any }>(false)

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
            setIsError({ ...error, stack: errorMsg })
            onError(errorMsg)
        }
        finally {
            setIsLoading(false)
        }
    }
    return [fetchHandler, { isLoading, isError }]
}