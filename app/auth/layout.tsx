export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <section className="
        w-full 
        -mt-20 
        p-4
        sm:max-w-sm
        md:max-w-md
        lg:max-w-lg
        "
      >
        {children}
      </section>
    </main>
  )
}
