import { useEffect, useRef } from "react";

export default function SyncSearch({ value, onChange, onSearch, ...props }: { value: string, onChange: (value: string) => void, onSearch: (search: string) => void, className?: string, placeholder?: string }) {

    const isMounted = useRef(false)

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true
        } else {
            const timeOutId = setTimeout(() => searchHandler(value), 500);
            return () => clearTimeout(timeOutId);
        }
    }, [value]);

    const searchHandler = (searchedWord: string) => {
        if (searchedWord.trim() !== '') {
            onSearch(searchedWord);
        }
    }

    return (
        <input
            type="search"
            value={value}
            onChange={e => onChange(e.target.value)}
            {...props}
        />
    )
}
