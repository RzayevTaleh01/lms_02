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

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/courses", label: "Courses" },
    { href: "/blog", label: "Blog" },
    { href: "/verify", label: "Verify Certificate" },
    { href: "/contact", label: "Contact" },
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
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center space-x-3 cursor-pointer">
                <div className="w-8 h-8 bg-devcode-orange rounded transform rotate-45 relative">
                  <div className="absolute inset-1 bg-white rounded transform -rotate-45"></div>
                </div>
                <span className="text-xl font-bold text-devcode-dark">DevCode Academy</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <span className={`transition-colors cursor-pointer ${
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
            <div className="flex items-center space-x-3">
              {isAuthenticated ? (
                <>
                  {/* Dashboard Link for authenticated users */}
                  <Link href={getDashboardLink()}>
                    <Button variant="ghost" size="sm" className="hidden md:flex">
                      Dashboard
                    </Button>
                  </Link>

                  {/* User Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-devcode-orange text-white">
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
                          <span>Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => logoutMutation.mutate()}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    onClick={() => setIsLoginModalOpen(true)}
                    className="hidden md:flex"
                  >
                    Login
                  </Button>
                  <Button 
                    onClick={() => setIsSignupModalOpen(true)}
                    className="bg-devcode-orange hover:bg-orange-600 hidden md:flex"
                  >
                    Sign Up
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
                    {navItems.map((item) => (
                      <Link key={item.href} href={item.href}>
                        <span 
                          className={`block py-2 px-4 text-lg transition-colors cursor-pointer ${
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
                            className="block py-2 px-4 text-lg text-devcode-dark hover:text-devcode-orange cursor-pointer"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Dashboard
                          </span>
                        </Link>
                        <Button 
                          variant="outline"
                          onClick={() => logoutMutation.mutate()}
                          className="mx-4 mt-4"
                        >
                          Logout
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
                          Login
                        </Button>
                        <Button 
                          onClick={() => {
                            setIsSignupModalOpen(true);
                            setIsMobileMenuOpen(false);
                          }}
                          className="w-full bg-devcode-orange hover:bg-orange-600"
                        >
                          Sign Up
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