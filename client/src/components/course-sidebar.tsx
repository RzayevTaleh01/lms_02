
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  BookOpen, 
  Users, 
  CalendarCheck, 
  BarChart3,
  ArrowLeft,
  Play,
  Clock
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
      id: "analytics",
      label: "Analitika",
      icon: BarChart3,
      count: null
    }
  ];

  return (
    <div className="fixed left-0 top-0 w-80 h-full bg-white shadow-lg z-40 border-r border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <Button 
          variant="ghost" 
          className="mb-4 p-0 h-auto font-normal text-devcode-gray hover:text-devcode-dark"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kurslar
        </Button>
        
        <div>
          <h2 className="text-xl font-bold text-devcode-dark mb-2">{course.title}</h2>
          <div className="space-y-1 text-sm text-devcode-gray">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Aktiv
            </div>
            <div className="flex items-center">
              <Users className="w-3 h-3 mr-2" />
              {course.enrollmentCount || 0} tələbə
            </div>
            <div className="flex items-center">
              <Clock className="w-3 h-3 mr-2" />
              {course.duration || "Müddətsi"}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-6">
        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start h-auto p-3 ${
                  isActive 
                    ? "bg-devcode-orange text-white hover:bg-orange-600" 
                    : "text-devcode-gray hover:text-devcode-dark hover:bg-gray-50"
                }`}
                onClick={() => onTabChange(item.id)}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.count !== null && (
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    isActive 
                      ? "bg-white bg-opacity-20 text-white" 
                      : "bg-gray-100 text-devcode-gray"
                  }`}>
                    {item.count}
                  </span>
                )}
              </Button>
            );
          })}
        </nav>
      </div>

      {/* Course Stats */}
      <div className="p-6 border-t border-gray-200">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-devcode-dark mb-3">Kurs Statistikası</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-devcode-gray">Qiymət:</span>
                <span className="font-medium">{course.price} AZN</span>
              </div>
              <div className="flex justify-between">
                <span className="text-devcode-gray">Səviyyə:</span>
                <span className="font-medium capitalize">{course.level}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-devcode-gray">Reytinq:</span>
                <span className="font-medium">{course.rating || 0}★</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
