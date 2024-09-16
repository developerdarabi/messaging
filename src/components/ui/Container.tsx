
export default function Container({ component: Component = 'section', children,className,...props }: any): React.ReactNode {
    return (
        <Component className={`bg-white h-full rounded-xl flex flex-col gap-4 p-4 w-2/3 ${className}`} {...props}>
            {children}
        </Component>
    )
}
