import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User, Settings, LogOut, ChevronDown } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import LoginModal from "@/components/auth/login-modal";

export default function Navbar() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Logout failed');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/auth/user'] });
    },
  });

  // Top navigation items - divided into two sections
  const topNavLeftItems = [
    { label: "Hər kəs üçün", href: "/for-everyone" },
    { label: "DevCode LMS", href: "/lms" },
  ];

  const topNavRightItems = [
    { label: "Karyera mərkəzi", href: "/career" },
    { label: "Əlaqə", href: "/contact" },
  ];

  // Main navigation items with dropdowns
  const navItems = [
    { 
      label: "Akademiya", 
      href: "/about",
      dropdown: [
        { label: "Haqqımızda", href: "/about" },
        { label: "Vakansiyalar", href: "/careers" }
      ]
    },
    { 
      label: "Tədris proqramları", 
      href: "/courses",
      dropdown: [
        { label: "Frontend Proqramlaşdırma", href: "/courses?category=frontend" },
        { label: "FullStack Proqramlaşdırma", href: "/courses?category=fullstack" }
      ]
    },
    { label: "Təhsil modeli", href: "/education-model" },
    { label: "Sertifikat yoxla", href: "/verify" },
  ];

  const getDashboardLink = () => {
    if (!user) return '/';
    
    switch (user.role) {
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
          <div className="flex justify-between items-center h-10 text-xs">
            {/* Left side navigation - always show for mobile */}
            <div className="flex items-center space-x-4 md:space-x-6">
              {topNavLeftItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <span className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer text-xs">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
            
            {/* Right side navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {topNavRightItems.map((item) => (
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
            {/* Logo - exactly like reference */}
            <Link href="/">
              <div className="flex items-center space-x-3 cursor-pointer">
                <div className="flex items-center">
                  {/* Logo icon */}
                  <div className="w-8 h-8 bg-devcode-orange rounded-lg flex items-center justify-center mr-2">
                    <span className="text-white font-bold text-sm">D</span>
                  </div>
                  <span className="text-xl font-bold text-gray-900">DevCode</span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation - clean and minimal */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                item.dropdown ? (
                  <DropdownMenu key={item.label}>
                    <DropdownMenuTrigger asChild>
                      <button className={`flex items-center transition-colors font-medium text-sm ${
                        location === item.href 
                          ? "text-gray-900 border-b-2 border-devcode-yellow pb-1" 
                          : "text-gray-600 hover:text-gray-900"
                      }`}>
                        {item.label}
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      {item.dropdown.map((dropdownItem) => (
                        <DropdownMenuItem key={dropdownItem.href} asChild>
                          <Link href={dropdownItem.href}>
                            <span className="w-full cursor-pointer">
                              {dropdownItem.label}
                            </span>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link key={item.href} href={item.href}>
                    <span className={`transition-colors cursor-pointer font-medium text-sm ${
                      location === item.href 
                        ? "text-gray-900 border-b-2 border-devcode-yellow pb-1" 
                        : "text-gray-600 hover:text-gray-900"
                    }`}>
                      {item.label}
                    </span>
                  </Link>
                )
              ))}
            </div>

            {/* Auth Section */}
            <div className="flex items-center space-x-3">
              {isAuthenticated ? (
                <>
                  {/* Dashboard Link for authenticated users */}
                  <Link href={getDashboardLink()}>
                    <Button variant="ghost" size="sm" className="hidden md:flex text-gray-700 hover:text-gray-900">
                      İdarə Paneli
                    </Button>
                  </Link>

                  {/* User Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-devcode-orange text-white text-xs">
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
                    Daxil ol
                  </Button>
                  <Button 
                    onClick={() => setIsSignupModalOpen(true)}
                    className="bg-devcode-yellow hover:bg-devcode-yellow/90 text-black hidden md:flex font-semibold text-sm px-6 py-2 rounded-lg"
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
                  <div className="flex flex-col h-full">
                    {/* Auth Section at Top */}
                    {!isAuthenticated && (
                      <div className="space-y-3 mt-8 mb-6">
                        <Button 
                          onClick={() => {
                            setIsLoginModalOpen(true);
                            setIsMobileMenuOpen(false);
                          }}
                          variant="outline"
                          className="w-full"
                        >
                          Daxil ol
                        </Button>
                        <Button 
                          onClick={() => {
                            setIsSignupModalOpen(true);
                            setIsMobileMenuOpen(false);
                          }}
                          className="w-full bg-devcode-yellow hover:bg-devcode-yellow/90 text-black"
                        >
                          Müraciət et
                        </Button>
                      </div>
                    )}
                    
                    <div className="border-t border-gray-200 my-4"></div>
                    
                    {/* Main Navigation */}
                    <div className="flex-1 space-y-2">
                      {navItems.map((item) => (
                        <div key={item.label}>
                          {item.dropdown ? (
                            <div className="space-y-2">
                              <span className="block py-3 px-4 text-lg font-medium text-gray-700 rounded-lg">
                                {item.label}
                              </span>
                              <div className="ml-4 space-y-1">
                                {item.dropdown.map((dropdownItem) => (
                                  <Link key={dropdownItem.href} href={dropdownItem.href}>
                                    <span 
                                      className={`block py-2 px-4 text-sm transition-colors cursor-pointer ${
                                        location === dropdownItem.href 
                                          ? "text-devcode-orange bg-orange-50" 
                                          : "text-gray-600 hover:text-devcode-orange hover:bg-orange-50"
                                      } rounded-lg`}
                                      onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                      {dropdownItem.label}
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <Link href={item.href}>
                              <span 
                                className={`block py-3 px-4 text-lg font-medium transition-colors cursor-pointer ${
                                  location === item.href 
                                    ? "text-devcode-orange bg-orange-50" 
                                    : "text-gray-700 hover:text-devcode-orange hover:bg-orange-50"
                                } rounded-lg`}
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {item.label}
                              </span>
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </>
  );
}