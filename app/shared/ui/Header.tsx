export default function HeaderLoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 border-red-500 border-2">
      <section className="w-full max-w-sm">
        {children}
      </section>
    </main>
  )
}
