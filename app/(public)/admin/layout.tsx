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
                -mt-40
                sm:-mt-20
                lg:top-35
                lg:mt-0
                xl:top-53
                
                "
        >
            {children}
        </section>
    )
}
