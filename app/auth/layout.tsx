export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <section className="w-full max-w-sm -mt-20 p-4">
        {children}
      </section>
    </main>
  )
}
