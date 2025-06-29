
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Users, 
  FileText, 
  Calendar, 
  Play, 
  Clock,
  ChevronRight,
  Video,
  PenTool
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CourseSidebarProps {
  course: any;
  lessons: any[];
  selectedSection: string;
  onSectionChange: (section: string) => void;
  activeLiveSession?: any;
}

export default function CourseSidebar({ 
  course, 
  lessons, 
  selectedSection, 
  onSectionChange,
  activeLiveSession 
}: CourseSidebarProps) {
  const { user } = useAuth();
  const [expandedLesson, setExpandedLesson] = useState<number | null>(null);

  const sidebarItems = [
    { id: "overview", label: "Ümumi Məlumat", icon: BookOpen },
    { id: "lessons", label: "Dərslər", icon: Video, count: lessons.length },
    { id: "assignments", label: "Tapşırıqlar", icon: FileText },
    { id: "students", label: "Tələbələr", icon: Users },
    { id: "attendance", label: "Davamiyyət", icon: Calendar },
  ];

  return (
    <div className="w-80 bg-white border-r border-gray-200 h-full overflow-y-auto">
      {/* Course Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-devcode-dark mb-2">{course.title}</h2>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="capitalize">
            {course.level === 'beginner' ? 'Başlanğıc' : course.level === 'intermediate' ? 'Orta' : 'İrəli'}
          </Badge>
          <span className="text-sm text-devcode-gray">{course.duration}</span>
        </div>
        
        {/* Active Session Info */}
        {activeLiveSession && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-700">Canlı Dərs Davam Edir</span>
            </div>
            <div className="text-xs text-green-600 mt-1">
              Başlama vaxtı: {new Date(activeLiveSession.startTime).toLocaleTimeString('az-AZ')}
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="p-4">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={cn(
              "w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors mb-2",
              selectedSection === item.id
                ? "bg-devcode-orange text-white"
                : "text-devcode-gray hover:bg-gray-50"
            )}
          >
            <div className="flex items-center space-x-3">
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </div>
            {item.count !== undefined && (
              <Badge variant={selectedSection === item.id ? "secondary" : "outline"} className="text-xs">
                {item.count}
              </Badge>
            )}
          </button>
        ))}
      </nav>

      {/* Lessons List */}
      {selectedSection === "lessons" && (
        <div className="px-4 pb-4">
          <h3 className="text-lg font-semibold text-devcode-dark mb-3">Dərslər</h3>
          <div className="space-y-2">
            {lessons.map((lesson, index) => (
              <div key={lesson.id}>
                <button
                  onClick={() => setExpandedLesson(expandedLesson === lesson.id ? null : lesson.id)}
                  className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-devcode-orange rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {index + 1}
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-devcode-dark">{lesson.title}</div>
                      <div className="text-sm text-devcode-gray">{lesson.duration} dəq</div>
                    </div>
                  </div>
                  <ChevronRight 
                    className={cn(
                      "w-4 h-4 transition-transform",
                      expandedLesson === lesson.id ? "rotate-90" : ""
                    )} 
                  />
                </button>
                
                {expandedLesson === lesson.id && (
                  <div className="ml-6 mt-2 space-y-2">
                    <button className="w-full flex items-center space-x-2 p-2 text-sm text-devcode-gray hover:text-devcode-orange">
                      <Video className="w-4 h-4" />
                      <span>Dərs Materialları</span>
                    </button>
                    <button className="w-full flex items-center space-x-2 p-2 text-sm text-devcode-gray hover:text-devcode-orange">
                      <PenTool className="w-4 h-4" />
                      <span>Tapşırıqlar</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
