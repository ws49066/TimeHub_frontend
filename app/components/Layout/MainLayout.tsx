import { ReactNode } from "react";
import Menu from "../Menu";
import Header from "../Header";

type MainLayoutProps = {
  children: ReactNode;
  title: string;
  description: string;
};

export default function MainLayout({ children, title, description }: MainLayoutProps) {
  return (
    <div className="flex h-screen bg-white">
      <Menu />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={title} description={description}/>

        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
