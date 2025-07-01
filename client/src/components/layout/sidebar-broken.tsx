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
}

export default function Sidebar({ userRole }: SidebarProps) {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Update CSS variable when sidebar state changes
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty(
      '--sidebar-width',
      isCollapsed ? 'var(--sidebar-width-collapsed)' : '16rem'
    );
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
          { href: '/admin/users', label: 'User Management', icon: Users },
          { href: '/admin/history', label: 'Class History', icon: History },
          { href: '/admin/statistics', label: 'Statistics', icon: BarChart3 },
          { href: '/admin/settings', label: 'Settings', icon: Settings },
        ];
      case 'teacher':
        return [
          { href: '/teacher', label: 'Dashboard', icon: LayoutDashboard },
          { href: '/teacher/courses', label: 'Courses', icon: BookOpen },
          { href: '/teacher/students', label: 'Students', icon: Users },
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
          name: user?.firstName || 'Teacher',
          role: 'Mathematics Teacher',
          avatar: user?.firstName?.charAt(0) || 'T'
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
        "fixed left-0 top-0 h-full bg-white shadow-sm border-r border-gray-200 z-40 transition-all duration-300",
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
            <span className="text-lg font-semibold">Menu</span>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Desktop Toggle Button (only visible on desktop) */}
          <div className="hidden lg:flex justify-end mb-4">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isCollapsed ? (
                <Menu className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>

        {/* Logo */}
        <Link href="/">
          <div className={cn(
            "flex items-center mb-8 cursor-pointer",
            isCollapsed ? "justify-center" : "space-x-3"
          )}>
            <div className="w-8 h-8 bg-devcode-orange rounded transform rotate-45 relative flex-shrink-0">
              <div className="absolute inset-1 bg-white rounded transform -rotate-45"></div>
            </div>
            {!isCollapsed && (
              <span className="text-xl font-bold text-devcode-dark">DevCode Academy</span>
            )}
          </div>
        </Link>

        {/* User Profile */}
        <div className="mb-6">
          <div className={cn(
            "flex items-center p-3 bg-gray-50 rounded-lg",
            isCollapsed ? "justify-center" : "space-x-3"
          )}>
            <Avatar className="w-10 h-10 flex-shrink-0">
              <AvatarFallback className="bg-devcode-orange text-white">
                {userInfo.avatar}
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div>
                <div className="font-medium text-devcode-dark">{userInfo.name}</div>
                <div className="text-sm text-devcode-gray">{userInfo.role}</div>
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
                  "flex items-center px-3 py-2 rounded-lg transition-colors cursor-pointer relative group",
                  isActive 
                    ? "bg-devcode-dark text-white" 
                    : "text-devcode-gray hover:text-devcode-dark hover:bg-gray-50",
                  isCollapsed ? "justify-center" : "space-x-3"
                )}>
                  <IconComponent className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && <span>{item.label}</span>}
                  
                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                      {item.label}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
          
          <div
            className={cn(
              "flex items-center px-3 py-2 rounded-lg transition-colors cursor-pointer text-devcode-gray hover:text-devcode-dark hover:bg-gray-50 relative group",
              isCollapsed ? "justify-center" : "space-x-3"
            )}
            onClick={handleLogout}
          >
            <Clock className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span>Logout</span>}
            
            {/* Tooltip for collapsed state */}
            {isCollapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                Logout
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
    </>
  );
}