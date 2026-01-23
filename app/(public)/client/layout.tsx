"use client"

import { Logo } from "../../../shared/components/Logo"
import { usePathname } from "next/navigation"
import { useRouter } from 'next/navigation'

export default function AuthClientLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const pathname = usePathname()

  const isRegister = pathname === "/client/register"

  const router = useRouter()

  const handleClick = () => {
    if (isRegister) {
      router.push('/client/login')
    }else{
      router.push("/client/register")
    }

  }


  return (
    <>
      <header className="absolute flex w-full border-b border-[#D7D7D7] justify-between py-5 px-25 gap-10">
        <div className="flex w-full justify-between">

          <Logo width={43.7} height={43.7} />
          <button
            onClick={() => handleClick()}
            className=" bg-black text-white rounded-[5px] font-medium text-[16px] h-11 py-2.25 px-7.5"
          >
            {isRegister ? "Login" : "Cadastre-se"}
          </button>
        </div>

      </header>
      <section className="
                w-full 
                sm:max-w-sm
                md:max-w-md
                absolute
                top-59.25
                left-124
                gap-6.25
                "
      >

        {children}
      </section>
    </>
  )
}
