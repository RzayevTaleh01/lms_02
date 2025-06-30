
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarCheck, Clock, Users, CheckCircle, XCircle, Home, GraduationCap, ClipboardList, Award, User, LogOut, Menu } from "lucide-react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useState } from "react";

const StudentSidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [location] = useLocation();
  const { user, logout } = useAuth();

  const menuItems = [
    { icon: Home, label: "Ana Səhifə", href: "/student", exact: true },
    { icon: GraduationCap, label: "Kurslarım", href: "/student/courses" },
    { icon: ClipboardList, label: "Davamiyyət", href: "/student/attendance" },
    { icon: Award, label: "Qiymətlərim", href: "/student/grades" },
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

export default function StudentAttendance() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch enrollments to get courses
  const { data: enrollments = [], isLoading } = useQuery({
    queryKey: ["/api/enrollments"],
    enabled: !!user
  });

  // Mock attendance data - in real app, this would come from an API
  const attendanceData = enrollments.map((enrollment) => ({
    courseId: enrollment.courseId,
    courseName: enrollment.course.title,
    totalSessions: 12,
    attendedSessions: 8,
    missedSessions: 4,
    attendanceRate: Math.round((8 / 12) * 100),
    lastAttendance: new Date().toISOString(),
    sessions: [
      { date: '2024-01-15', status: 'present', topic: 'HTML əsasları' },
      { date: '2024-01-17', status: 'present', topic: 'CSS fundamentals' },
      { date: '2024-01-19', status: 'absent', topic: 'JavaScript giriş' },
      { date: '2024-01-22', status: 'present', topic: 'DOM manipulyasiya' },
      { date: '2024-01-24', status: 'present', topic: 'Event handling' },
      { date: '2024-01-26', status: 'absent', topic: 'API integration' },
      { date: '2024-01-29', status: 'present', topic: 'React giriş' },
      { date: '2024-01-31', status: 'present', topic: 'Components' },
      { date: '2024-02-02', status: 'absent', topic: 'State management' },
      { date: '2024-02-05', status: 'present', topic: 'Hooks' },
      { date: '2024-02-07', status: 'present', topic: 'Project work' },
      { date: '2024-02-09', status: 'absent', topic: 'Final presentation' },
    ]
  }));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <StudentSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 lg:ml-0 flex items-center justify-center">
          <div className="text-center">Yüklənir...</div>
        </div>
      </div>
    );
  }

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
                <h1 className="text-2xl font-bold text-gray-900">Davamiyyət</h1>
                <p className="text-gray-600">Dərs davamiyyətinizi izləyin</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ümumi Davamiyyət</CardTitle>
                <CalendarCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {attendanceData.length > 0 
                    ? Math.round(attendanceData.reduce((acc, course) => acc + course.attendanceRate, 0) / attendanceData.length)
                    : 0}%
                </div>
                <p className="text-xs text-muted-foreground">
                  Bütün kurslarda orta davamiyyət
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">İştirak Etdiyi Dərslər</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {attendanceData.reduce((acc, course) => acc + course.attendedSessions, 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Ümumi iştirak edilmiş dərslər
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Qaçırılan Dərslər</CardTitle>
                <XCircle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {attendanceData.reduce((acc, course) => acc + course.missedSessions, 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Ümumi qaçırılan dərslər
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Course Attendance Details */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Kurs üzrə Davamiyyət</h2>
            
            {attendanceData.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <CalendarCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Davamiyyət məlumatı yoxdur
                  </h3>
                  <p className="text-gray-600">
                    Hələ heç bir kursa qeydiyyatdan keçməmisiniz
                  </p>
                </CardContent>
              </Card>
            ) : (
              attendanceData.map((course) => (
                <Card key={course.courseId}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{course.courseName}</CardTitle>
                      <Badge 
                        variant={course.attendanceRate >= 80 ? "default" : course.attendanceRate >= 60 ? "secondary" : "destructive"}
                      >
                        {course.attendanceRate}% davamiyyət
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{course.attendedSessions}</div>
                        <p className="text-sm text-gray-600">İştirak</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">{course.missedSessions}</div>
                        <p className="text-sm text-gray-600">Qaçırılan</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{course.totalSessions}</div>
                        <p className="text-sm text-gray-600">Ümumi</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900">Son Dərslər</h4>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {course.sessions.map((session, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              {session.status === 'present' ? (
                                <CheckCircle className="h-5 w-5 text-green-600" />
                              ) : (
                                <XCircle className="h-5 w-5 text-red-600" />
                              )}
                              <div>
                                <p className="font-medium text-gray-900">{session.topic}</p>
                                <p className="text-sm text-gray-600">
                                  {new Date(session.date).toLocaleDateString('az-AZ')}
                                </p>
                              </div>
                            </div>
                            <Badge variant={session.status === 'present' ? "default" : "destructive"}>
                              {session.status === 'present' ? 'İştirak' : 'Qaçırıb'}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
