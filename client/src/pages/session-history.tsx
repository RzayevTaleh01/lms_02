
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users } from "lucide-react";
import { format } from "date-fns";

export default function SessionHistory() {
  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ["/api/sessions/history"],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-devcode-orange"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-devcode-dark">Dərs Sessiyalarının Tarixi</h1>
        <p className="text-devcode-gray">Bütün keçmiş dərs sessiyalarını görün</p>
      </div>

      <div className="grid gap-4">
        {sessions.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-devcode-gray">Hələ ki dərs sessiyası yoxdur</p>
            </CardContent>
          </Card>
        ) : (
          sessions.map((session: any) => (
            <Card key={session.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-semibold text-lg">{session.sessionName}</h3>
                      <Badge variant={session.isActive ? "default" : "secondary"}>
                        {session.isActive ? "Aktiv" : "Bitdi"}
                      </Badge>
                    </div>
                    <div className="text-sm text-devcode-gray">
                      <p className="font-medium">{session.courseName}</p>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-devcode-gray">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{format(new Date(session.startTime), "dd.MM.yyyy")}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{format(new Date(session.startTime), "HH:mm")}</span>
                        {session.endTime && (
                          <span> - {format(new Date(session.endTime), "HH:mm")}</span>
                        )}
                      </div>
                      {session.duration && (
                        <div className="flex items-center space-x-1">
                          <span>{session.duration} dəqiqə</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{session.attendanceCount || 0} iştirakçı</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
