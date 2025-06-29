import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, Eye } from "lucide-react";
import { format } from "date-fns";

export default function SessionHistory() {
  const { id } = useParams();
  const courseId = parseInt(id || "0");

  const { data: sessions = [], isLoading } = useQuery({
    queryKey: [`/api/courses/${courseId}/sessions`],
    enabled: !!courseId,
  });

  const { data: course } = useQuery({
    queryKey: [`/api/courses/${courseId}`],
    enabled: !!courseId,
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-devcode-dark">Dərs Sessiyaları Tarixi</h1>
          <p className="text-devcode-gray mt-1">{course?.title} kursu üçün bütün dər sessiyaları</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Sessiya Tarixi
          </CardTitle>
        </CardHeader>
        <CardContent>
          {sessions.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-devcode-gray">Hələ heç bir dərs sessiyası keçirilməyib</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tarix</TableHead>
                  <TableHead>Başlama Saatı</TableHead>
                  <TableHead>Müddət</TableHead>
                  <TableHead>İştirakçı Sayı</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Əməliyyatlar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sessions.map((session: any) => (
                  <TableRow key={session.id}>
                    <TableCell>
                      {format(new Date(session.startTime), "dd.MM.yyyy")}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {format(new Date(session.startTime), "HH:mm")}
                      </div>
                    </TableCell>
                    <TableCell>
                      {session.duration ? `${Math.floor(session.duration / 60)} dəq` : "Davam edir"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {session.attendanceCount || 0}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={session.endTime ? "secondary" : "default"}>
                        {session.endTime ? "Bitmiş" : "Aktiv"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        Detallar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}