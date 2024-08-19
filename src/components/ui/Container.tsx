
export default function Container({ children }: { children: React.ReactNode }): React.ReactNode {
    return (
        <section className="bg-white rounded-xl flex flex-col gap-4 p-4 w-2/3">
            {children}
        </section>
    )
}
