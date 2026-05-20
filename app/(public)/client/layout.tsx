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
    } else {
      router.push("/client/register")
    }

  }


  return (
    <div className="min-h-screen flex flex-col items-center px-2 sm:px-4">
      <header className="w-full border-b border-[#D7D7D7] justify-between py-5 sm:px-25">
        <div className="flex w-full justify-between">

          <Logo width={43.7} height={43.7} />
          <button
            onClick={() => handleClick()}
            className=" bg-black text-white rounded-[5px] font-medium text-sm py-2 px-3 sm:text-[16px] sm:py-2.25 sm:px-7.5"
          >
            {isRegister ? "Login" : "Sign Up"}
          </button>
        </div>

      </header>




      <section className="
                w-full 
                sm:max-w-sm
                md:max-w-md
                mt-40
                md:mt-40
                lg:mt-0
                lg:absolute
                lg:top-59.25
                "
      >

        {children}
      </section>



    </div>
  )
}
