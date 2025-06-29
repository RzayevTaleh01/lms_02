import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, Play, Square } from "lucide-react";
import { useLocation } from "wouter";

export default function GlobalActiveSession() {
  const [, setLocation] = useLocation();
  
  // Check for any active sessions across all courses
  const { data: activeSessions = [] } = useQuery({
    queryKey: ["/api/active-sessions"],
    refetchInterval: 10000, // Refresh every 10 seconds
  });

  if (activeSessions.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 bg-green-600 text-white p-3 z-[60] shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            <span className="font-semibold">Aktiv Dərs Sessiyası</span>
          </div>
          {activeSessions.map((session: any) => (
            <div key={session.id} className="flex items-center gap-2 bg-green-500 px-3 py-1 rounded-full">
              <Play className="w-4 h-4" />
              <span className="text-sm">{session.courseName}</span>
              <Badge variant="secondary" className="bg-white text-green-600">
                <Clock className="w-3 h-3 mr-1" />
                {Math.floor((Date.now() - new Date(session.startTime).getTime()) / 60000)} dəq
              </Badge>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-white text-green-600 hover:bg-gray-50"
            onClick={() => setLocation(`/teacher/course/${activeSessions[0]?.courseId}`)}
          >
            <Users className="w-4 h-4 mr-1" />
            Kursa Keç
          </Button>
        </div>
      </div>
    </div>
  );
}