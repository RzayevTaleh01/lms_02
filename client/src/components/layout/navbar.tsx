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
    { href: "/about", label: "Hər kəs üçün" },
    { href: "/corporate", label: "Korporativ həllər" },
    { href: "/career", label: "Karyera Mərkəzi" },
    { href: "/consulting", label: "Məsləhətimiz" },
    { href: "/blog", label: "Bloq" },
  ];

  const navItems = [
    { href: "/", label: "Akademiya" },
    { href: "/courses", label: "Tədris sahələri" },
    { href: "/programs", label: "Təqşud proqramları" },
    { href: "/training", label: "Təhsil modelil" },
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
      <div className="bg-devcode-light border-b border-devcode-orange/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-9 text-xs">
            {/* Left side empty or can add content */}
            <div></div>
            
            {/* Right side navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {topNavItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <span className="text-devcode-gray hover:text-devcode-orange transition-colors cursor-pointer text-xs font-medium">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white shadow-devcode border-b border-devcode-orange/10 sticky top-0 z-50 backdrop-blur-xl bg-white/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center space-x-3 cursor-pointer group">
                <div className="flex items-center">
                  <div className="w-10 h-8 bg-devcode-gradient rounded-xl flex items-center justify-center shadow-devcode group-hover:shadow-devcode-lg transition-all">
                    <span className="text-white font-bold text-lg">D</span>
                  </div>
                  <span className="text-xl font-bold text-devcode-dark ml-1">/</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-devcode-dark leading-none">code</span>
                  <span className="text-sm font-bold text-devcode-orange leading-none">academy</span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <span className={`transition-colors cursor-pointer font-semibold text-sm ${
                    location === item.href 
                      ? "text-devcode-orange" 
                      : "text-devcode-dark hover:text-devcode-orange"
                  }`}>
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>

            {/* Auth Section */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  {/* Dashboard Link for authenticated users */}
                  <Link href={getDashboardLink()}>
                    <Button variant="ghost" size="sm" className="hidden md:flex text-devcode-dark hover:text-devcode-orange font-medium">
                      İdarə Paneli
                    </Button>
                  </Link>

                  {/* User Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-devcode-orange/5">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-devcode-gradient text-white font-semibold">
                            {user?.firstName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <div className="flex flex-col space-y-1 p-3">
                        <p className="text-sm font-semibold leading-none text-devcode-dark">
                          {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-xs leading-none text-devcode-gray">
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
                    className="hidden md:flex text-devcode-dark hover:text-devcode-orange text-sm font-medium"
                  >
                    Giriş
                  </Button>
                  <Button 
                    onClick={() => setIsSignupModalOpen(true)}
                    className="bg-devcode-gradient hover:bg-devcode-orange-dark text-white hidden md:flex font-semibold text-sm px-6 py-2 rounded-xl shadow-devcode"
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
                          className={`block py-3 px-4 text-lg transition-colors cursor-pointer font-semibold ${
                            location === item.href 
                              ? "text-devcode-orange" 
                              : "text-devcode-dark hover:text-devcode-orange"
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
                            className="block py-3 px-4 text-lg text-devcode-dark hover:text-devcode-orange cursor-pointer font-medium"
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
                      <div className="px-4 pt-4 space-y-3">
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setIsLoginModalOpen(true);
                            setIsMobileMenuOpen(false);
                          }}
                          className="w-full border-devcode-orange text-devcode-orange hover:bg-devcode-orange/5"
                        >
                          Giriş
                        </Button>
                        <Button 
                          onClick={() => {
                            setIsSignupModalOpen(true);
                            setIsMobileMenuOpen(false);
                          }}
                          className="w-full bg-devcode-gradient hover:bg-devcode-orange-dark text-white shadow-devcode"
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