import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, Download } from "lucide-react";
import { format } from "date-fns";

interface LessonSession {
  id: number;
  courseId: number;
  courseName: string;
  sessionName: string;
  startTime: string;
  endTime: string | null;
  duration: number | null;
  isActive: boolean;
  attendanceCount: number;
  totalStudents: number;
}

export default function SessionHistory() {
  const { data: sessions, isLoading } = useQuery<LessonSession[]>({
    queryKey: ['/api/sessions/history'],
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <div className="flex-1 p-8 ml-64">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const formatDuration = (minutes: number | null) => {
    if (!minutes) return "N/A";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 p-8 ml-64">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-devcode-dark mb-2">Dərs Sessiyaları Tarixi</h1>
          <p className="text-devcode-gray">Bütün keçirilmiş dərs sessiyalarının tarixçəsi</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ümumi Sessiyalar</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{sessions?.length || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aktiv Sessiyalar</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {sessions?.filter(s => s.isActive).length || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ümumi İştirakçılar</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {sessions?.reduce((acc, s) => acc + s.attendanceCount, 0) || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Orta Davamiyyət</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {sessions && sessions.length > 0 
                  ? Math.round(
                      (sessions.reduce((acc, s) => acc + (s.attendanceCount / Math.max(s.totalStudents, 1)), 0) / sessions.length) * 100
                    )
                  : 0}%
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sessions Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Sessiya Tarixçəsi</CardTitle>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              İxrac Et
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kurs Adı</TableHead>
                  <TableHead>Sessiya Adı</TableHead>
                  <TableHead>Başlama Tarixi</TableHead>
                  <TableHead>Bitmə Tarixi</TableHead>
                  <TableHead>Müddət</TableHead>
                  <TableHead>Davamiyyət</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Əməliyyatlar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sessions?.map((session) => (
                  <TableRow key={session.id}>
                    <TableCell className="font-medium">{session.courseName}</TableCell>
                    <TableCell>{session.sessionName}</TableCell>
                    <TableCell>
                      {format(new Date(session.startTime), "dd/MM/yyyy HH:mm")}
                    </TableCell>
                    <TableCell>
                      {session.endTime 
                        ? format(new Date(session.endTime), "dd/MM/yyyy HH:mm")
                        : "Davam edir"
                      }
                    </TableCell>
                    <TableCell>{formatDuration(session.duration)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span>{session.attendanceCount}/{session.totalStudents}</span>
                        <Badge variant={
                          (session.attendanceCount / Math.max(session.totalStudents, 1)) > 0.8 
                            ? "default" 
                            : (session.attendanceCount / Math.max(session.totalStudents, 1)) > 0.6 
                            ? "secondary" 
                            : "destructive"
                        }>
                          {Math.round((session.attendanceCount / Math.max(session.totalStudents, 1)) * 100)}%
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={session.isActive ? "default" : "secondary"}>
                        {session.isActive ? "Aktiv" : "Bitib"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Detallar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {(!sessions || sessions.length === 0) && (
              <div className="text-center py-8 text-gray-500">
                Hələ heç bir sessiya keçirilməyib
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}