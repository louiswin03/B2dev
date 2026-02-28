"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/Button";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";
import { Logo } from "./Logo";

const ThemeToggle = dynamic(() => import("./ThemeToggle").then(mod => ({ default: mod.ThemeToggle })), {
  ssr: false,
  loading: () => <div className="p-2 rounded-lg bg-muted border border-border w-[41px] h-[41px]" />
});

const navLinks = [
  { name: "Accueil", href: "/" },
  { name: "À Propos", href: "/apropos" },
  { name: "Notre travail", href: "/realisations" },
  { name: "Services", href: "/services" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const mobileMenu = mounted && isOpen ? createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] md:hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-black/60"
          onClick={() => setIsOpen(false)}
        />
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="absolute inset-0 bg-background"
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <span className="text-2xl font-bold">Menu</span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                aria-label="Fermer le menu"
              >
                <X className="w-6 h-6 text-muted-foreground" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto py-6">
              <div className="space-y-2 px-4">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <div key={link.name}>
                      <Link
                        href={link.href}
                        className={cn(
                          "block px-4 py-3 rounded-lg text-lg font-medium transition-colors",
                          isActive
                            ? "bg-teal-800 text-white"
                            : "text-foreground/70 active:bg-muted"
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.name}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </nav>
            <div className="p-6 border-t border-border">
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                <Button className="w-full justify-center">
                  Nous Contacter
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  ) : null;

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background backdrop-blur-xl shadow-sm border-b border-border"
          : "bg-background/80 backdrop-blur-xl border-b border-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center group">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="h-12 w-auto text-foreground transition-all duration-300"
            >
              <Logo className="h-12 w-auto" />
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-teal-800 dark:hover:text-teal-400"
                  )}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-muted rounded-lg" />
                  )}
                  <span className="relative z-10">{link.name}</span>
                  {!isActive && (
                    <span className="absolute inset-0 rounded-lg bg-muted opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/contact" className="hidden md:block">
              <Button variant="primary" size="sm" className="font-medium">
                Contactez-nous
              </Button>
            </Link>
            <button
              type="button"
              className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors relative z-50 rounded-lg hover:bg-muted"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      {mobileMenu}
    </nav>
  );
}
