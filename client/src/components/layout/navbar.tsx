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
      {/* Modern Navigation */}
      <nav className="bg-white/90 backdrop-blur-lg shadow-lg border-b border-gray-100/50 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center space-x-4 cursor-pointer group">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-devcode-orange to-devcode-yellow rounded-2xl flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-all duration-300 group-hover:rotate-6">
                    <span className="text-white font-bold text-xl">D</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-devcode-orange to-devcode-yellow rounded-2xl blur-lg opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-gray-900 leading-none group-hover:text-devcode-orange transition-colors duration-300">
                    DEVCODE
                  </span>
                  <span className="text-xs font-medium text-devcode-orange leading-none opacity-80">
                    Learning Management System
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <Link key={item.href} href={item.href}>
                  <div className={`relative px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                    location === item.href 
                      ? "bg-gradient-to-r from-devcode-orange to-devcode-yellow text-white shadow-lg" 
                      : "text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-yellow-50 hover:text-devcode-orange"
                  }`}>
                    <span className="font-medium text-sm relative z-10">
                      {item.label}
                    </span>
                    {location === item.href && (
                      <div className="absolute inset-0 bg-gradient-to-r from-devcode-orange to-devcode-yellow rounded-xl blur-sm opacity-50"></div>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            {/* Right Side - Top Navigation as Pills */}
            <div className="hidden lg:flex items-center space-x-2">
              {topNavItems.slice(0, 3).map((item) => (
                <Link key={item.href} href={item.href}>
                  <div className="px-4 py-2 text-xs text-gray-600 hover:text-devcode-orange transition-colors cursor-pointer rounded-full hover:bg-orange-50">
                    {item.label}
                  </div>
                </Link>
              ))}
            </div>

            {/* Auth Section */}
            <div className="flex items-center space-x-3">
              {isAuthenticated ? (
                <>
                  {/* Dashboard Link for authenticated users */}
                  <Link href={getDashboardLink()}>
                    <Button className="hidden md:flex bg-gradient-to-r from-devcode-orange to-devcode-yellow text-white hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                      İdarə Paneli
                    </Button>
                  </Link>

                  {/* User Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-orange-50 transition-colors">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-gradient-to-r from-devcode-orange to-devcode-yellow text-white">
                            {user?.firstName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 shadow-xl border-0 rounded-2xl p-2" align="end" forceMount>
                      <div className="flex flex-col space-y-1 p-3 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl mb-2">
                        <p className="text-sm font-medium leading-none text-gray-900">
                          {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-xs leading-none text-devcode-orange">
                          {user?.email}
                        </p>
                      </div>
                      <DropdownMenuItem asChild className="rounded-xl hover:bg-orange-50 transition-colors">
                        <Link href={getDashboardLink()}>
                          <User className="mr-3 h-4 w-4 text-devcode-orange" />
                          <span>İdarə Paneli</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="rounded-xl hover:bg-orange-50 transition-colors">
                        <Settings className="mr-3 h-4 w-4 text-devcode-orange" />
                        <span>Ayarlar</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => logoutMutation.mutate()}
                        className="rounded-xl hover:bg-red-50 transition-colors text-red-600"
                      >
                        <LogOut className="mr-3 h-4 w-4" />
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
                    className="hidden md:flex text-gray-700 hover:text-devcode-orange transition-all duration-300 px-6 py-2 rounded-xl hover:bg-orange-50"
                  >
                    Giriş
                  </Button>
                  <Button 
                    onClick={() => setIsSignupModalOpen(true)}
                    className="bg-gradient-to-r from-devcode-orange to-devcode-yellow text-white hover:shadow-lg hidden md:flex font-semibold px-6 py-2 rounded-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Qeydiyyat
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