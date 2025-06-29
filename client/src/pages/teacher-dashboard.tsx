import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import Sidebar from "@/components/layout/sidebar";
import CourseManagement from '@/pages/course-management';
import GlobalActiveSession from "@/components/global-active-session";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, CheckSquare } from "lucide-react";

export default function TeacherDashboard() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const { toast } = useToast();

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
            <h1 className="text-3xl font-bold text-devcode-dark">Müəllim Paneli</h1>
            <p className="text-devcode-gray">
              Xoş gəlmisiniz, {user.firstName || 'Müəllim'}! Kurslarınızı idarə edin və tələbələrinizlə əlaqə saxlayın.
            </p>
          </div>
          <CourseManagement />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ümumi Kurslar</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Array.isArray(courses) ? courses.length : 0}</div>
              <p className="text-xs text-muted-foreground">Aktiv kurslar</p>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mt-2">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ümumi Tələbələr</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Array.isArray(courses) ? courses.reduce((acc: number, course: any) => acc + (course.enrollmentCount || 0), 0) : 0}
              </div>
              <p className="text-xs text-muted-foreground">Bütün kurslarda</p>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mt-2">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gözləyən Tapşırıqlar</CardTitle>
              <CheckSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Qiymətləndirilməyən</p>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mt-2">
                <CheckSquare className="w-6 h-6 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Courses */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Son Kurslar</CardTitle>
              <Link href="/teacher/courses">
                <Button variant="outline" size="sm" className="text-devcode-orange border-devcode-orange hover:bg-orange-50">
                  Hamısını Gör
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {!Array.isArray(courses) || courses.length === 0 ? (
              <p className="text-center text-devcode-gray py-4">Hələ kurs yaratmamısınız.</p>
            ) : (
              courses.slice(0, 5).map((course: any) => (
                <div key={course.id} className="flex items-center space-x-4 p-4 rounded-lg border hover:bg-gray-50 cursor-pointer"
                     onClick={() => window.location.href = `/teacher/courses/${course.id}`}>
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-devcode-orange text-white">
                    <span className="font-semibold">{course.title.charAt(0)}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-devcode-dark">{course.title}</h3>
                    <p className="text-sm text-devcode-gray">{course.enrollmentCount || 0} tələbə • {course.level}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-devcode-dark">{course.price} AZN</span>
                    <p className="text-xs text-devcode-gray">{course.category}</p>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}