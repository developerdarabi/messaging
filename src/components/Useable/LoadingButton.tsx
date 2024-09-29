import CircularProgress from "./CircularProgress"

interface Props {
    children: React.ReactNode | string | number,
    loading?: boolean,
    className?: string
}

export default function LoadingButton(props: Props) {
    const { children, loading, className } = props
    return (
        <button
            type="submit"
            className={`${className} bg-blue-600 h-[55px] flex justify-center items-center rounded-xl w-full p-4 text-white`}
        >
            {loading ? <CircularProgress /> : children}
        </button>

    )
}
