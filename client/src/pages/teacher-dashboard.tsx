import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { TeacherSidebar } from "@/components/teacher-sidebar";
import CreateCourseDialog from "@/components/create-course-dialog";
import GlobalActiveSession from "@/components/global-active-session";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, CheckSquare, Menu } from "lucide-react";

export default function TeacherDashboard() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Fetch courses for statistics
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
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-300"></div>
      </div>
    );
  }

  if (!user || user.role !== 'teacher') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <GlobalActiveSession />
      <TeacherSidebar 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />

      {/* Main Content */}
      <div className="flex-1 transition-all duration-300" style={{ marginLeft: 'var(--sidebar-width, 0)' }}>
        {/* Top Navigation */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                {/* Mobile menu button */}
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden mr-3"
                >
                  <Menu className="w-5 h-5 text-gray-600" />
                </button>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">Müəllim Paneli</h1>
                  <p className="text-sm text-gray-600">
                    Xoş gəlmisiniz, {user.firstName || 'Müəllim'}!
                  </p>
                </div>
              </div>
              <CreateCourseDialog />
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-gray-500" />
                  Ümumi Kurslar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{Array.isArray(courses) ? courses.length : 0}</div>
                <p className="text-xs text-gray-500 mt-1">Aktiv kurslar</p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  Ümumi Tələbələr
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {Array.isArray(courses) ? courses.reduce((acc: number, course: any) => acc + (course.enrollmentCount || 0), 0) : 0}
                </div>
                <p className="text-xs text-gray-500 mt-1">Bütün kurslarda</p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <CheckSquare className="h-4 w-4 text-gray-500" />
                  Gözləyən Tapşırıqlar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">12</div>
                <p className="text-xs text-gray-500 mt-1">Qiymətləndirilməyən</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Courses */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900">Son Kurslar</CardTitle>
                <Link href="/teacher/courses">
                  <Button variant="outline" size="sm" className="text-gray-600 border-gray-300 hover:bg-gray-50">
                    Hamısını Gör
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {!Array.isArray(courses) || courses.length === 0 ? (
                <p className="text-center text-gray-500 py-4">Hələ kurs yaratmamısınız.</p>
              ) : (
                courses.slice(0, 5).map((course: any) => (
                  <div key={course.id} className="flex items-center space-x-4 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer"
                       onClick={() => window.location.href = `/teacher/courses/${course.id}`}>
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gray-100 text-gray-700">
                      <span className="font-semibold">{course.title.charAt(0)}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{course.title}</h3>
                      <p className="text-sm text-gray-500">{course.enrollmentCount || 0} tələbə • {course.level}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-gray-900">{course.price}</span>
                      <p className="text-xs text-gray-500">{course.category}</p>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}