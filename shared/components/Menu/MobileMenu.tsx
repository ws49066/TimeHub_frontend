"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { X } from "lucide-react";
import Menu from "./Menu";

interface MobileSidebarProps {
    open: boolean;
    onClose: () => void;
}

export function MobileSidebar({ open, onClose }: MobileSidebarProps) {
    return (
        <Dialog.Root open={open} onOpenChange={onClose}>
            <Dialog.Portal>

                <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />


                <Dialog.Content
                    className="
            fixed left-0 top-0 h-full w-64
            bg-[#F6F4F1]
            z-50
            animate-slide-in
            shadow-lg
          "
                >

                    <VisuallyHidden>
                        <Dialog.Title>Menu de navegação</Dialog.Title>
                        <Dialog.Description>
                            Menu lateral com links de navegação
                        </Dialog.Description>
                    </VisuallyHidden>

                    <div className="flex items-center justify-between p-4 border-b border-[#D7D7D7]">
                        <span className="font-semibold">Menu</span>
                        <button onClick={onClose}>
                            <X />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        <Menu />
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
