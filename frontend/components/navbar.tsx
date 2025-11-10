"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Heart, Menu, X } from "lucide-react";
import { useFavorites } from "@/context/favorites-context";
import { useState } from "react";

interface NavbarProps {
  onAddCar?: () => void;
}

export default function Navbar({ onAddCar }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { favorites } = useFavorites();
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: "Browse", href: "/" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const handleAddCar = () => {
    if (onAddCar) onAddCar();
    else router.push("/add-car");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/60 backdrop-blur-md shadow-sm">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-3 hover:opacity-90 transition-opacity cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            aria-label="Nxcar Home"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent shadow-md transform-gpu hover:scale-105 transition">
              <span className="text-sm font-bold text-primary-foreground animate-pulse">
                NX
              </span>
            </div>
            <div className="flex flex-col leading-4">
              <span className="text-lg font-semibold text-foreground">
                Nxcar
              </span>
              <span className="text-xs text-muted-foreground -mt-0.5">
                Premium marketplace
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => router.push(item.href)}
                  className={
                    "relative text-sm font-medium transition-colors py-1 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 " +
                    (pathname === item.href
                      ? "text-primary after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:rounded after:bg-primary"
                      : "text-foreground hover:text-primary")
                  }
                >
                  <span className="inline-flex items-center gap-2">
                    {item.icon ?? null}
                    {item.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Spacer + Add button */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <Button
                  onClick={() => router.push("/my-cars")}
                  variant="ghost"
                  className="px-3 py-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                >
                  <div className="relative inline-flex">
                    <Heart className="w-4 h-4" />
                    {favorites.length > 0 && (
                      <span className="absolute -top-2 -right-3 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-red-500 rounded-full">
                        {favorites.length}
                      </span>
                    )}
                  </div>
                </Button>
              </div>

              <Button
                onClick={handleAddCar}
                size="lg"
                className="gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              >
                <span className="text-lg">+</span>
                <span className="hidden sm:inline">Add Car</span>
                <span className="sm:hidden">Add</span>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setOpen((s) => !s)}
              aria-label="Toggle menu"
              className="p-2 rounded-md bg-background/60 backdrop-blur-sm border border-border hover:bg-muted transition cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile panel */}
        <div
          className={`md:hidden mt-3 overflow-hidden transition-[max-height,opacity,transform] duration-300 ${
            open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-3 bg-card/90 border border-border rounded-lg p-3 shadow-lg">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => {
                  setOpen(false);
                  router.push(item.href);
                }}
                className={`w-full text-left px-3 py-2 rounded-md transition cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 ${
                  pathname === item.href
                    ? "bg-primary/5 text-primary font-semibold"
                    : "hover:bg-muted"
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  {item.icon ?? null}
                  {item.label}
                </span>
              </button>
            ))}

            <div className="flex items-center gap-2 mt-2">
              <Button
                onClick={handleAddCar}
                className="flex-1 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              >
                Add Car
              </Button>
              <Button
                onClick={() => router.push("/my-cars")}
                variant="ghost"
                className="cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
              >
                <div className="relative inline-flex">
                  <Heart className="w-4 h-4" />
                  {favorites.length > 0 && (
                    <span className="absolute -top-2 -right-3 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-red-500 rounded-full">
                      {favorites.length}
                    </span>
                  )}
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
