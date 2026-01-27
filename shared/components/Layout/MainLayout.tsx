"use client";
import { ReactNode, useState } from "react";
import { Menu } from "../Menu/Menu";
import { Header } from "../Header";
import { MobileSidebar } from "../Menu/MobileMenu";
import { MenuIcon } from "lucide-react";

type MainLayoutProps = {
  children: ReactNode;
  title: string;
  description: string;
};

export function MainLayout({ children, title, description }: MainLayoutProps) {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex min-h-screen w-full bg-white overflow-x-hidden">
      {/* Desktop */}
      <aside className="hidden lg:flex">
        <Menu />
      </aside>

      {/* Mobile Sidebar */}
      <MobileSidebar open={open} onClose={() => setOpen(false)} />

      <div className="flex-1 flex flex-col">
        {/* Header Mobile */}
        <header className="lg:hidden w-full flex items-center gap-3 px-4 py-3 border-b bg-white">
          <button onClick={() => setOpen(true)}>
            <MenuIcon />
          </button>
          <span className="font-semibold">{title}</span>
        </header>

        {/* Header Desktop */}
        <div className="hidden lg:block">
          <Header title={title} description={description} />
        </div>

        <main className="flex-1 bg-white p-4 md:p-6 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
