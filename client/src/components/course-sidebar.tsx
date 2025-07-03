import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  BookOpen, 
  Users, 
  CalendarCheck, 
  BarChart3,
  ArrowLeft,
  Play,
  Clock,
  History
} from "lucide-react";

interface CourseSidebarProps {
  course: any;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function CourseSidebar({ course, activeTab, onTabChange }: CourseSidebarProps) {
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

  return (
    <div className="fixed left-0 top-0 w-64 h-full bg-white shadow-lg z-30 border-r border-gray-200">
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
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors w-full text-left ${
                isActive 
                  ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700" 
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => onTabChange(item.id)}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
              {item.count !== null && (
                <span className={`ml-auto text-xs px-2 py-1 rounded-full ${
                  isActive ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"
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
    </div>
  );
}