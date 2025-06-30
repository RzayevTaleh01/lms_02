import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Calendar, Trophy, Target, Clock, Users, Home, GraduationCap, ClipboardList, Award, User, LogOut, Menu, FileText } from "lucide-react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useState } from "react";

const StudentSidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [location] = useLocation();
  const { user, logout } = useAuth();

  const menuItems = [
    { icon: Home, label: "Ana Səhifə", href: "/student", exact: true },
    { icon: GraduationCap, label: "Kurslarım", href: "/student/courses" },
    { icon: ClipboardList, label: "Tapşırıqlarım", href: "/student/assignments" },
    { icon: Award, label: "Davamiyyət", href: "/student/attendance" },
    { icon: Trophy, label: "Qiymətlərim", href: "/student/grades" },
    { icon: User, label: "Profil", href: "/student/profile" },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 h-screen w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 flex flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "lg:translate-x-0 lg:relative lg:z-0"
      )}>
        {/* Header */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">DevCode Academy</h2>
          <p className="text-sm text-gray-600">Tələbə Paneli</p>
        </div>

        {/* User Info */}
        <div className="p-4 border-b bg-gray-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
            <div>
              <p className="font-medium text-gray-900">{user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-gray-600">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2 flex-1">
          {menuItems.map((item) => {
            const isActive = item.exact 
              ? location === item.href 
              : location.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                  isActive 
                    ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700" 
                    : "text-gray-700 hover:bg-gray-50"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t">
          <button
            onClick={logout}
            className="flex items-center space-x-3 px-3 py-2 w-full text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Çıxış</span>
          </button>
        </div>
      </div>
    </>
  );
};

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

  const activeEnrollments = enrollments.filter(e => e.progress < 100);
  const completedCourses = enrollments.filter(e => e.progress === 100);
  const totalSubmissions = submissions.length;
  const gradedSubmissions = submissions.filter(s => s.grade !== null);
  const averageGrade = gradedSubmissions.length > 0 
    ? gradedSubmissions.reduce((sum, s) => sum + (s.grade || 0), 0) / gradedSubmissions.length 
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <StudentSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
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

            {activeEnrollments.length === 0 ? (
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