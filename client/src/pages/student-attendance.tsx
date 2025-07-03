import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, CheckCircle, XCircle, Users, Menu, CalendarCheck } from "lucide-react";
import { useState } from "react";
import { StudentSidebar } from "@/components/student-sidebar";

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
        <div className="flex-1 flex items-center justify-center">
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