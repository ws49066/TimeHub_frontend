export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <main className="flex items-center justify-center">
        <section className="w-full max-w-md mx-4 my-8"
        >
          {children}
        </section>
      </main>
    </>
  )
}
