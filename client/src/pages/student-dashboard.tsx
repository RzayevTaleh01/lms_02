import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Calendar, Trophy, Target, Clock, Users, Menu, FileText, Award } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { StudentSidebar } from "@/components/student-sidebar";

export default function StudentDashboard() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data: enrollments = [], isLoading } = useQuery({
    queryKey: ["/api/enrollments"],
    enabled: !!user
  });

  const { data: submissions = [] } = useQuery({
    queryKey: ["/api/submissions"],
    enabled: !!user
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="text-center">Yüklənir...</div>
      </div>
    );
  }

  // Debug enrollments data
  console.log("Enrollments data:", enrollments);
  
  const activeEnrollments = enrollments.filter(e => (e.progress || 0) < 100);
  const completedCourses = enrollments.filter(e => (e.progress || 0) === 100);
  const totalSubmissions = submissions.length;
  const gradedSubmissions = submissions.filter(s => s.grade !== null);
  const averageGrade = gradedSubmissions.length > 0 
    ? gradedSubmissions.reduce((sum, s) => sum + (s.grade || 0), 0) / gradedSubmissions.length 
    : 0;

  console.log("Active enrollments:", activeEnrollments);
  console.log("Completed courses:", completedCourses);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <StudentSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Top Navigation */}
        <div className="bg-white shadow-sm border-b">
          <div className="px-4 sm:px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Xoş gəlmisiniz, {user?.firstName}
                </h1>
                <p className="text-gray-600">Tələbə Dashboard</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Aktiv Kurslar</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeEnrollments.length}</div>
                <p className="text-xs text-muted-foreground">
                  Hal-hazırda öyrəndiyiniz kurslar
                </p>
                <p className="text-xs text-red-500">
                  Debug: Total enrollments: {enrollments.length}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tamamlanmış Kurslar</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{completedCourses.length}</div>
                <p className="text-xs text-muted-foreground">
                  Uğurla bitirdiyiniz kurslar
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ümumi Tapşırıqlar</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalSubmissions}</div>
                <p className="text-xs text-muted-foreground">
                  Göndərdiyiniz tapşırıqlar
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Orta Qiymət</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{averageGrade.toFixed(1)}</div>
                <p className="text-xs text-muted-foreground">
                  100 bal üzərindən
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Active Courses */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Aktiv Kurslarınız</h2>

            {enrollments.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Hələ heç bir kursa qeydiyyatdan keçməmisiniz
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Öyrənməyə başlamaq üçün mövcud kurslara baxın
                  </p>
                  <Button asChild>
                    <Link href="/courses">Kursları Araşdır</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : enrollments.every((e: any) => !e.course) ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <BookOpen className="h-12 w-12 text-red-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Kurs məlumatları yüklənmir
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Təkrar cəhd edin və ya administratorla əlaqə saxlayın
                  </p>
                  <p className="text-xs text-red-500">
                    Debug: Enrollments without course data: {enrollments.length}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeEnrollments.map((enrollment) => (
                  <Card key={enrollment.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{enrollment.course.title}</CardTitle>
                      <Badge variant="secondary">
                        {enrollment.progress}% tamamlandı
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {enrollment.course.description}
                      </p>

                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Tərəqqi</span>
                            <span>{enrollment.progress}%</span>
                          </div>
                          <Progress value={enrollment.progress} className="h-2" />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>Qeydiyyat: {new Date(enrollment.enrolledAt).toLocaleDateString('az-AZ')}</span>
                          </div>
                        </div>

                        <Button asChild className="w-full">
                          <Link href={`/student/course/${enrollment.course.id}`}>
                            Kursa Davam Et
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}