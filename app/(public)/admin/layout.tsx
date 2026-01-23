export default function AuthAdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 lg:items-start lg:relative">
            <section className="
                w-full 
                sm:max-w-sm
                md:max-w-md
                -mt-20
                lg:mt-0
                lg:absolute
                lg:top-53
                
                "
            >
                {children}
            </section>
        </div>
    )
}
