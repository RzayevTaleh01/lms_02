
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

  // Fetch attendance data for each enrolled course
  const attendanceQueries = useQuery({
    queryKey: ["/api/student/attendance", user?.id],
    queryFn: async () => {
      if (!enrollments.length) return [];
      
      const attendancePromises = enrollments.map(async (enrollment) => {
        // Get all sessions for this course
        const sessionsResponse = await fetch(`/api/courses/${enrollment.courseId}/sessions`, {
          credentials: "include"
        });
        const sessions = await sessionsResponse.json();

        // Get attendance records for this student in all sessions
        const attendancePromises = sessions.map(async (session: any) => {
          try {
            const attendanceResponse = await fetch(`/api/sessions/${session.id}/attendance`, {
              credentials: "include"
            });
            const sessionAttendance = await attendanceResponse.json();
            
            // Find this student's attendance in this session
            const studentAttendance = sessionAttendance.find((record: any) => 
              record.studentId === user?.id
            );
            
            return {
              sessionId: session.id,
              sessionName: session.sessionName,
              date: session.startTime,
              status: studentAttendance ? studentAttendance.status : 'absent',
              duration: session.duration
            };
          } catch (error) {
            return {
              sessionId: session.id,
              sessionName: session.sessionName,
              date: session.startTime,
              status: 'absent',
              duration: session.duration
            };
          }
        });

        const attendanceRecords = await Promise.all(attendancePromises);
        
        // Calculate statistics
        const totalSessions = sessions.length;
        const attendedSessions = attendanceRecords.filter(record => record.status === 'present').length;
        const missedSessions = totalSessions - attendedSessions;
        const attendanceRate = totalSessions > 0 ? Math.round((attendedSessions / totalSessions) * 100) : 0;

        return {
          courseId: enrollment.courseId,
          courseName: enrollment.course.title,
          totalSessions,
          attendedSessions,
          missedSessions,
          attendanceRate,
          lastAttendance: sessions.length > 0 ? sessions[sessions.length - 1].startTime : null,
          sessions: attendanceRecords.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        };
      });

      return Promise.all(attendancePromises);
    },
    enabled: !!user && enrollments.length > 0
  });

  const attendanceData = attendanceQueries.data || [];

  if (isLoading || attendanceQueries.isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <StudentSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 lg:ml-0 flex items-center justify-center">
          <div className="text-center">Davamiyyət məlumatları yüklənir...</div>
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
                <CardTitle className="text-sm font-medium">İ/E Oranı</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {attendanceData.reduce((acc, course) => acc + course.attendedSessions, 0)} / {attendanceData.reduce((acc, course) => acc + course.totalSessions, 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  İştirak Etdi / Ümumi Dərslər
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Qaçırılan (QB)</CardTitle>
                <XCircle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {attendanceData.reduce((acc, course) => acc + course.missedSessions, 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Qaçırılan dərslər sayı
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
                        <div className="text-2xl font-bold text-green-600">{course.attendedSessions}/{course.totalSessions}</div>
                        <p className="text-sm text-gray-600">İ/E Oranı</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">{course.missedSessions}</div>
                        <p className="text-sm text-gray-600">QB (Qaçırıb)</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{course.attendanceRate}%</div>
                        <p className="text-sm text-gray-600">Davamiyyət Faizi</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900">Son Dərslər</h4>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {course.sessions.length === 0 ? (
                          <p className="text-gray-500 text-center py-4">Hələ heç bir dərs keçirilməyib</p>
                        ) : (
                          course.sessions.map((session, index) => (
                            <div key={session.sessionId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center space-x-3">
                                {session.status === 'present' ? (
                                  <CheckCircle className="h-5 w-5 text-green-600" />
                                ) : (
                                  <XCircle className="h-5 w-5 text-red-600" />
                                )}
                                <div>
                                  <p className="font-medium text-gray-900">{session.sessionName}</p>
                                  <p className="text-sm text-gray-600">
                                    {new Date(session.date).toLocaleDateString('az-AZ', {
                                      year: 'numeric',
                                      month: 'long', 
                                      day: 'numeric',
                                      hour: '2-digit',
                                      minute: '2-digit'
                                    })}
                                  </p>
                                  {session.duration && (
                                    <p className="text-xs text-gray-500">
                                      Müddət: {session.duration} dəqiqə
                                    </p>
                                  )}
                                </div>
                              </div>
                              <Badge variant={session.status === 'present' ? "default" : "destructive"}>
                                {session.status === 'present' ? 'İştirak Etdi' : 'Qaçırdı'}
                              </Badge>
                            </div>
                          ))
                        )}
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
