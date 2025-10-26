import { Sparkle } from "lucide-react";
import { Button } from "./ui/button";

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const navItems = [
    { name: "Home", value: "home" },
    { name: "Cartelera", value: "cartelera" },
    { name: "Salas", value: "salas" },
    { name: "Registro", value: "registro" },
    { name: "Contacto", value: "contacto" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-[#1a2332]/95 backdrop-blur supports-[backdrop-filter]:bg-[#1a2332]/90">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
              <Sparkle className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl text-primary">Teatro Lux</span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Button
                key={item.value}
                variant={currentPage === item.value ? "default" : "ghost"}
                onClick={() => onNavigate(item.value)}
              >
                {item.name}
              </Button>
            ))}
          </nav>

          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={() => {
                const nav = document.getElementById("mobile-nav");
                if (nav) {
                  nav.classList.toggle("hidden");
                }
              }}
            >
              <span className="sr-only">Menú</span>
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Button>
          </div>
        </div>

        <nav id="mobile-nav" className="hidden md:hidden mt-4 flex flex-col gap-2">
          {navItems.map((item) => (
            <Button
              key={item.value}
              variant={currentPage === item.value ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => onNavigate(item.value)}
            >
              {item.name}
            </Button>
          ))}
        </nav>
      </div>
    </header>
  );
}
