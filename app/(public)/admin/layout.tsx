export default function AuthAdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section className="
                w-full 
                sm:max-w-sm
                md:max-w-md
                absolute
                top-53
                left-124
                gap-7.5
                "
        >
            {children}
        </section>
    )
}
