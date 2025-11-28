"use client";

import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/transactions", label: "Transações" },
  { href: "/subscription", label: "Assinatura" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full border-b bg-background px-4 py-3 sm:px-8">
      {/* Barra que ocupa 100% da largura */}
      <div className="flex w-full items-center justify-between">
        {/* ESQUERDA: logo + links */}
        <div className="flex items-center gap-6">
          <Link href="/" className="inline-flex items-center">
            <span className="sr-only">Finance AI</span>
            <Image
              src="/logo.svg"
              width={173}
              height={39}
              alt="Finance AI"
              className="h-8 w-auto sm:h-9"
              priority
            />
          </Link>

          {/* Links: escondidos em mobile, visíveis em md+ */}
          <div className="hidden items-center gap-6 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={
                  pathname === link.href
                    ? "font-bold text-primary"
                    : "text-muted-foreground transition-colors hover:text-primary"
                }
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* DIREITA: perfil + menu toggle (menu toggle visível apenas em <md) */}
        <div className="flex items-center gap-3">
          {/* Profile (mostra nome em md+, só avatar em mobile) */}
          <div className="hidden md:block">
            <UserButton showName />
          </div>
          <div className="md:hidden">
            <UserButton />
          </div>

          {/* Mobile menu toggle: aparece apenas em mobile (<md) */}
          <button
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded p-2 transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring md:hidden"
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden />
            ) : (
              <Menu className="h-5 w-5" aria-hidden />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown: alinhado à direita sob o botão */}
      <div
        aria-hidden={!open}
        className={`transition-max-h mt-2 overflow-hidden px-4 duration-200 md:hidden ${open ? "max-h-80" : "max-h-0"}`}
      >
        <div className="flex justify-end">
          <div className="w-56 rounded-md border bg-popover p-2 shadow-md">
            <nav className="flex flex-col gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={
                    "block rounded px-3 py-2 text-sm " +
                    (pathname === link.href
                      ? "font-bold text-primary"
                      : "text-muted-foreground hover:text-primary")
                  }
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
