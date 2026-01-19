"use client"

import Link from "next/link";
import { usePathname } from "next/navigation"
import { Logo } from "./Logo";
import { useAuthStore } from "../shared/stores/auth.store";


interface MenuItem {
  label: string
  href: string,
  role?: string
}

const menuItems: MenuItem[] = [
  { label: "Agendamentos", href: "/agendamentos" },
  { label: "Clientes", href: "/clientes", role: "admin" },
  { label: "Logs", href: "/logs" },
  { label: "Minha Conta", href: "/minha_conta", role: "client" },
]

export default function Menu() {
  const pathname = usePathname()
  const role = useAuthStore((state) => state.user?.role)

  return (
    <aside className="w-64 bg-[#F6F4F1] flex flex-col border-r border-[#D7D7D7]">
      <div className="border-b p-5 border-[#D7D7D7]">
        <Logo />
      </div>
      <nav className="flex flex-col gap-3 p-4">
        {menuItems.map((item) => {
          const isActive = pathname.startsWith(item.href)

          return (
            !item.role || item.role === role ? (
              <Link
                href={item.href}
                key={item.href}
                className={`block px-4 py-2 rounded-md font-medium hover:bg-gray-700 transition-colors
                  ${isActive ? "bg-black text-white" : "text-gray-700"}`}
              >
                {item.label}
              </Link>
            ) : null

          )
        })}

      </nav>

      <div className="mt-auto mx-0 text-gray-500 text-sm border-t border-[#D7D7D7] p-4">
        Mateus Barbosa <br />
        Admin
      </div>
    </aside>
  );
}
