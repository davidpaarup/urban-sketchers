import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Palette,
  Instagram,
  Facebook,
  Mail,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { CITY_NAME } from "@/lib/constants";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Events", href: "/events" },
    { name: "Gallery", href: "/gallery" },
    { name: "Join us", href: "/join" },
  ];

  const isActivePath = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="p-2 bg-sketch-blue/10 rounded-lg group-hover:bg-sketch-blue/20 transition-colors">
                <Palette className="h-6 w-6 text-sketch-blue" />
              </div>
              <div className="hidden sm:block">
                <div className="text-lg font-bold text-sketch-charcoal">
                  Urban Sketchers
                </div>
                <div className="text-sm text-sketch-blue -mt-1">{CITY_NAME}</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-sketch-blue",
                    isActivePath(item.href)
                      ? "text-sketch-blue"
                      : "text-foreground/80",
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center space-x-4">
              <Button
                asChild
                size="sm"
                className="bg-sketch-blue hover:bg-sketch-blue/90"
              >
                <Link to="/join">Join Community</Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <nav className="flex flex-col space-y-3">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "text-sm font-medium py-2 transition-colors hover:text-sketch-blue",
                      isActivePath(item.href)
                        ? "text-sketch-blue"
                        : "text-foreground/80",
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Button
                  asChild
                  size="sm"
                  className="mt-4 bg-sketch-blue hover:bg-sketch-blue/90 w-fit"
                >
                  <Link to="/join" onClick={() => setIsMenuOpen(false)}>
                    Join Community
                  </Link>
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-sketch-ink text-sketch-paper">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-sketch-blue/20 rounded-lg">
                  <Palette className="h-6 w-6 text-sketch-blue" />
                </div>
                <div>
                  <div className="text-lg font-bold">Urban Sketchers</div>
                  <div className="text-sm text-sketch-paper/80">
                    Drawing {CITY_NAME}, one sketch at a time
                  </div>
                </div>
              </div>
              <p className="text-sm text-sketch-paper/70 max-w-md leading-relaxed">
                Join our vibrant community of artists who capture the essence of {CITY_NAME} through on-location drawing.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4 text-sketch-paper">
                Quick Links
              </h3>
              <ul className="space-y-2 text-sm">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-sketch-paper/70 hover:text-sketch-paper transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h3 className="font-semibold mb-4 text-sketch-paper">Connect</h3>
              <div className="flex space-x-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-sketch-paper/70 hover:text-sketch-paper hover:bg-sketch-paper/10"
                >
                  <a
                    href="https://www.instagram.com/urbansketchers/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                  <Instagram className="h-4 w-4" />
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-sketch-paper/70 hover:text-sketch-paper hover:bg-sketch-paper/10"
                >
                  <a
                    href="https://www.facebook.com/urbansketchers/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-sketch-paper/70 hover:text-sketch-paper hover:bg-sketch-paper/10"
                >
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-4 text-sm text-sketch-paper/70">
                <p>Follow @urbansketchers</p>
              </div>
            </div>
          </div>

          <div className="border-t border-sketch-paper/20 mt-8 pt-6 text-center text-sm text-sketch-paper/60">
            <p>
              &copy; 2025 Urban Sketchers {CITY_NAME}. Part of the global Urban Sketchers
              community.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
