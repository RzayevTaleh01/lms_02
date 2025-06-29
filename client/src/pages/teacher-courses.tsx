import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/layout/sidebar";
import CourseManagement from '@/pages/course-management';
import GlobalActiveSession from "@/components/global-active-session";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, Clock, Calendar } from "lucide-react";

export default function TeacherCourses() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const { toast } = useToast();

  // Fetch courses for this teacher
  const { data: courses = [] } = useQuery({
    queryKey: ["/api/courses"],
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-devcode-orange"></div>
      </div>
    );
  }

  if (!user || user.role !== 'teacher') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-devcode-dark mb-4">Access Denied</h1>
          <p className="text-devcode-gray">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <GlobalActiveSession />
      <Sidebar userRole="teacher" />

      {/* Main Content */}
      <div className="flex-1 p-8 ml-64 pt-16">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-devcode-dark">Mənim Kurslarım</h1>
            <p className="text-devcode-gray">
              Bütün kurslarınızı burada idarə edin və yenilərini yaradın.
            </p>
          </div>
          <CourseManagement />
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {!Array.isArray(courses) || courses.length === 0 ? (
            <div className="col-span-full">
              <Card>
                <CardContent className="p-16 text-center">
                  <BookOpen className="w-16 h-16 mx-auto mb-4 text-devcode-gray opacity-50" />
                  <h3 className="text-lg font-semibold text-devcode-dark mb-2">Hələ kurs yaratmamısınız</h3>
                  <p className="text-devcode-gray mb-6">İlk kursunuzu yaratmaq üçün yuxarıdakı "Yeni Kurs" düyməsini basın.</p>
                  <CourseManagement />
                </CardContent>
              </Card>
            </div>
          ) : (
            courses.map((course: any) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => window.location.href = `/teacher/courses/${course.id}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-devcode-orange text-white">
                        <span className="font-semibold">{course.title.charAt(0)}</span>
                      </div>
                      <div>
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                        <Badge variant="secondary" className="mt-1 capitalize">
                          {course.category}
                        </Badge>
                      </div>
                    </div>
                    <Badge variant={course.isActive ? "default" : "secondary"}>
                      {course.isActive ? "Aktiv" : "Deaktiv"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-devcode-gray mb-4 line-clamp-2">{course.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-devcode-gray mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        <span>{course.enrollmentCount || 0} tələbə</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{course.duration || 'N/A'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-devcode-dark">{course.price} AZN</span>
                      <Badge variant="outline" className="ml-2 capitalize">
                        {course.level}
                      </Badge>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-devcode-orange border-devcode-orange hover:bg-orange-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = `/teacher/courses/${course.id}`;
                      }}
                    >
                      İdarə Et
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}