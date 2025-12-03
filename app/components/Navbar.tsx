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
    <div className="fixed inset-0 z-[100] md:hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      {/* Menu */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="absolute inset-0 bg-white dark:bg-neutral-900"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-800">
            <span className="text-xl font-bold text-neutral-900 dark:text-white">Menu</span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <X className="w-6 h-6 text-neutral-600 dark:text-neutral-400" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto py-6">
            <div className="space-y-2 px-4">
              {navLinks.map((link, index) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "block px-4 py-3 rounded-lg text-base font-medium transition-all relative overflow-hidden",
                        isActive
                          ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                          : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
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
    </div>,
    document.body
  ) : null;

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        scrolled
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-md border-neutral-200 dark:border-white/10"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-blue-600/10 border border-blue-500/20 group-hover:border-blue-500/50 transition-colors"
            >
              <Code2 className="w-6 h-6 text-blue-500" />
            </motion.div>
            <motion.span
              whileHover={{ scale: 1.02 }}
              className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-400"
            >
              DevAgency
            </motion.span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors relative group",
                    isActive
                      ? "text-neutral-900 dark:text-white"
                      : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                  )}
                >
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="relative z-10"
                  >
                    {link.name}
                  </motion.span>
                  {isActive && (
                    <motion.span
                      layoutId="activeTab"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-500"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500/50 transition-all group-hover:w-full" />
                </Link>
              );
            })}
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/contact" className="hidden md:block">
              <Button variant="primary" size="sm">
                Nous Contacter
              </Button>
            </Link>

            <button
              className="md:hidden p-2 text-neutral-400 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Portal */}
      <AnimatePresence>
        {mobileMenu}
      </AnimatePresence>
    </nav>
  );
}
