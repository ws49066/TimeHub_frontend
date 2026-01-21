import { Logo } from "../../shared/components/Logo"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <header className="absolute flex w-full border-b border-[#D7D7D7] justify-between px-24 py-5">
        <Logo />
        <button
          className=" bg-black text-white rounded font-semibold w-48 h-10 text-sm md:h-11 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#D5D5D5]"
        >
          Cadastre-se
        </button>

      </header>
      <main className="min-h-screen flex items-center justify-center">
        <section className="
        w-full 
        h-full 
        p-4
        -mt-20
        sm:max-w-sm
        md:max-w-md
        "
        >
          {children}
        </section>
      </main>
    </>
  )
}
