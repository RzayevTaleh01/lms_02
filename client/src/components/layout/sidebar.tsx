import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Calendar, 
  FileText, 
  BarChart3, 
  Settings,
  GraduationCap,
  CheckSquare,
  Award,
  User,
  Clock,
  History,
  Menu,
  ChevronLeft,
  X
} from "lucide-react";

interface SidebarProps {
  userRole: 'admin' | 'teacher' | 'student';
  isMobileOpen?: boolean;
  setIsMobileOpen?: (open: boolean) => void;
}

export default function Sidebar({ 
  userRole, 
  isMobileOpen: propIsMobileOpen, 
  setIsMobileOpen: propSetIsMobileOpen 
}: SidebarProps) {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [localIsMobileOpen, setLocalIsMobileOpen] = useState(false);
  
  // Use props if provided, otherwise use local state
  const isMobileOpen = propIsMobileOpen !== undefined ? propIsMobileOpen : localIsMobileOpen;
  const setIsMobileOpen = propSetIsMobileOpen || setLocalIsMobileOpen;

  // Update CSS variable when sidebar state changes
  useEffect(() => {
    const root = document.documentElement;
    const updateSidebarWidth = () => {
      if (window.innerWidth >= 1024) {
        // Desktop: use collapsed/expanded state
        root.style.setProperty(
          '--sidebar-width',
          isCollapsed ? '4rem' : '16rem'
        );
      } else {
        // Mobile: no margin when closed, full margin when open
        root.style.setProperty('--sidebar-width', '0rem');
      }
    };
    
    updateSidebarWidth();
    window.addEventListener('resize', updateSidebarWidth);
    return () => window.removeEventListener('resize', updateSidebarWidth);
  }, [isCollapsed]);

  // Handle mobile responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getNavigationItems = () => {
    switch (userRole) {
      case 'admin':
        return [
          { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
          { href: '/admin/courses', label: 'Kurslar', icon: BookOpen },
          { href: '/admin/teachers', label: 'Müəllimlər', icon: GraduationCap },
          { href: '/admin/students', label: 'Tələbələr', icon: Users },
          { href: '/admin/settings', label: 'Settings', icon: Settings },
        ];
      case 'teacher':
        return [
          { href: '/teacher', label: 'Ana Panel', icon: LayoutDashboard },
          { href: '/teacher/courses', label: 'Kurslarım', icon: BookOpen },
          { href: '/teacher/students', label: 'Tələbələrim', icon: Users },
          { href: '/session-history', label: 'Dərs Tarixçəsi', icon: History },
        ];
      case 'student':
        return [
          { href: '/student', label: 'Dashboard', icon: LayoutDashboard },
          { href: '/student/courses', label: 'My Courses', icon: BookOpen },
          { href: '/student/assignments', label: 'Assignments', icon: CheckSquare },
          { href: '/student/progress', label: 'Progress', icon: BarChart3 },
          { href: '/student/certificates', label: 'Certificates', icon: Award },
          { href: '/student/profile', label: 'Profile', icon: User },
        ];
      default:
        return [];
    }
  };

  const getUserInfo = () => {
    switch (userRole) {
      case 'admin':
        return {
          name: user?.firstName || 'Admin',
          role: 'System Administrator',
          avatar: 'A'
        };
      case 'teacher':
        return {
          name: user?.firstName || 'Müəllim',
          role: 'DevCode Müəllimi',
          avatar: user?.firstName?.charAt(0) || 'M'
        };
      case 'student':
        return {
          name: user?.firstName || 'Student',
          role: 'Computer Science Student',
          avatar: user?.firstName?.charAt(0) || 'S'
        };
      default:
        return {
          name: 'User',
          role: 'Member',
          avatar: 'U'
        };
    }
  };

  const navigationItems = getNavigationItems();
  const userInfo = getUserInfo();

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 h-full bg-gradient-to-b from-devcode-yellow to-devcode-yellow-light shadow-lg border-r border-devcode-yellow/20 z-40 transition-all duration-300",
        // Desktop behavior
        "lg:translate-x-0",
        isCollapsed ? "lg:w-16" : "lg:w-64",
        // Mobile behavior
        "w-64",
        isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className={cn("p-6", isCollapsed && "lg:p-3")}>
          {/* Mobile Toggle Button (only visible on mobile) */}
          <div className="flex justify-between items-center mb-4 lg:hidden">
            <span className="text-lg font-semibold text-white">Menyu</span>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Desktop Toggle Button (only visible on desktop) */}
          <div className="hidden lg:flex justify-end mb-4">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {isCollapsed ? (
                <Menu className="w-5 h-5 text-white" />
              ) : (
                <ChevronLeft className="w-5 h-5 text-white" />
              )}
            </button>
          </div>

          {/* Logo */}
          <Link href="/">
            <div className={cn(
              "flex items-center mb-8 cursor-pointer",
              isCollapsed ? "lg:justify-center" : "space-x-3"
            )}>
              <div className="w-10 h-10 bg-white rounded-lg shadow-md relative flex-shrink-0 flex items-center justify-center">
                <span className="text-devcode-yellow font-bold text-lg">DC</span>
              </div>
              {(!isCollapsed || window.innerWidth < 1024) && (
                <span className="text-xl font-bold text-white">DevCode</span>
              )}
            </div>
          </Link>

          {/* User Profile */}
          <div className="mb-6">
            <div className={cn(
              "flex items-center p-4 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30",
              isCollapsed ? "lg:justify-center" : "space-x-3"
            )}>
              <Avatar className="w-12 h-12 flex-shrink-0 ring-2 ring-white/50">
                <AvatarFallback className="bg-white text-devcode-yellow font-bold">
                  {userInfo.avatar}
                </AvatarFallback>
              </Avatar>
              {(!isCollapsed || window.innerWidth < 1024) && (
                <div>
                  <div className="font-semibold text-white">{userInfo.name}</div>
                  <div className="text-sm text-white/80">{userInfo.role}</div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = location === item.href;

              return (
                <Link key={item.href} href={item.href}>
                  <div className={cn(
                    "flex items-center px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer relative group",
                    isActive 
                      ? "bg-white text-devcode-yellow shadow-lg" 
                      : "text-white/90 hover:text-white hover:bg-white/10 hover:shadow-md",
                    isCollapsed ? "lg:justify-center" : "space-x-3"
                  )}>
                    <IconComponent className="w-5 h-5 flex-shrink-0" />
                    {(!isCollapsed || window.innerWidth < 1024) && <span>{item.label}</span>}
                    
                    {/* Tooltip for collapsed state on desktop */}
                    {isCollapsed && window.innerWidth >= 1024 && (
                      <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-lg">
                        {item.label}
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
            
            <div
              className={cn(
                "flex items-center px-4 py-3 mt-4 rounded-xl transition-all duration-200 cursor-pointer text-white/90 hover:text-white hover:bg-red-500/20 hover:shadow-md relative group border border-white/20",
                isCollapsed ? "lg:justify-center" : "space-x-3"
              )}
              onClick={handleLogout}
            >
              <Clock className="w-5 h-5 flex-shrink-0" />
              {(!isCollapsed || window.innerWidth < 1024) && <span>Çıxış</span>}
              
              {/* Tooltip for collapsed state on desktop */}
              {isCollapsed && window.innerWidth >= 1024 && (
                <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-lg">
                  Çıxış
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}