"use client"

import Link from "next/link";
import { usePathname } from "next/navigation"
import { Logo } from "../Logo";
import { useAuthStore } from "../../stores/auth.store";
import { AgendaIcon } from "../icons/AgendaIcon";
import { ClientsIcon } from "../icons/ClientsIcon";
import { AccountIcon } from "../icons/AccountIcon";
import { LogsIcons } from "../icons/LogsIcon";
import * as Accordion from "@radix-ui/react-accordion"
import { ChevronDown } from 'lucide-react';

interface MenuItem {
  label: string
  href: string,
  role?: string,
  icon: string
}


const menuItems: MenuItem[] = [
  { label: "Schedulings", href: "/agendamentos", icon: "agenda" },
  { label: "Clients", href: "/clientes", role: "admin", icon: "clients" },
  { label: "Logs", href: "/logs", icon: "logs" },
  { label: "My Account", href: "/account", role: "client", icon: "account" },
]

const IconsGenerate = (icon, active) => {
  if (icon === "agenda") {
    return (
      <AgendaIcon width={20} height={20} active={active} />
    )
  }
  if (icon === "clients") {
    return (
      <ClientsIcon width={20} height={20} active={active} />
    )
  }
  if (icon === "logs") {
    return (
      <LogsIcons width={20} height={20} active={active} />
    )
  }
  if (icon === "account") {
    return (
      <AccountIcon width={20} height={20} active={active} />
    )
  }
}



export default function Menu() {
  const pathname = usePathname()
  const role = useAuthStore((state) => state.user?.role)
  const nome = useAuthStore((state) => state.user?.nome)
  const sobrenome = useAuthStore((state) => state.user?.sobrenome)
  const { logout } = useAuthStore()
  const view_logs = useAuthStore((state) => state.user?.permissions.view_logs)

  function handlerLogout() {
    logout()
  }

  return (
   
    <div className="h-full w-64 bg-[#F6F4F1] flex flex-col border-r border-[#D7D7D7]">
      <div className="hidden lg:flex border-b px-4 py-3.5 border-[#D7D7D7]">
        <Logo width={51.7} height={51.7} />
      </div>
      <nav className="flex-1 flex flex-col gap-3 p-4">
        {menuItems.map((item) => {
          const isActive = pathname.startsWith(item.href)

          const isViewLogs = item.href === "/logs" && !view_logs && role !== "admin"

          return (
            !isViewLogs && (!item.role || item.role === role) ? (

              <Link
                href={item.href}
                key={item.href}
                className={`p-3 rounded-[5px] hover:bg-gray-500 transition-colors
                  ${isActive ? "bg-black text-white" : "text-black"}`}
              >
                <div className="flex gap-3.75 font-medium text-sm items-center">

                  {IconsGenerate(item.icon, isActive)}
                  {item.label}
                </div>

              </Link>
            ) : null

          )
        })}

      </nav>

      <Accordion.Root type="single" collapsible className=" text-gray-500 text-sm border-t border-[#D7D7D7] p-4">
        <Accordion.Item
          value="profile"
          className=""
        >

          <Accordion.Header>
            <Accordion.Trigger
              className="
              flex w-full items-center justify-between px-2 py-1
              text-left
            "
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium text-zinc-900">
                  {`${nome} ${sobrenome}`}
                </span>
                <span className="text-xs text-zinc-500">
                  {role === "client" ? "Client" : "Admin"}
                </span>
              </div>


              <ChevronDown />
            </Accordion.Trigger>
          </Accordion.Header>


          <Accordion.Content
            className="
            overflow-hidden
            data-[state=open]:animate-accordion-down
            data-[state=closed]:animate-accordion-up
          "
          >
            <div className="px-4 py-3">
              <button
                className="
               w-full
    bg-black
    text-white
    py-2.5
    rounded-[5px]
    font-semibold
    text-[16px]
    h-11
    disabled:opacity-50
    disabled:cursor-not-allowed
    disabled:bg-[#D5D5D5]
              "
                onClick={() => handlerLogout()}
              >
                Logout
              </button>
            </div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </div>


  );
}
export { Menu };