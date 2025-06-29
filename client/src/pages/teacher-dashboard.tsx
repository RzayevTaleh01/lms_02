import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/layout/sidebar";
import CourseManagement from '@/pages/course-management';
import GlobalActiveSession from "@/components/global-active-session";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Users, Calendar, CheckSquare, Plus, FileText, UserPlus, CalendarPlus } from "lucide-react";
import { isUnauthorizedError } from "@/lib/authUtils";

export default function TeacherDashboard() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

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

  const mockCourses = [
    {
      id: 1,
      title: "Mathematics 101",
      students: 24,
      room: "Room 201",
      time: "Today 10:00 AM",
      code: "M1",
      color: "bg-blue-100 text-blue-600"
    },
    {
      id: 2,
      title: "Algebra II",
      students: 18,
      room: "Room 305",
      time: "Today 2:00 PM",
      code: "A2",
      color: "bg-green-100 text-green-600"
    },
    {
      id: 3,
      title: "Calculus I",
      students: 22,
      room: "Room 301",
      time: "Tomorrow 9:00 AM",
      code: "C1",
      color: "bg-purple-100 text-purple-600"
    }
  ];

  const mockSchedule = [
    { name: "Math 101", time: "10:00 - 11:30 AM", color: "bg-green-500" },
    { name: "Algebra II", time: "2:00 - 3:30 PM", color: "bg-blue-500" },
    { name: "Calculus I", time: "Tomorrow 9:00 AM", color: "bg-purple-500" },
    { name: "Statistics", time: "Wed 11:00 AM", color: "bg-yellow-500" }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <GlobalActiveSession />
      <Sidebar userRole="teacher" />

      {/* Main Content */}
      <div className="flex-1 p-8 ml-64 pt-16">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-devcode-dark">Müəllim Paneli</h1>
          <p className="text-devcode-gray">
            Xoş gəlmisiniz, {user.firstName || 'Müəllim'}! Kurslarınızı idarə edin və tələbələrinizlə əlaqə saxlayın.
          </p>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Ümumi Baxış</TabsTrigger>
            <TabsTrigger value="courses">Kurs İdarəçiliyi</TabsTrigger>
            <TabsTrigger value="analytics">Analitika</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ümumi Kurslar</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{courses.length}</div>
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
                  <div className="text-2xl font-bold">{courses.reduce((acc: number, course: any) => acc + (course.enrollmentCount || 0), 0)}</div>
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

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Bu Həftə Dərslər</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">Planlaşdırılmış</p>
                  <div className="w-12 h-12 bg-devcode-orange bg-opacity-20 rounded-xl flex items-center justify-center mt-2">
                    <Calendar className="w-6 h-6 text-devcode-orange" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Tez Əməliyyatlar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <Button 
                    className="bg-devcode-orange text-white hover:bg-orange-600"
                    onClick={() => setActiveTab("courses")}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Yeni Kurs
                  </Button>
                  <Button variant="outline" onClick={() => setActiveTab("courses")}>
                    <FileText className="w-4 h-4 mr-2" />
                    Tapşırıq Əlavə Et
                  </Button>
                  <Button variant="outline" onClick={() => setActiveTab("courses")}>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Tələbə Əlavə Et
                  </Button>
                  <Button variant="outline" onClick={() => setActiveTab("courses")}>
                    <CalendarPlus className="w-4 h-4 mr-2" />
                    Dərs Planlaşdır
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Recent Courses */}
              <Card>
                <CardHeader>
                  <CardTitle>Son Kurslar</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {courses.length === 0 ? (
                    <p className="text-center text-devcode-gray py-4">Hələ kurs yaratmamısınız.</p>
                  ) : (
                    courses.slice(0, 3).map((course: any) => (
                      <div key={course.id} className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-devcode-orange text-white">
                          <span className="font-semibold">{course.title.charAt(0)}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-devcode-dark">{course.title}</h3>
                          <p className="text-sm text-devcode-gray">{course.enrollmentCount || 0} tələbə • {course.level}</p>
                        </div>
                        <span className="text-sm text-devcode-gray">{course.price} AZN</span>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>

              {/* This Week Schedule */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Bu Həftə</CardTitle>
                    <Button variant="link" size="sm" className="text-devcode-orange hover:text-orange-600">
                      Tam Təqvimi Gör
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockSchedule.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                      <div className="flex-1">
                        <div className="font-medium text-devcode-dark">{item.name}</div>
                        <div className="text-sm text-devcode-gray">{item.time}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="courses" className="mt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Mənim Kurslarım</h2>
                <CourseManagement />
              </div>

              {/* Courses Table */}
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Kurs
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tələbələr
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Səviyyə
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Qiymət
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Əməliyyatlar
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {courses.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="px-6 py-8 text-center text-devcode-gray">
                              Hələ kurs yaratmamısınız
                            </td>
                          </tr>
                        ) : (
                          courses.map((course: any) => (
                            <tr key={course.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4">
                                <div className="flex items-center">
                                  <div className="w-10 h-10 bg-devcode-orange rounded-lg flex items-center justify-center text-white font-semibold mr-3">
                                    {course.title.charAt(0)}
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium text-devcode-dark">
                                      {course.title}
                                    </div>
                                    <div className="text-sm text-devcode-gray">
                                      {course.category}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-sm text-devcode-gray">
                                {course.enrollmentCount || 0}
                              </td>
                              <td className="px-6 py-4">
                                <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full capitalize">
                                  {course.level}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-sm text-devcode-dark font-medium">
                                {course.price} AZN
                              </td>
                              <td className="px-6 py-4">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                  course.isActive 
                                    ? "bg-green-100 text-green-800" 
                                    : "bg-red-100 text-red-800"
                                }`}>
                                  {course.isActive ? "Aktiv" : "Deaktiv"}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => window.location.href = `/teacher/courses/${course.id}`}
                                  className="text-devcode-orange border-devcode-orange hover:bg-orange-50"
                                >
                                  İdarə Et
                                </Button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Analitika və Hesabatlar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-16 text-devcode-gray">
                  <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">Analitika Bölməsi</h3>
                  <p>Tələbə performansı və kurs statistikaları burada göstəriləcək.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}