"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code2 } from "lucide-react";
import { Button } from "./ui/Button";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";

const ThemeToggle = dynamic(() => import("./ThemeToggle").then(mod => ({ default: mod.ThemeToggle })), {
  ssr: false,
  loading: () => <div className="p-2 rounded-lg bg-neutral-200/80 dark:bg-neutral-800/80 border border-neutral-300 dark:border-neutral-700 w-[41px] h-[41px]" />
});

const navLinks = [
  { name: "Accueil", href: "/" },
  { name: "À Propos", href: "/apropos" },
  { name: "Réalisations", href: "/realisations" },
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

  // Block scroll when mobile menu is open
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
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-black/60"
          onClick={() => setIsOpen(false)}
        />

        {/* Menu */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="absolute inset-0 bg-white dark:bg-neutral-900"
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-800">
              <span className="text-2xl font-bold text-neutral-900 dark:text-white">Menu</span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                aria-label="Fermer le menu"
              >
                <X className="w-6 h-6 text-neutral-600 dark:text-neutral-400" />
              </button>
            </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto py-6">
            <div className="space-y-2 px-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <div key={link.name}>
                    <Link
                      href={link.href}
                      className={cn(
                        "block px-4 py-3 rounded-lg text-lg font-medium transition-colors relative overflow-hidden",
                        isActive
                          ? "bg-blue-500 text-white"
                          : "text-neutral-700 dark:text-neutral-300 active:bg-neutral-100 dark:active:bg-neutral-800"
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

          {/* Footer with CTA */}
          <div className="p-6 border-t border-neutral-200 dark:border-neutral-800">
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
          ? "bg-white/70 dark:bg-black/70 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/20 border-b border-neutral-200/50 dark:border-white/10"
          : "bg-white/40 dark:bg-black/40 backdrop-blur-lg border-b border-white/20 dark:border-white/5"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all duration-300"
            >
              <Code2 className="w-5 h-5 text-white" strokeWidth={2.5} />
              <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
            <motion.span
              whileHover={{ scale: 1.02 }}
              className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 dark:from-white dark:via-neutral-200 dark:to-white"
            >
              DevAgency
            </motion.span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-base font-semibold transition-all duration-300 rounded-lg group",
                    isActive
                      ? "text-neutral-900 dark:text-white"
                      : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 rounded-lg"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <motion.span
                    whileHover={{ y: -1 }}
                    className="relative z-10"
                  >
                    {link.name}
                  </motion.span>
                  <span className="absolute inset-0 rounded-lg bg-neutral-100 dark:bg-neutral-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              );
            })}
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/contact" className="hidden md:block">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="primary"
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 font-semibold"
                >
                  Nous Contacter
                </Button>
              </motion.div>
            </Link>

            <button
              type="button"
              className="md:hidden p-2 text-neutral-400 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors relative z-50 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Portal */}
      {mobileMenu}
    </nav>
  );
}
