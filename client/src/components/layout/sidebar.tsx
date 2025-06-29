import { Link, useLocation } from "wouter";
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
  History
} from "lucide-react";

interface SidebarProps {
  userRole: 'admin' | 'teacher' | 'student';
}

export default function Sidebar({ userRole }: SidebarProps) {
  const [location] = useLocation();
  const { user } = useAuth();

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
          { href: '/teacher/attendance', label: 'Attendance', icon: Calendar },
          { href: '/teacher/assignments', label: 'Assignments', icon: CheckSquare },
          { href: '/teacher/reports', label: 'Reports', icon: BarChart3 },
          { href: '/teacher/settings', label: 'Settings', icon: Settings },
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

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-sm border-r border-gray-200 z-40">
      <div className="p-6">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center space-x-3 mb-8 cursor-pointer">
            <div className="w-8 h-8 bg-devcode-orange rounded transform rotate-45 relative">
              <div className="absolute inset-1 bg-white rounded transform -rotate-45"></div>
            </div>
            <span className="text-xl font-bold text-devcode-dark">DevCode Academy</span>
          </div>
        </Link>
        
        {/* User Profile */}
        <div className="mb-6">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-devcode-orange text-white">
                {userInfo.avatar}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-devcode-dark">{userInfo.name}</div>
              <div className="text-sm text-devcode-gray">{userInfo.role}</div>
            </div>
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
                  "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors cursor-pointer",
                  isActive 
                    ? "bg-devcode-dark text-white" 
                    : "text-devcode-gray hover:text-devcode-dark hover:bg-gray-50"
                )}>
                  <IconComponent className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
