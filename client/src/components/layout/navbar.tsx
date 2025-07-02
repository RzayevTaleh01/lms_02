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
    { href: "/contact", label: "Əlaqə" },
    { href: "/verify", label: "Sertifikat Yoxla" },
    { href: "/blog", label: "Bloq" },
  ];

  const navItems = [
    { href: "/", label: "Ana Səhifə" },
    { href: "/courses", label: "Kurslar" },
    { href: "/programs", label: "Proqramlar" },
    { href: "/training", label: "Təlim Modeli" },
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
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-9 text-xs">
            {/* Left side empty or can add content */}
            <div></div>
            
            {/* Right side navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {topNavItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <span className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer text-xs">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center space-x-2 cursor-pointer">
                <div className="flex items-center">
                  <div className="w-8 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded flex items-center justify-center mr-1">
                    <span className="text-white font-bold text-sm">D</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900">/</span>
                </div>
                <div className="flex flex-col -ml-1">
                  <span className="text-lg font-bold text-gray-900 leading-none">code</span>
                  <span className="text-sm font-bold text-gray-900 leading-none">academy</span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <span className={`transition-colors cursor-pointer font-medium text-sm ${
                    location === item.href 
                      ? "text-orange-500" 
                      : "text-gray-700 hover:text-orange-500"
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
                  {/* Dashboard Link for authenticated users */}
                  <Link href={getDashboardLink()}>
                    <Button variant="ghost" size="sm" className="hidden md:flex">
                      İdarə Paneli
                    </Button>
                  </Link>

                  {/* User Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-orange-500 text-white">
                            {user?.firstName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <div className="flex flex-col space-y-1 p-2">
                        <p className="text-sm font-medium leading-none">
                          {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
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
                    className="hidden md:flex text-gray-700 hover:text-gray-900 text-sm"
                  >
                    Giriş
                  </Button>
                  <Button 
                    onClick={() => setIsSignupModalOpen(true)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black hidden md:flex font-semibold text-sm px-6 py-2 rounded-lg"
                  >
                    ✉ Müraciət et
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
                    {/* Main Navigation */}
                    {navItems.map((item) => (
                      <Link key={item.href} href={item.href}>
                        <span 
                          className={`block py-3 px-4 text-lg font-medium transition-colors cursor-pointer ${
                            location === item.href 
                              ? "text-orange-500 bg-orange-50" 
                              : "text-gray-700 hover:text-orange-500 hover:bg-orange-50"
                          } rounded-lg`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.label}
                        </span>
                      </Link>
                    ))}
                    
                    <div className="border-t border-gray-200 my-4"></div>
                    
                    {/* Top Navigation Items */}
                    {topNavItems.map((item) => (
                      <Link key={item.href} href={item.href}>
                        <span 
                          className={`block py-2 px-4 text-sm transition-colors cursor-pointer ${
                            location === item.href 
                              ? "text-orange-500" 
                              : "text-gray-600 hover:text-gray-900"
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
                            className="block py-2 px-4 text-lg text-gray-700 hover:text-orange-500 cursor-pointer"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            İdarə Paneli
                          </span>
                        </Link>
                        <Button 
                          variant="outline"
                          onClick={() => logoutMutation.mutate()}
                          className="mx-4 mt-4"
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
                          className="w-full"
                        >
                          Giriş
                        </Button>
                        <Button 
                          onClick={() => {
                            setIsSignupModalOpen(true);
                            setIsMobileMenuOpen(false);
                          }}
                          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
                        >
                          ✉ Müraciət et
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