import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, User, LogOut, Settings } from "lucide-react";
import LoginModal from "@/components/auth/login-modal";
import SignupModal from "@/components/auth/signup-modal";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [location] = useLocation();
  const { user, isAuthenticated } = useAuth();

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest('POST', '/api/auth/logout');
      return response.json();
    },
    onSuccess: () => {
      window.location.href = '/';
    }
  });

  const topNavItems = [
    { href: "/about", label: "Haqqımızda" },
    { href: "/blog", label: "Bloq" },
    { href: "/career", label: "Karyera" },
    { href: "/contact", label: "Əlaqə" },
  ];

  const navItems = [
    { href: "/", label: "Ana səhifə" },
    { href: "/courses", label: "Kurslar" },
    { href: "/verify-certificate", label: "Sertifikat Yoxla" },
    { href: "/about", label: "Haqqımızda" },
  ];

  const getDashboardLink = () => {
    switch (user?.role) {
      case 'admin':
        return '/admin';
      case 'teacher':
        return '/teacher';
      case 'student':
        return '/student';
      default:
        return '/';
    }
  };

  return (
    <>
      {/* Top Navigation Bar */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-8 text-xs">
            <div></div>
            <div className="hidden md:flex items-center space-x-6">
              {topNavItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <span className="text-devcode-gray hover:text-devcode-purple transition-colors cursor-pointer text-xs">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white shadow-clean border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center space-x-2 cursor-pointer">
                <div className="w-8 h-8 bg-devcode-purple rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">D</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xl font-bold text-devcode-dark">code</span>
                  <span className="text-sm font-medium text-devcode-purple ml-1">academy</span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <span className={`transition-colors cursor-pointer font-medium text-sm ${
                    location === item.href 
                      ? "text-devcode-purple" 
                      : "text-devcode-gray hover:text-devcode-purple"
                  }`}>
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>

            {/* Auth Section */}
            <div className="flex items-center space-x-3">
              {isAuthenticated ? (
                <>
                  <Link href={getDashboardLink()}>
                    <Button variant="ghost" size="sm" className="hidden md:flex text-devcode-gray hover:text-devcode-purple font-medium">
                      İdarə Paneli
                    </Button>
                  </Link>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-devcode-purple text-white text-sm">
                            {user?.firstName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <div className="flex flex-col space-y-1 p-3">
                        <p className="text-sm font-medium text-devcode-dark">
                          {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-xs text-devcode-gray">
                          {user?.email}
                        </p>
                      </div>
                      <DropdownMenuItem asChild>
                        <Link href={getDashboardLink()}>
                          <User className="mr-2 h-4 w-4" />
                          <span>İdarə Paneli</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Ayarlar</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => logoutMutation.mutate()}
                        className="text-red-600"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Çıxış</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    onClick={() => setIsLoginModalOpen(true)}
                    className="hidden md:flex text-devcode-gray hover:text-devcode-purple text-sm"
                  >
                    Giriş
                  </Button>
                  <Button 
                    onClick={() => setIsSignupModalOpen(true)}
                    className="bg-devcode-purple hover:bg-devcode-purple-dark text-white hidden md:flex text-sm px-6 py-2 rounded-lg"
                  >
                    Müraciət et
                  </Button>
                </>
              )}

              {/* Mobile Menu */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <div className="flex flex-col space-y-4 mt-8">
                    {topNavItems.map((item) => (
                      <Link key={item.href} href={item.href}>
                        <span 
                          className="block py-2 px-4 text-sm text-gray-600 hover:text-gray-900 cursor-pointer"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.label}
                        </span>
                      </Link>
                    ))}
                    
                    <div className="border-t border-gray-200 pt-4"></div>
                    
                    {navItems.map((item) => (
                      <Link key={item.href} href={item.href}>
                        <span 
                          className={`block py-2 px-4 text-base transition-colors cursor-pointer ${
                            location === item.href 
                              ? "text-devcode-purple font-medium" 
                              : "text-devcode-gray hover:text-devcode-purple"
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.label}
                        </span>
                      </Link>
                    ))}

                    {isAuthenticated ? (
                      <>
                        <Link href={getDashboardLink()}>
                          <span 
                            className="block py-2 px-4 text-base text-devcode-gray hover:text-devcode-purple cursor-pointer"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            İdarə Paneli
                          </span>
                        </Link>
                        <Button 
                          variant="outline"
                          onClick={() => logoutMutation.mutate()}
                          className="mx-4 mt-4 border-red-300 text-red-600 hover:bg-red-50"
                        >
                          Çıxış
                        </Button>
                      </>
                    ) : (
                      <div className="px-4 pt-4 space-y-2">
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setIsLoginModalOpen(true);
                            setIsMobileMenuOpen(false);
                          }}
                          className="w-full border-devcode-purple text-devcode-purple hover:bg-devcode-purple/5"
                        >
                          Giriş
                        </Button>
                        <Button 
                          onClick={() => {
                            setIsSignupModalOpen(true);
                            setIsMobileMenuOpen(false);
                          }}
                          className="w-full bg-devcode-purple hover:bg-devcode-purple-dark text-white"
                        >
                          Müraciət et
                        </Button>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      <LoginModal open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}
        onSwitchToSignup={() => {
          setIsLoginModalOpen(false);
          setIsSignupModalOpen(true);
        }}
      />

      <SignupModal 
        open={isSignupModalOpen} 
        onOpenChange={setIsSignupModalOpen}
        onSwitchToLogin={() => {
          setIsSignupModalOpen(false);
          setIsLoginModalOpen(true);
        }}
      />
    </>
  );
}