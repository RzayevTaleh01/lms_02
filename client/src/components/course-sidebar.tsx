import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  BookOpen, 
  Users, 
  CalendarCheck, 
  BarChart3,
  ArrowLeft,
  Play,
  Clock,
  History,
  Menu
} from "lucide-react";

interface CourseSidebarProps {
  course: any;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function CourseSidebar({ course, activeTab, onTabChange }: CourseSidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const sidebarItems = [
    {
      id: "lessons",
      label: "Dərslər",
      icon: BookOpen,
      count: null
    },
    {
      id: "students", 
      label: "Tələbələr",
      icon: Users,
      count: course.enrollmentCount || 0
    },
    {
      id: "attendance",
      label: "Davamiyyət", 
      icon: CalendarCheck,
      count: null
    },
    {
      id: "sessions",
      label: "Sessiya Tarixi",
      icon: History,
      count: null
    },
    {
      id: "analytics",
      label: "Analitika",
      icon: BarChart3,
      count: null
    }
  ];

  const SidebarContent = () => (
    <>
      {/* Header */}
      <div className="p-6 border-b">
        <Button 
          variant="ghost" 
          className="mb-4 p-0 h-auto font-normal text-gray-600 hover:text-gray-900"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kurslar
        </Button>
        <h2 className="text-xl font-bold text-gray-900">{course.title}</h2>
        <p className="text-sm text-gray-600">Kurs İdarəetməsi</p>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                onTabChange(item.id);
                setIsMobileOpen(false);
              }}
              className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                isActive
                  ? "bg-devcode-orange text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center">
                <Icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{item.label}</span>
              </div>
              {item.count !== null && (
                <span className={`text-xs px-2 py-1 rounded-full ${
                  isActive ? "bg-white text-devcode-orange" : "bg-gray-200 text-gray-600"
                }`}>
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Simple Course Info */}
      <div className="p-4 border-t bg-gray-50">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Səviyyə:</span>
            <span className="font-medium capitalize">{course.level}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tələbələr:</span>
            <span className="font-medium">{course.enrollmentCount || 0}</span>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 w-64 h-full bg-white shadow-lg z-30 border-r border-gray-200">
        <SidebarContent />
      </div>

      {/* Mobile Menu Button & Sidebar */}
      <div className="lg:hidden">
        <div className="fixed top-4 left-4 z-50">
          <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="bg-white shadow-md">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <SidebarContent />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
}